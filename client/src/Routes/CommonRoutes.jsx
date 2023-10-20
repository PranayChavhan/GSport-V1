// AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Topbar from '../Components/Navbar';
import AboutUs from '../Pages/AboutUs';
import Blog from '../Pages/Blog';
import EnterArenaPage from '../Pages/EnterArenaPage';
import Features from '../Pages/Features';
import Welcome from '../Pages/Welcome';

const CommonRoutes = () => {
  return (
    <Router>
      <Topbar/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/enter-arena" element={<EnterArenaPage/>} />
        <Route exact path="/features" element={<Features/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/blog" element={<Blog/>} />
        
        {/* <Route path="*" element={<Welcome />} /> */}
      </Routes>
    </Router>
  );
};

export default CommonRoutes;
