import React, { useState } from 'react';
import Header from './components/Header';
import BlogList from './components/BlogList/BlogList';
import { posts } from './data/posts';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={isDarkMode ? 'app darkMode' : 'app'}>
      <Header />
      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <main className="main-content">
        <BlogList posts={posts} />
      </main>
    </div>
  );
}

export default App;
