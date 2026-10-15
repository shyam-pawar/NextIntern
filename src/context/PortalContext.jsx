import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INTERNSHIPS, INITIAL_APPLICATIONS } from '../data/mockData';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  // Load from localStorage or seed
  const [internships, setInternships] = useState(() => {
    const saved = localStorage.getItem('nexintern_listings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_INTERNSHIPS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('nexintern_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_APPLICATIONS;
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('nexintern_user_role') || 'intern'; // 'intern' or 'admin'
  });

  const [activeApplyInternship, setActiveApplyInternship] = useState(null);
  const [lastSubmittedId, setLastSubmittedId] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nexintern_listings', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('nexintern_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('nexintern_user_role', userRole);
  }, [userRole]);

  // Submit Application
  const applyForInternship = (formData) => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = `INT-2026-${randomSuffix}`;

    const newApplication = {
      id: newId,
      internshipId: formData.internshipId,
      internshipTitle: formData.internshipTitle,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      degree: formData.degree,
      graduationYear: formData.graduationYear,
      gpa: formData.gpa || "N/A",
      linkedin: formData.linkedin || "",
      github: formData.github || "",
      portfolio: formData.portfolio || "",
      resumeUrl: formData.resumeName || "Candidate_Resume.pdf",
      coverNote: formData.coverNote || "Eager to learn and contribute.",
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Applied",
      rating: 0,
      notes: "Newly submitted application. Awaiting review.",
      onboarding: {
        mentorName: "Alex Vance",
        mentorEmail: "alex.vance@company.internal",
        mentorRole: "Senior Staff Engineering Lead",
        startDate: "First Monday of Next Month",
        teamSlack: "#team-interns-2026",
        orientationTime: "10:30 AM via Google Meet",
        checklist: [
          { id: "c1", title: "Sign Formal Offer Letter & Confidentiality Agreement", done: false },
          { id: "c2", title: "Upload Official ID & Student Verification Records", done: false },
          { id: "c3", title: "Complete Company Hardware & Laptop Request Form", done: false },
          { id: "c4", title: "Setup Corporate Email & Multi-Factor Authentication", done: false },
          { id: "c5", title: "Join Team Communication Channels (#welcome-interns)", done: false },
          { id: "c6", title: "Complete Day 1 Orientation & Mentor Sync", done: false }
        ]
      }
    };

    setApplications(prev => [newApplication, ...prev]);
    setLastSubmittedId(newId);
    return newApplication;
  };

  // Update candidate status (For HR / Admin)
  const updateApplicationStatus = (appId, newStatus, optionalNotes) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            notes: optionalNotes !== undefined ? optionalNotes : app.notes
          };
        }
        return app;
      })
    );
  };

  // Toggle onboarding checklist item (For Joinee / Intern)
  const toggleChecklistItem = (appId, checklistId) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId && app.onboarding) {
          const updatedChecklist = app.onboarding.checklist.map(item =>
            item.id === checklistId ? { ...item, done: !item.done } : item
          );
          return {
            ...app,
            onboarding: {
              ...app.onboarding,
              checklist: updatedChecklist
            }
          };
        }
        return app;
      })
    );
  };

  // Add new internship posting (Admin)
  const addInternship = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: `intern-0${internships.length + 1}`,
      postedDate: new Date().toISOString().split('T')[0],
      status: "Active"
    };
    setInternships(prev => [jobWithId, ...prev]);
    return jobWithId;
  };

  // Update internship posting (Admin)
  const updateInternship = (id, updatedFields) => {
    setInternships(prev =>
      prev.map(job => (job.id === id ? { ...job, ...updatedFields } : job))
    );
  };

  // Delete/Archive internship posting (Admin)
  const deleteInternship = (id) => {
    setInternships(prev => prev.filter(job => job.id !== id));
  };

  // Reset to seed data
  const resetToDefaults = () => {
    localStorage.removeItem('nexintern_listings');
    localStorage.removeItem('nexintern_applications');
    setInternships(INITIAL_INTERNSHIPS);
    setApplications(INITIAL_APPLICATIONS);
  };

  return (
    <PortalContext.Provider
      value={{
        internships,
        applications,
        userRole,
        setUserRole,
        activeApplyInternship,
        setActiveApplyInternship,
        lastSubmittedId,
        setLastSubmittedId,
        applyForInternship,
        updateApplicationStatus,
        toggleChecklistItem,
        addInternship,
        updateInternship,
        deleteInternship,
        resetToDefaults
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
