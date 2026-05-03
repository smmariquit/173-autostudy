"use client";

import { useState, useEffect } from "react";
import StudyForm from "@/components/StudyForm";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState<'intro' | 'form'>('intro');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="container">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '1.5rem', 
        alignItems: 'stretch',
        flexWrap: 'wrap',
        maxHeight: '100%',
        justifyContent: 'center'
      }}>
        {/* Intro Panel - Hidden on mobile if form is shown */}
        {(!isMobile || mobileStep === 'intro') && (
          <div className="card animate-in" style={{ 
            flex: '1 1 350px', 
            textAlign: 'center', 
            padding: '2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            minHeight: isMobile ? 'auto' : '600px'
          }}>
            <h2 style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              KIMIroutes LB
            </h2>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.2' }}>Campus Active Transport Analysis</h1>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              <p style={{ marginBottom: '1rem' }}>
                Hello! We are student researchers at UPLB evaluating an app prototype for campus active transport. <strong>This study uses a Figma prototype.</strong>
              </p>
              <div style={{ 
                textAlign: 'left', 
                background: 'rgba(255, 255, 255, 0.08)', 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid var(--glass-border)',
                marginBottom: '1rem'
              }}>
                <strong>What is a Figma prototype?</strong><br/>
                You will interact with a clickable mockup, not a real app.<br/>
                <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
                  <li>You <b>cannot type</b> or enter text.</li>
                  <li>Some buttons or fields may not be interactive.</li>
                  <li>Only certain flows are clickable to simulate the experience.</li>
                </ul>
                Please focus on the navigation and overall experience, not on entering data.
              </div>
              <div style={{ 
                textAlign: 'left', 
                background: 'rgba(255, 255, 255, 0.02)', 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid var(--glass-border)',
                marginBottom: '1.5rem'
              }}>
                <p style={{ marginBottom: '0.75rem', fontSize: '0.8rem', textAlign: 'center', opacity: 0.8 }}>Contact Research Team:</p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.75rem',
                  fontSize: '0.75rem',
                  color: 'var(--text)',
                }}>
                  <div>
                    <p style={{ fontWeight: 700 }}>Simonee Mariquit</p>
                    <p style={{ opacity: 0.6, fontSize: '0.7rem' }}>smmariquit@up.edu.ph</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700 }}>Hugz Bernados</p>
                    <p style={{ opacity: 0.6, fontSize: '0.7rem' }}>hmbernados@up.edu.ph</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700 }}>Kristina Doroja</p>
                    <p style={{ opacity: 0.6, fontSize: '0.7rem' }}>kbdoroja@up.edu.ph</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700 }}>Lane Bañes</p>
                    <p style={{ opacity: 0.6, fontSize: '0.7rem' }}>tmbanes@up.edu.ph</p>
                  </div>
                </div>
              </div>

              {isMobile && (
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => setMobileStep('form')}
                >
                  Continue to Screening
                </button>
              )}
            </div>
          </div>
        )}

        {/* Form Panel - Hidden on mobile if intro is shown */}
        {(!isMobile || mobileStep === 'form') && (
          <div className="animate-in" style={{ flex: '1 1 450px', display: 'flex', minHeight: isMobile ? 'auto' : '600px', width: isMobile ? '100%' : 'auto' }}>
            <div style={{ width: '100%' }}>
              {isMobile && (
                <button 
                  onClick={() => setMobileStep('intro')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--primary)', 
                    marginBottom: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  ← Back to Info
                </button>
              )}
              <StudyForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
