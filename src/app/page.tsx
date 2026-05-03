import StudyForm from '@/components/StudyForm';

export default function Home() {
  return (
    <main className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          KIMIroutes LB
        </h2>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Campus Active Transport Analysis</h1>
        <div style={{ color: 'var(--text-dim)', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem' }}>
            Hello! We are a team of student researchers taking CMSC 173 - Human-Computer Interaction at UPLB. We aim to evaluate the effectiveness of an app prototype that assists in campus active transport. Please answer the following questions for us to determine if you are qualified to participate in our study.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Should you have any questions, feel free to contact any of us.
          </p>
          <ul style={{ 
            textAlign: 'left', 
            display: 'inline-block', 
            listStyleType: 'disc', 
            paddingLeft: '1.5rem',
            marginTop: '1rem',
            color: 'var(--text-dim)',
            fontSize: '0.9rem'
          }}>
            <li>
              Simonee Ezekiel M. Mariquit - smmariquit@up.edu.ph
            </li>
            <li>
              Hugz Christian Bernados
            </li>
            <li>
              TBA
            </li>
            <li>
              TBA
            </li>
          </ul>
        </div>
      </div>

      <StudyForm />
    </main>
  );
}
