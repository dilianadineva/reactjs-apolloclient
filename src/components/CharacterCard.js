import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CharacterCard({ character, pageview }) {
  return (
    <Card key={character.id} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link to={`/${character.id}`}>
          <CardMedia
            component='img'
            height='300'
            image={character.image}
            alt={character.name}
          />
        </Link>
        <CardContent>
          <Link to={`/${character.id}`}>
            <Typography gutterBottom variant='h5' component='div'>
              {character.name}
            </Typography>
          </Link>
          <Typography variant='body2' color='text.secondary'>
            Origin: {character.origin.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Gender: {character.gender}
            {character.status && `, Status: ${character.status}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      {!pageview && (
        <CardActions>
            <Link to={`/${character.id}`}>
              <Button size='small'>Learn More</Button>
            </Link>
        </CardActions>
      )}
    </Card>
  );
}

export default CharacterCard;
