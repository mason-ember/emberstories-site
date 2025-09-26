import './App.css'

function App() {
  return (
    <>
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '3rem', color: '#3B074B', marginBottom: '20px' }}>🔥</h1>
        <h1 style={{ fontSize: '2.5rem', color: '#3B074B', marginBottom: '10px' }}>Ember Stories</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Transform your family photos into beautiful, collaborative stories.
        </p>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: '20px' }}>
            Coming Soon to the App Store
          </p>
          <p style={{ color: '#888' }}>
            Sign up for early access and be the first to turn your memories into stories.
          </p>
        </div>

        <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>
            © 2025 William Mason Shewman, LLC
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/privacy.html" style={{ color: '#3498db', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="/terms.html" style={{ color: '#3498db', textDecoration: 'none' }}>
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
