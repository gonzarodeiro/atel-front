import './App.css';
import Jitsi from './components/Jitsi.js';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Pruebita commit</p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
      <div className='topcorner'>
        <Jitsi room='CODE-ROOM-TEST' userName='Augusto' />
      </div>
    </div>
  );
}

export default App;
