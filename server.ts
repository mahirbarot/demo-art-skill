/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import { Project, ProjectStatus, ProjectPriority } from './src/types';
import { INITIAL_PROJECTS } from './src/data/mockData';

dotenv.config();

const app = express();
const PORT = 3000;

// Config paths
const DB_PATH = path.join(process.cwd(), 'projects-db.json');
const SETTINGS_PATH = path.join(process.cwd(), 'settings-db.json');

// Initialize Local JSON Databases if they do not exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_PROJECTS, null, 2), 'utf-8');
}

const DEFAULT_SETTINGS = {
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '',
  businessName: 'Has Art Skill Creative Agency',
  businessEmail: 'contact@hasartskill.com',
  businessPhone: '+1 (555) 019-2831',
  businessAddress: '128 Creative Parkway, Suite 400, San Francisco, CA 94103',
  businessHours: 'Mon - Fri: 8:00 AM - 6:00 PM (EST)'
};

if (!fs.existsSync(SETTINGS_PATH)) {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf-8');
}

// Credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';
const JWT_SECRET = process.env.JWT_SECRET || 'has-art-skill-jwt-secret-key-2026-dynamic';

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Helper: Read Local Projects DB
function readLocalProjects(): Project[] {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading local projects database:', error);
  }
  return INITIAL_PROJECTS;
}

// Helper: Write Local Projects DB
function writeLocalProjects(projects: Project[]) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local projects database:', error);
  }
}

// Helper: Read Local Settings DB
interface Settings {
  spreadsheetId: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessHours: string;
}

function readLocalSettings(): Settings {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const data = fs.readFileSync(SETTINGS_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading settings file:', error);
  }
  return DEFAULT_SETTINGS;
}

// Helper: Write Local Settings DB
function writeLocalSettings(settings: Settings) {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing settings file:', error);
  }
}

// Google Sheets API setup helper
async function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  try {
    // Standard service account format handling
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    const formattedKey = privateKey.replace(/\\n/g, '\n');

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    await auth.authorize();
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Google Sheets Authentication failed:', error);
    return null;
  }
}

// Google Sheets Sync Functions
// The Google Sheet columns are:
// Project ID, Client Name, Company Name, Email, Phone, Service Required, Description, Deadline, Budget, Drive Link, File Name, Status, Priority, Submission Date, Notes, Timeline JSON
async function syncFromGoogleSheets(): Promise<Project[] | null> {
  const sheets = await getGoogleSheetsClient();
  const settings = readLocalSettings();
  const spreadsheetId = settings.spreadsheetId;

  if (!sheets || !spreadsheetId) {
    return null;
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Submissions!A2:P1000',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      // Sheet might be empty, let's write local projects to it to seed it
      await syncToGoogleSheets(readLocalProjects());
      return readLocalProjects();
    }

    const projects: Project[] = rows.map((row) => {
      let parsedTimeline = [];
      try {
        parsedTimeline = row[15] ? JSON.parse(row[15]) : [];
      } catch (e) {
        parsedTimeline = [];
      }

      return {
        id: row[0] || '',
        clientName: row[1] || '',
        companyName: row[2] || '',
        email: row[3] || '',
        phone: row[4] || '',
        serviceRequired: row[5] || '',
        projectDescription: row[6] || '',
        deadline: row[7] || '',
        budget: row[8] || '',
        googleDriveLink: row[9] || '',
        uploadedFile: row[10] || '',
        status: (row[11] as ProjectStatus) || 'Todo',
        priority: (row[12] as ProjectPriority) || 'Medium',
        submissionDate: row[13] || new Date().toISOString(),
        notes: row[14] || '',
        timeline: parsedTimeline,
      };
    });

    // Update local DB for syncing offline
    writeLocalProjects(projects);
    return projects;
  } catch (error) {
    console.error('Error syncing from Google Sheets:', error);
    return null;
  }
}

