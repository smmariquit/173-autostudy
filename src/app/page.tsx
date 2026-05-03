import StudyForm from '@/components/StudyForm';

export default function Home() {
  return (
    <main className="container">
      <div className="card" style={{ textAlign: 'center', marginBottom: '3rem', padding: '2.5rem' }}>
        <h2 style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
          KIMIroutes LB
        </h2>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Campus Active Transport Analysis</h1>
        <div style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '1.25rem' }}>
            Hello! We are a team of student researchers taking CMSC 173 - Human-Computer Interaction at UPLB. We aim to evaluate the effectiveness of an app prototype that assists in campus active transport.
          </p>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Please answer the screening questions below to determine your eligibility. For inquiries, you may contact any of us:
          </p>
          
          <div style={{ 
            display: 'inline-block', 
            textAlign: 'left', 
            background: 'rgba(255, 255, 255, 0.02)', 
            padding: '1.5rem 2rem', 
            borderRadius: '16px', 
            border: '1px solid var(--glass-border)',
            width: '100%'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              fontSize: '0.85rem',
              color: 'var(--text)',
            }}>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Simonee Ezekiel M. Mariquit</p>
                <p style={{ opacity: 0.6 }}>smmariquit@up.edu.ph</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Hugz Christian Bernados</p>
                <p style={{ opacity: 0.6 }}>hmbernados@up.edu.ph</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Kristina Doroja</p>
                <p style={{ opacity: 0.6 }}>kbdoroja@up.edu.ph</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Lane Bañes</p>
                <p style={{ opacity: 0.6 }}>tmbanes@up.edu.ph</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StudyForm />
    </main>
  );
}
