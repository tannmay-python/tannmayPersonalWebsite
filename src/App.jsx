import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Work from './components/Work';
import Library from './components/Library';
import Hobbies from './components/Hobbies';
import Footer from './components/Footer';
import './components/components.css';

function App() {
  return (
    <div className="app">
      <div className="bg-gradient-mesh">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Work />
        <Library />
        <Hobbies />
      </main>
      <Footer />
    </div>
  );
}

export default App;
