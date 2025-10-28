import './App.css';
import Ballpit from './Ballpit';
function App() {
  return (
    <div style={{position: 'relative', overflow: 'hidden', height: '100vh', width: '100vw'}}>
      <Ballpit
        count={100}
        gravity={0.02}
        friction={0.9975}
        wallBounce={0.95}
        followCursor={true}
      />
      <h1
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          color: '#ffffff',
          fontSize:"75px",
          textAlign: 'center',
          zIndex: 1000,
          pointerEvents: 'none',
          userSelect: 'none',
          textShadow: '0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(102,126,234,0.6), 0 0 30px rgba(118,75,162,0.45)',
          transition: 'text-shadow 200ms ease-in-out'
        }}
      >
        VisuAlgo
      </h1>

      
      <button
        style={{
          position: 'absolute',
            top: '55%', 
            left: '50%',
            transform: 'translateX(-50%)',
          zIndex: 1001,      
          pointerEvents: 'auto'
        }}
        onClick={() => window.location.href = '/index/main2.html'}
>
        Get Started
      </button>
    </div>
  );
}

export default App;
