import logo from './logo.svg';
import './App.css';
import Home from './Home'
import { useState } from 'react';
import Pagina from './Pagina';

function App() {

  const [nombre, setNombre] = useState('')

  return (
    <div className="App">
      <Home/>

    </div>
  );
}

export default App;
