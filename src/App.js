import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Slaepage from './pages/Slaepage';
import Homepage from "./pages/Homepage";
import Notfoundpage from "./pages/Notfoundpage";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="slae" element={<Slaepage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </div>
  );
}

export default App;
