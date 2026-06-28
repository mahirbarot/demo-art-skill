/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ProjectStatus, ProjectPriority } from '../types';

export interface AuthStatusResponse {
  authenticated: boolean;
  username?: string;
}

export interface SettingsResponse {
  spreadsheetId: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessHours: string;
  googleSheetsConnected: boolean;
  credentialsConfigured: boolean;
}

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true };
    }
    return { success: false, error: data.error || 'Invalid credentials' };
  } catch (error) {
    return { success: false, error: 'Network error occurred during login.' };
  }
}

export async function logoutAdmin(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    return res.ok;
  } catch {
    return false;
  }
}

export async function checkAuthStatus(): Promise<AuthStatusResponse> {
  try {
    const res = await fetch('/api/auth/status');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error('Failed to verify auth status:', e);
  }
  return { authenticated: false };
}

export async function getProjects(): Promise<{ data: Project[]; source: string }> {
  try {
    const res = await fetch('/api/projects');
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
  return { data: [], source: 'error_fallback' };
}

export async function submitProject(projectData: Partial<Project>): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true, data: data.data };
    }
    return { success: false, error: data.error || 'Failed to submit project' };
  } catch (error) {
    return { success: false, error: 'Network error during project submission.' };
  }
}

export interface ProjectUpdateInput {
  status?: ProjectStatus;
  priority?: ProjectPriority;
  notes?: string;
  deadline?: string;
  comment?: string;
}

export async function updateProject(id: string, updateData: ProjectUpdateInput): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true, data: data.data };
    }
    return { success: false, error: data.error || 'Failed to update project' };
  } catch (error) {
    return { success: false, error: 'Network error during project update.' };
  }
}

export async function getSettings(): Promise<SettingsResponse | null> {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch settings:', error);
  }
  return null;
}

export async function updateSettings(settings: Partial<SettingsResponse>): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      return { success: true };
    }
    const data = await res.json();
    return { success: false, error: data.error || 'Failed to update settings' };
  } catch (error) {
    return { success: false, error: 'Network error during settings update.' };
  }
}

export async function triggerManualSync(): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/settings/sync', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      return { success: true, message: data.message };
    }
    return { success: false, error: data.error || 'Manual sync failed.' };
  } catch (error) {
    return { success: false, error: 'Network error during synchronization request.' };
  }
}
