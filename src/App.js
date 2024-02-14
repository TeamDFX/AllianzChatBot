import { Helmet } from 'react-helmet';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import Login from './components/login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Allianz Chatbot</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
