import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const GET_CHARACTER_LOCATION = gql`
  query GetCharacterLocation($state: String!) {
    characters(filter: { name: $state }) {
      results {
        name
        location {
          name
        }
      }
    }
  }
`;

function Search() {
  const [name, setName] = useState();
  const { state } = useLocation();

  useEffect(() => {
    setName(state);
    getLocations();
  }, [state]);

  const [getLocations, { error, loading, data, called }] = useLazyQuery(
    GET_CHARACTER_LOCATION,
    {
      variables: {
        state,
      },
    }
  );
  return (
    <div>
      {loading && <div>loading</div>}
      {error && <div>No data was found for {name} </div>}
      {data && (
        <Box sx={{ width: '100%' }}>
          <Stack alignItems='center' spacing={2}>
            <Item style={{ marginTop: '30px', boxShadow: 'none' }}>
              <h3>Location search results for '{name}': </h3>
            </Item>
            {data.characters.results.map((character) => {
              return (
                <>
                  <Item style={{ marginTop: '30px', boxShadow: 'none' }}>
                    <h4>Location for '{character.name}': </h4>
                  </Item>
                  <Item>{character.location.name}</Item>
                </>
              );
            })}
          </Stack>
        </Box>
      )}
    </div>
  );
}

export default Search;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '500px',
}));
