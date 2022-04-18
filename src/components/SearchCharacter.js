import { gql, useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const GET_CHARACTER_NAME = gql`
  query GetCharacterName($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;

function SearchCharacter() {
  const [name, setName] = useState();
  const [getCharacterName, { error, loading, data, called }] = useLazyQuery(
    GET_CHARACTER_NAME,
    {
      variables: {
        name,
      },
    }
  );
  useEffect(() => {
    if (name && name.length > 2) {
      getCharacterName();
    }
  }, [name]);

  return (
    <div>
      <SearchInput>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search for a character'
          inputProps={{ 'aria-label': 'search character' }}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value < 1) {
              setName(null);
            }
          }}
        />
        {loading && (
          <Box sx={{ display: 'inline', position: 'relative', right: '10px;' }}>
            <CircularProgress color='secondary' size={20} />
          </Box>
        )}
      </SearchInput>
      {name && error && (
        <div className='autocomplete search-error'>No results found</div>
      )}
      {data && (
        <ul className='autocomplete show-list'>
          {data.characters?.results.map((character) => {
            return (
              <li className='MuiInputBase-input '>
                <a href={`/${character.id}`}>{character.name}</a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchCharacter;

const SearchInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '19ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));
//MuiInputBase-input
