import './App.css';
import Main from './components/Main';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reviews from './components/Reviews';
import Detail from './components/Detail';


function App() {

  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/shoe-detail" element={<Detail/>} />
          <Route path="/shoe-reviews" element={<Reviews/>} />
        </Routes>
      </Router>
       
       
    </div>
  );
}

export default App;
