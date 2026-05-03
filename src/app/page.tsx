import StudyForm from '@/components/StudyForm';

export default function Home() {
  return (
    <main className="container" style={{ maxWidth: '1200px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '2rem', 
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <div className="card" style={{ flex: '1 1 400px', textAlign: 'center', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
            KIMIroutes LB
          </h2>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Campus Active Transport Analysis</h1>
          <div style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '1.25rem' }}>
              Hello! We are a team of student researchers taking CMSC 173 - Human-Computer Interaction at UPLB. We aim to evaluate the effectiveness of an app prototype that assists in campus active transport.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              For inquiries, you may contact any of us:
            </p>
            
            <div style={{ 
              textAlign: 'left', 
              background: 'rgba(255, 255, 255, 0.02)', 
              padding: '1.5rem 2rem', 
              borderRadius: '16px', 
              border: '1px solid var(--glass-border)' 
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                fontSize: '0.8rem',
                color: 'var(--text)',
              }}>
                <div>
                  <p style={{ fontWeight: 700 }}>Simonee Mariquit</p>
                  <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>smmariquit@up.edu.ph</p>
                </div>
                <div>
                  <p style={{ fontWeight: 700 }}>Hugz Bernados</p>
                  <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>hmbernados@up.edu.ph</p>
                </div>
                <div>
                  <p style={{ fontWeight: 700 }}>Kristina Doroja</p>
                  <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>kbdoroja@up.edu.ph</p>
                </div>
                <div>
                  <p style={{ fontWeight: 700 }}>Lane Bañes</p>
                  <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>tmbanes@up.edu.ph</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 500px' }}>
          <StudyForm />
        </div>
      </div>
    </main>
  );
}
