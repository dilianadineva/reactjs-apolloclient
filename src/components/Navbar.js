import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import SearchCharacter from './SearchCharacter';
import { useNavigate } from 'react-router-dom';

export default function SearchAppBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate('search', { state: search });
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={`/`}>React Apollo Demo</Link>
          </Typography>
          <SearchCharacter />
          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
            }}
          >
            <SearchLocation>
              <Link
                to={{
                  pathname: '/search',
                  state: { data: 'sampledata' },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Link>
              <StyledInputBase
                placeholder='Search for a location'
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </SearchLocation> 
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const SearchLocation = styled('div')(({ theme }) => ({
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
      width: '18ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));
