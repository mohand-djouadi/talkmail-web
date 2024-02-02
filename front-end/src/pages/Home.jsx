import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import MainSection from '../components/MainSection';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <MainSection />
    </div>
  );
}

export default Home;
