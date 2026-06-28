/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { 
  FileUp, Link2, CheckCircle, ArrowRight, AlertCircle, 
  HelpCircle, Calendar, DollarSign, Briefcase, FileCode, ExternalLink
} from 'lucide-react';
import { submitProject } from '../services/api';

interface SubmitProjectPageProps {
  preselectedService: string;
  onPageChange: (pageId: string) => void;
}

interface ProjectSubmissionInputs {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectDescription: string;
  deadline: string;
  budget: string;
  uploadedFile: string;
  googleDriveLink: string;
  additionalNotes: string;
}

export default function SubmitProjectPage({ preselectedService, onPageChange }: SubmitProjectPageProps) {
  const [useTallyEmbed, setUseTallyEmbed] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newProjectId, setNewProjectId] = useState('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<ProjectSubmissionInputs>({
    defaultValues: {
      serviceRequired: preselectedService || 'Vector Conversion',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // default 3 days from now
    }
  });

  // Pre-fill if the preselected service changes
  useEffect(() => {
    if (preselectedService) {
      setValue('serviceRequired', preselectedService);
    }
  }, [preselectedService, setValue]);

  const servicesList = [
    'Vector Conversion',
    'Clipping Path',
    'Background Removal',
    'Image Masking',
    'Photo Retouching',
    'Shadow Creation',
    'Ghost Mannequin',
    'Color Change',
    'Image Manipulation',
    'Digitizing Services'
  ];

  const onSubmitProject = async (data: ProjectSubmissionInputs) => {
    const payload = {
      ...data,
      uploadedFile: fileToUpload ? fileToUpload.name : data.uploadedFile || 'direct_submission.zip'
    };

    const res = await submitProject(payload);
    if (res.success && res.data) {
      setNewProjectId(res.data.id);
      setSubmitSuccess(true);
      reset();
      setFileToUpload(null);
    } else {
      alert(res.error || 'Failed to submit project. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File is greater than 10MB limit. Please upload to Google Drive/Dropbox and paste the sharing link below.');
        return;
      }
      setFileToUpload(file);
    }
  };

  return (
    <div className="pt-20">
      {/* Submit Header */}
      <section className="bg-gray-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="font-mono text-xs font-semibold tracking-widest text-brand-blue uppercase">
              SECURE WORKSPACE INTAKE
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-none">
              Submit Your Graphics Project
            </h1>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Upload files directly (under 10MB) or provide shared folder links. Select your submission preferences below to initiate immediate production review.
            </p>

            {/* Toggle form type */}
            <div className="flex items-center justify-center p-1 bg-gray-900 border border-gray-800 rounded-lg max-w-sm mx-auto">
              <button
                onClick={() => setUseTallyEmbed(false)}
                className={`flex-1 py-2 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                  !useTallyEmbed 
                    ? 'bg-brand-blue text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Direct Form (Syncs Admin)
              </button>
              <button
                onClick={() => setUseTallyEmbed(true)}
                className={`flex-1 py-2 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                  useTallyEmbed 
                    ? 'bg-brand-blue text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Tally Form Embed
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Submission Area */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {useTallyEmbed ? (
              /* Tally embed viewport */
              <motion.div
                key="tally-embed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-6 text-center"
                id="tally-embed-container"
              >
                <div className="glass-card rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 h-[800px] relative">
                  <iframe
                    title="Has Art Skill Intake"
                    src="https://tally.so/embed/mO07p5?alignLeft=1&hideTitle=1&transparentBackground=1"
                    className="w-full h-full border-none"
                    loading="lazy"
                  />
                </div>
                <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
                  <span>Standard Tally Integration Active. External files collected into workspace G-Sheet.</span>
                </div>
              </motion.div>
            ) : submitSuccess ? (
              /* Success screen */
              <motion.div
                key="submit-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-12 rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/10 text-center space-y-6 text-left max-w-xl mx-auto"
              >
                <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                    Project Submitted Successfully!
                  </h2>
                  <p className="text-sm font-mono text-brand-blue font-bold">
                    TICKET ID: {newProjectId}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
                    Your graphics files have been queued for pre-production. Our coordinators will review and match your specs within 4 hours. You can track this ticket in the Admin Dashboard!
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-3 bg-black hover:bg-brand-blue text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Project
                  </button>
                  <button
                    onClick={() => onPageChange('admin')}
                    className="px-6 py-3 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-medium text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors cursor-pointer"
                  >
                    View Admin Dashboard
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Interactive direct form */
              <motion.div
                key="direct-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-xl p-8 sm:p-12 text-left"
              >
                <div className="mb-10 space-y-2">
                  <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                    Intake Requirements Wizard
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Submit your parameters below. These fields automatically map, synchronize, and update to our Google Sheet and backend table.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmitProject)} className="space-y-6" id="intake-form">
                  
                  {/* Grid client particulars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        {...register('clientName', { required: 'Name is required.' })}
                        className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 bg-white dark:bg-gray-950 ${
                          errors.clientName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue'
                        }`}
                      />
                      {errors.clientName && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.clientName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Scribe Apparel Co."
                        {...register('companyName')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue text-sm transition-colors focus:outline-none focus:ring-1 bg-white dark:bg-gray-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. sarah@scribe.com"
                        {...register('email', { 
                          required: 'Email is required.',
                          pattern: { value: /^\S+@\S+$/i, message: 'Please provide valid email.' }
                        })}
                        className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 bg-white dark:bg-gray-950 ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. +1 (555) 392-1049"
                        {...register('phone')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue text-sm transition-colors focus:outline-none focus:ring-1 bg-white dark:bg-gray-950"
                      />
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                      Service Required *
                    </label>
                    <select
                      {...register('serviceRequired', { required: 'Please select a service.' })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue text-sm focus:outline-none focus:ring-1 bg-white dark:bg-gray-950 cursor-pointer"
                    >
                      {servicesList.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                      Project Description *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify dimensions, file formats (AI, PSD, EPS, DST), stitches, density, collar shadow, background specs, etc."
                      {...register('projectDescription', { required: 'Please describe your request.' })}
                      className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 bg-white dark:bg-gray-950 ${
                        errors.projectDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue'
                      }`}
                    />
                    {errors.projectDescription && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.projectDescription.message}
                      </p>
                    )}
                  </div>

                  {/* Deadline & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Deadline Target *
                      </label>
                      <input
                        type="date"
                        {...register('deadline', { required: 'Deadline is required.' })}
                        className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 bg-white dark:bg-gray-950 ${
                          errors.deadline ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue'
                        }`}
                      />
                      {errors.deadline && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.deadline.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                        Target Budget ($)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. $150"
                        {...register('budget')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue text-sm transition-colors focus:outline-none focus:ring-1 bg-white dark:bg-gray-950"
                      />
                    </div>
                  </div>

                  {/* Dual upload strategy */}
                  <div className="border border-gray-100 dark:border-gray-800/80 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-900/40 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                      
                      {/* Direct Upload (<10MB) */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                          <FileUp className="w-3.5 h-3.5 text-gray-400" />
                          Upload Files (&lt; 10 MB)
                        </label>
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-brand-blue transition-colors rounded-lg p-5 text-center relative cursor-pointer bg-white dark:bg-gray-950">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-brand-blue block">
                              {fileToUpload ? fileToUpload.name : 'Choose file or drag here'}
                            </span>
                            <span className="text-[9px] text-gray-400 block">
                              PDF, ZIP, AI, JPG, EPS etc. (Max 10MB)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Google Drive Link (>10MB) */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                          <Link2 className="w-3.5 h-3.5 text-gray-400" />
                          Drive Link (&gt; 10 MB)
                        </label>
                        <input
                          type="url"
                          placeholder="https://drive.google.com/..."
                          {...register('googleDriveLink')}
                          className="w-full px-4 py-[15px] rounded-lg border border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue text-xs focus:outline-none focus:ring-1 bg-white dark:bg-gray-950"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Additional notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                      Additional Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Add any additional comments or special instructions..."
                      {...register('additionalNotes')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:border-brand-blue focus:ring-brand-blue text-sm focus:outline-none focus:ring-1 bg-white dark:bg-gray-950"
                    />
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-project-btn"
                    className="w-full py-4.5 rounded-lg bg-black hover:bg-brand-blue text-white font-semibold text-sm transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Queueing Project files...</span>
                    ) : (
                      <>
                        <span>Submit Project to Queue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