async function syncToGoogleSheets(projects: Project[]): Promise<boolean> {
  const sheets = await getGoogleSheetsClient();
  const settings = readLocalSettings();
  const spreadsheetId = settings.spreadsheetId;

  if (!sheets || !spreadsheetId) {
    return false;
  }

  try {
    // Ensure the sheet/tab named 'Submissions' exists or create it
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Submissions',
                },
              },
            },
          ],
        },
      });
      
      // If we just created the sheet, write headers
      const headers = [
        [
          'Project ID',
          'Client Name',
          'Company Name',
          'Email',
          'Phone',
          'Service Required',
          'Description',
          'Deadline',
          'Budget',
          'Drive Link',
          'File Name',
          'Status',
          'Priority',
          'Submission Date',
          'Notes',
          'Timeline JSON',
        ],
      ];
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Submissions!A1:P1',
        valueInputOption: 'RAW',
        requestBody: { values: headers },
      });
    } catch (sheetErr: any) {
      // Expected if sheet already exists
    }

    const values = projects.map((proj) => [
      proj.id,
      proj.clientName,
      proj.companyName || '',
      proj.email,
      proj.phone || '',
      proj.serviceRequired,
      proj.projectDescription,
      proj.deadline,
      proj.budget || '',
      proj.googleDriveLink || '',
      proj.uploadedFile || '',
      proj.status,
      proj.priority,
      proj.submissionDate,
      proj.notes || '',
      JSON.stringify(proj.timeline),
    ]);

    // Clear previous rows to write clean data
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Submissions!A2:P1000',
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Submissions!A2',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return true;
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    return false;
  }
}

// Middleware: Authenticate Admin Session
const authenticateAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.admin_session;

  if (!token) {
    res.status(401).json({ error: 'Access denied. No active session found.' });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    (req as any).user = verified;
    next();
  } catch (error) {
    res.clearCookie('admin_session');
    res.status(401).json({ error: 'Session expired or invalid.' });
  }
};

// --- AUTH API ---

// Login API
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '12h' });

    res.cookie('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000, // 12 hours
    });

    res.json({ success: true, username });
  } else {
    res.status(401).json({ error: 'Invalid username or password.' });
  }
});

// Logout API
app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('admin_session');
  res.json({ success: true });
});

// Auth Status API
app.get('/api/auth/status', (req: Request, res: Response) => {
  const token = req.cookies.admin_session;

  if (!token) {
    res.json({ authenticated: false });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) as any;
    res.json({ authenticated: true, username: verified.username });
  } catch (error) {
    res.json({ authenticated: false });
  }
});

// --- PROJECTS API ---

// Fetch All Projects (supports sorting/filtering via API if wanted, but client-side does it easily too)
app.get('/api/projects', async (req: Request, res: Response) => {
  const googleProjects = await syncFromGoogleSheets();
  if (googleProjects) {
    res.json({ source: 'google_sheets', data: googleProjects });
  } else {
    const localProjects = readLocalProjects();
    res.json({ source: 'local_database', data: localProjects });
  }
});

// Submit a New Project
app.post('/api/projects', async (req: Request, res: Response) => {
  const {
    clientName,
    companyName,
    email,
    phone,
    serviceRequired,
    projectDescription,
    deadline,
    budget,
    uploadedFile,
    googleDriveLink,
    additionalNotes,
  } = req.body;

  if (!clientName || !email || !serviceRequired || !projectDescription || !deadline) {
    res.status(400).json({ error: 'Missing required project details.' });
    return;
  }

  const projects = readLocalProjects();
  
  // Find highest numeric ID or generate unique one
  const projectNumbers = projects.map(p => {
    const match = p.id.match(/HAS-(\d+)/);
    return match ? parseInt(match[1], 10) : 8100;
  });
  const nextIdNum = projectNumbers.length > 0 ? Math.max(...projectNumbers) + 1 : 8107;
  const newId = `HAS-${nextIdNum}`;

  const now = new Date().toISOString();
  const newProject: Project = {
    id: newId,
    clientName,
    companyName: companyName || '',
    email,
    phone: phone || '',
    serviceRequired,
    projectDescription,
    deadline,
    budget: budget || '',
    uploadedFile: uploadedFile || '',
    googleDriveLink: googleDriveLink || '',
    additionalNotes: additionalNotes || '',
    status: 'Todo',
    priority: 'Medium',
    submissionDate: now,
    notes: '',
    timeline: [
      {
        status: 'Todo',
        updatedAt: now,
        updatedBy: 'System',
        comment: 'Project files and details successfully submitted via Tally Form.',
      },
    ],
  };

  projects.unshift(newProject);
  writeLocalProjects(projects);

  const synced = await syncToGoogleSheets(projects);

  res.status(201).json({
    success: true,
    data: newProject,
    synced,
  });
});

