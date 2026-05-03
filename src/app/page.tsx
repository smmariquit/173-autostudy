import StudyForm from '@/components/StudyForm';

export default function Home() {
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
        <div className="card" style={{ 
          flex: '1 1 350px', 
          textAlign: 'center', 
          padding: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          minHeight: '600px' // Stable height
        }}>
          <h2 style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
            KIMIroutes LB
          </h2>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.2' }}>Campus Active Transport Analysis</h1>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            <p style={{ marginBottom: '1rem' }}>
              Hello! We are student researchers at UPLB evaluating an app prototype for campus active transport.
            </p>
            <p style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
              For inquiries, contact any of us:
            </p>
            
            <div style={{ 
              textAlign: 'left', 
              background: 'rgba(255, 255, 255, 0.02)', 
              padding: '1rem 1.5rem', 
              borderRadius: '16px', 
              border: '1px solid var(--glass-border)' 
            }}>
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
          </div>
        </div>

        <div style={{ flex: '1 1 450px', display: 'flex', minHeight: '600px' }}>
          <StudyForm />
        </div>
      </div>
    </main>
  );
}
