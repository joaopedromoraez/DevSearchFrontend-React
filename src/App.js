import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() =>{
    async function loadDevs(){
      const {data} = await api.get('/devs');
      setDevs(data);
    }
    loadDevs();
  },[]);

  async function handleAddDev(params){
    const {data} = await api.post('/devs', params)
    setDevs([...devs, data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => <DevItem key={dev._id} {...{dev}} />)}
        </ul>
      </main>
    </div>
  );
}

export default App;
