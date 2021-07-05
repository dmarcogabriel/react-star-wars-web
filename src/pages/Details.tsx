import React from 'react';
import {
  Typography, Button, Box, Divider, CircularProgress, List, ListItem, Paper, makeStyles,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../services/api';
import { Character } from '../interfaces';
import { useFavoriteChars } from '../hooks/useFavoriteChars';
import FilmList from './FilmList';

const useStyles = makeStyles({
  container: {
    margin: 16,
    padding: 16,
  },
});

const Details = () => {
  const classes = useStyles();
  const { id } = useParams<{id: string}>();
  const { goBack } = useHistory();
  const { favorite, find } = useFavoriteChars();

  const handleCancel = () => goBack();

  const handleSave = (char: Character | undefined) => {
    if (char) favorite({ ...char, id });
  };

  const savedChar = (): string => {
    const foundedChar = find(id);
    if (foundedChar) return 'Salvo';
    return '';
  };
  const isSaved = savedChar();

  const { data: char, isLoading } = useQuery('character', () => api.get(`people/${id}`)
    .then((res: AxiosResponse<Character>) => res.data));

  if (isLoading) return <CircularProgress />;

  return (
    <Paper className={classes.container}>
      <Box display="flex" alignItems="flex-end" justifyContent="space-between" padding={2}>
        <Typography variant="h2">{char?.name}</Typography>
        <Box>
          <Button variant="outlined" onClick={handleCancel}>Cancelar</Button>
          <Button
            disabled={!!isSaved}
            variant="contained"
            color="primary"
            onClick={() => handleSave(char)}
          >
            {isSaved || 'Salvar'}
          </Button>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <Typography variant="h5">Informações</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">{`Altura: ${char?.height}`}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">{`Peso: ${char?.mass}`}</Typography>
        </ListItem>
        {!!char?.species.length && (
          <ListItem>
            <Typography variant="body1">{`Especies: ${char?.species.join(', ')}`}</Typography>
          </ListItem>
        )}
      </List>
      <Divider />
      {char?.films && <FilmList films={char?.films} />}
    </Paper>
  );
};

export default Details;
