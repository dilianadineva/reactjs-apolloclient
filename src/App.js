import './App.css';
import React from 'react';
import CharactersList from './pages/CharactersList';
import { Routes, Route } from 'react-router-dom';
import Character from './pages/Character';
import Search from './pages/Search';
import SearchAppBar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <SearchAppBar />
      <Routes>
        <Route exact path='/' element={<CharactersList />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/:id' element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
