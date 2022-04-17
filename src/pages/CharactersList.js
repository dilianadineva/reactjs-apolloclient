import React from 'react';
import CharacterCard from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';
import './CharactersList.css';

function CharactersList() {
  const { error, loading, data } = useCharacters();

  if (loading) return <div>loading</div>;
  if (error) return <div>error </div>;

  return (
    <div className='charactersList'>
      {data.characters.results.map((character) => {
        return <CharacterCard key={character.id} character={character} />;
      })}
    </div>
  );
}

export default CharactersList;
