'use client';

import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { ChevronRight, CheckCircle, Mail, Link, User, ArrowRight, ShieldCheck, MapPin, Bike } from 'lucide-react';

export default function StudyForm() {
  const [step, setStep] = useState(1); // 0: Failure, 1: Screening, 2: Registration, 3: Consent, 4: Success
  const [formData, setFormData] = useState({
    isUPLB: null as boolean | null,
    isActiveTransport: null as boolean | null,
    isHCIStudent: null as boolean | null,
    name: '',
    email: '',
    fbContact: '',
    hasConsented: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScreening = (key: 'isUPLB' | 'isActiveTransport' | 'isHCIStudent', value: boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleNextFromScreening = () => {
    if (formData.isUPLB === false || formData.isActiveTransport === false || formData.isHCIStudent === true) {
      setStep(0); // Show failure
    } else {
      setStep(2);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hasConsented) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            consentTimestamp: new Date().toISOString()
          }),
        });

        if (response.ok) {
          setStep(4);
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert('Error sending data.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please agree to the consent form to continue.');
    }
  };

  if (step === 0) {
    return (
      <div className="card text-center animate-in">
        <h2 style={{ marginBottom: '1rem' }}>Thank you for your interest!</h2>
        <p style={{ color: 'var(--text-dim)' }}>
          Unfortunately, you do not meet the specific selection criteria for this academic study. 
          We are looking for participants who are UPLB students/staff, users of active transport, and not currently enrolled in CMSC 173.
        </p>
        <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ width: '100%' }}>
      <div className="step-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}></div>
      </div>

      {step === 1 && (
        <div className="animate-in">
          <h1 style={{ marginBottom: '0.5rem' }}>Participant Screening</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Please answer these questions to verify eligibility.</p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>1. Are you a student, faculty, or staff of UPLB?</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div 
                className={`selection-card ${formData.isUPLB === true ? 'selected' : ''}`}
                style={{ flex: 1, padding: '1rem' }}
                onClick={() => handleScreening('isUPLB', true)}
              >
                <MapPin size={18} /> Yes
              </div>
              <div 
                className={`selection-card ${formData.isUPLB === false ? 'selected' : ''}`}
                style={{ flex: 1, padding: '1rem' }}
                onClick={() => handleScreening('isUPLB', false)}
              >
                No
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>2. Do you use active transport as a primary means of transportation in campus?</label>
            <div className="definition" style={{ padding: '0.5rem', fontSize: '0.8rem' }}>
              <strong>Definition:</strong> Active transport refers to physical activity as a means of transport (walking, cycling, etc).
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              <div 
                className={`selection-card ${formData.isActiveTransport === true ? 'selected' : ''}`}
                style={{ flex: 1, padding: '1rem' }}
                onClick={() => handleScreening('isActiveTransport', true)}
              >
                <Bike size={18} /> Yes
              </div>
              <div 
                className={`selection-card ${formData.isActiveTransport === false ? 'selected' : ''}`}
                style={{ flex: 1, padding: '1rem' }}
                onClick={() => handleScreening('isActiveTransport', false)}
              >
                No
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>3. Are you currently enrolled in UPLB CMSC 173 - HCI?</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div 
                className={`selection-card ${formData.isHCIStudent === true ? 'selected' : ''}`}
                style={{ flex: 1, padding: '1rem' }}
                onClick={() => handleScreening('isHCIStudent', true)}
              >
                Yes
              </div>
              <div 
                className={`selection-card ${formData.isHCIStudent === false ? 'selected' : ''}`}
                style={{ flex: 1, padding: '1rem' }}
                onClick={() => handleScreening('isHCIStudent', false)}
              >
                No
              </div>
            </div>
          </div>

          {formData.isUPLB !== null && formData.isActiveTransport !== null && formData.isHCIStudent !== null && (
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNextFromScreening}>
              Continue to Registration <ChevronRight size={18} />
            </button>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="animate-in">
          <h1 style={{ marginBottom: '0.5rem' }}>Contact Details</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>How can we reach you and send your study materials?</p>

          <div className="input-group">
            <label><User size={14} style={{ marginRight: '4px' }} /> Full Name</label>
            <input 
              type="text" 
              placeholder="Juan Dela Cruz" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label><Mail size={14} style={{ marginRight: '4px' }} /> Email Address</label>
            <input 
              type="email" 
              placeholder="juan@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label><Link size={14} style={{ marginRight: '4px' }} /> FB Contact Link/Name</label>
            <input 
              type="text" 
              placeholder="fb.com/juan.dc" 
              value={formData.fbContact}
              onChange={(e) => setFormData({ ...formData, fbContact: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>Back</button>
            <button 
              className="btn btn-primary" 
              style={{ flex: 2 }} 
              disabled={!formData.name || !formData.email || !formData.fbContact}
              onClick={nextStep}
            >
              Consent Form <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in">
          <h1 style={{ marginBottom: '0.5rem' }}>Consent Form</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>Please read and sign below to participate in the study.</p>

          <div style={{ 
            maxHeight: '250px', 
            overflowY: 'auto', 
            background: 'rgba(255,255,255,0.02)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            border: '1px solid var(--glass-border)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Informed Consent for "KIMIroutes LB: Campus Active Transport Study"</h3>
            <p>I volunteer to participate in a research study conducted by UPLB students. I understand that the study is designed to gather information about campus active transport. I will be asked to complete two tasks on the Maze platform.</p>
            <p style={{ marginTop: '0.5rem' }}>My participation in this research is voluntary. I may withdraw and discontinue participation at any time without penalty. All information I provide will be kept confidential and used only for research purposes.</p>
            <p style={{ marginTop: '0.5rem' }}>By signing below, I acknowledge that I have read the above information and agree to participate in this study.</p>
          </div>

          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '1rem', 
              background: 'rgba(255, 255, 255, 0.02)', 
              padding: '1.25rem', 
              borderRadius: '12px', 
              border: '1px solid var(--glass-border)',
              cursor: 'pointer'
            }}
            onClick={() => setFormData({ ...formData, hasConsented: !formData.hasConsented })}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '6px', 
              border: '2px solid var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: formData.hasConsented ? 'var(--primary)' : 'transparent',
              transition: 'all 0.2s',
              flexShrink: 0
            }}>
              {formData.hasConsented && <CheckCircle size={16} color="white" />}
            </div>
            <p style={{ fontSize: '0.9rem', color: formData.hasConsented ? 'var(--text)' : 'var(--text-dim)', lineHeight: '1.4' }}>
              I have read the informed consent and I voluntarily agree to participate in this study. I understand that my data will be used for research purposes only.
            </p>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.5rem', textAlign: 'right' }}>
            <ShieldCheck size={10} style={{ verticalAlign: 'middle', marginRight: '2px' }} /> 
            Consent will be timestamped and emailed to you.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>Back</button>
            <button 
              className="btn btn-primary" 
              style={{ flex: 2 }} 
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Processing...' : 'Sign & Submit'}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center animate-in">
          <div className="success-badge">
            <CheckCircle size={16} /> Registration Complete
          </div>
          <h1 style={{ marginBottom: '1rem' }}>Check Your Email!</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
            We've sent your custom study instructions to <strong>{formData.email}</strong>. 
            Please check your inbox (and spam folder) to find your unique links to the Maze study.
          </p>
          <div style={{ 
            background: 'rgba(59, 130, 246, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(59, 130, 246, 0.3)',
            marginBottom: '1rem',
            textAlign: 'left'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#60a5fa' }}>
              <strong>⚠️ Important:</strong> When you start the Maze tasks, please use the <strong>exact same name</strong> you provided here: <span style={{ textDecoration: 'underline', color: 'white' }}>{formData.name}</span>. This is required for us to match your registration with your study results.
            </p>
          </div>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.05)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(16, 185, 129, 0.2)',
            marginBottom: '2rem'
          }}>
            <p style={{ fontSize: '0.9rem' }}>
              <strong>Note:</strong> To ensure accurate results, please follow the order specified in your email.
            </p>
          </div>
          <button className="btn btn-outline" onClick={() => window.location.reload()}>
            Start New Entry
          </button>
        </div>
      )}
    </div>
  );
}
