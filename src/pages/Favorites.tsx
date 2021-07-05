import React from 'react';
import {
  Container, Typography, Button, Box, List, ListItem, Paper, makeStyles, Divider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Character } from '../interfaces';
import { useFavoriteChars } from '../hooks/useFavoriteChars';

const useStyles = makeStyles({
  container: {
    margin: 16,
    padding: 16,
  },
});

const Favorites = () => {
  const { chars, remove } = useFavoriteChars();
  const { push } = useHistory();
  const classes = useStyles();

  const handleRemove = (id: string | undefined) => {
    if (id) remove(id);
  };

  const navigateToDetails = (id: string | undefined) => {
    if (id) push(`/details/${id}`);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h2">Personagens Salvos</Typography>
        <Box>
          <List>
            {!!chars.length && chars.map((char: Character) => (
              <ListItem key={char.id}>
                <Box display="flex" width="100%" alignItems="center" justifyContent="space-between" padding={2}>
                  <Typography variant="body1">{char.name}</Typography>
                  <Box>
                    <Button variant="contained" onClick={() => navigateToDetails(char.id)}>Ver detalhes</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleRemove(char.id)}>Apagar</Button>
                  </Box>
                </Box>
                <Divider />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default Favorites;
