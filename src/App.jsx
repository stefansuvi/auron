import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftPane from './components/LeftPane';
import Stocks from './pages/Stocks';
import Dashboard from './pages/Dashboard';
import Portfolios from './pages/Portfolios';
import NavBar from './components/NavBar';
import InputField from './components/InputField';
// import Analyses from './pages/Analyses';
// import Wallet from './pages/Wallet';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen ">
        <LeftPane />
        <div className="flex-1 bg-[#181818] p-6 flex flex-col app">
          <NavBar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Stocks />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portfolios" element={<Portfolios />} />
            </Routes>
          </div>
          <div className="mt-4">
            <InputField />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App