// Update a Project (Status, Priority, Notes, Deadlines, etc.)
app.put('/api/projects/:id', authenticateAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, priority, notes, deadline, comment } = req.body;

  const projects = readLocalProjects();
  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  const targetProject = projects[projectIndex];
  const now = new Date().toISOString();
  const adminName = (req as any).user?.username || 'Admin';

  // Log status change if updated
  if (status && status !== targetProject.status) {
    targetProject.timeline.push({
      status: status as ProjectStatus,
      updatedAt: now,
      updatedBy: adminName,
      comment: comment || `Status updated from "${targetProject.status}" to "${status}".`,
    });
    targetProject.status = status as ProjectStatus;
  }

  if (priority) {
    targetProject.priority = priority as ProjectPriority;
  }

  if (notes !== undefined) {
    targetProject.notes = notes;
  }

  if (deadline) {
    targetProject.deadline = deadline;
  }

  projects[projectIndex] = targetProject;
  writeLocalProjects(projects);

  const synced = await syncToGoogleSheets(projects);

  res.json({
    success: true,
    data: targetProject,
    synced,
  });
});

// --- SETTINGS API ---

// Get Settings
app.get('/api/settings', (req: Request, res: Response) => {
  const settings = readLocalSettings();
  const hasGoogleCreds = !!process.env.GOOGLE_CLIENT_EMAIL && !!process.env.GOOGLE_PRIVATE_KEY;
  res.json({
    ...settings,
    googleSheetsConnected: hasGoogleCreds && !!settings.spreadsheetId,
    credentialsConfigured: hasGoogleCreds,
  });
});

// Update Settings
app.put('/api/settings', authenticateAdmin, (req: Request, res: Response) => {
  const { spreadsheetId, businessName, businessEmail, businessPhone, businessAddress, businessHours } = req.body;

  const currentSettings = readLocalSettings();
  const updated = {
    spreadsheetId: spreadsheetId !== undefined ? spreadsheetId : currentSettings.spreadsheetId,
    businessName: businessName || currentSettings.businessName,
    businessEmail: businessEmail || currentSettings.businessEmail,
    businessPhone: businessPhone || currentSettings.businessPhone,
    businessAddress: businessAddress || currentSettings.businessAddress,
    businessHours: businessHours || currentSettings.businessHours,
  };

  writeLocalSettings(updated);
  res.json({ success: true, settings: updated });
});

// Trigger manual Google Sheet sync back-and-forth
app.post('/api/settings/sync', authenticateAdmin, async (req: Request, res: Response) => {
  const syncedProjects = await syncFromGoogleSheets();
  if (syncedProjects) {
    res.json({ success: true, message: 'Successfully synced from Google Sheets!', count: syncedProjects.length });
  } else {
    // If getting fails, try updating Sheets with current local database to initialize
    const local = readLocalProjects();
    const success = await syncToGoogleSheets(local);
    if (success) {
      res.json({ success: true, message: 'Google Sheets was empty or offline; successfully uploaded local database to Sheet.' });
    } else {
      res.status(500).json({ error: 'Sync failed. Verify your Google Sheet credentials, Spreadsheet ID, and permissions.' });
    }
  }
});


// --- FRONTEND INTEGRATION & VITE SERVER ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Mode: Use Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    
    app.use(vite.middlewares);
    console.log('Vite development server loaded.');
  } else {
    // Production Mode: Serve built files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production server mode active.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================================`);
    console.log(`  Has Art Skill - Full-Stack Express Server started!`);
    console.log(`  Server is running on: http://localhost:${PORT}`);
    console.log(`  Target Port: ${PORT} (Ingress Route Enabled)`);
    console.log(`========================================================`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting the full-stack server:', err);
});
