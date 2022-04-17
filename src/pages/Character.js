import React from 'react';
import { useParams } from 'react-router';
import CharacterCard from '../components/CharacterCard';
import { useCharacter } from '../hooks/useCharacter';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

function Character() {
  const { id } = useParams();
  const { loading, error, data } = useCharacter(id);
  if (loading) return <div>loading</div>;
  if (error) return <div>error {JSON.stringify(error.message)}</div>;
  const styles = {
    padding: '5px'
};

  return (
    <div className='page-character-info'>
    <div className='page-character-card'>
      <CharacterCard character={data.character} pageview={true} />
      </div>
      <div className='episodes'>
        <Typography variant="h6" style={styles}>Episode List:</Typography>
        <div className='episode-list'>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              {data.character.episode.map((episode) => {
                return (
                  <Item key={episode.episode}>
                    {episode.episode}: {episode.name}
                  </Item>
                );
              })}
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Character;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
