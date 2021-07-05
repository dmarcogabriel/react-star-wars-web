import React from 'react';
import {
  List, ListItem, Typography, CircularProgress,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { getYear } from 'date-fns';
import api from '../services/api';

interface FilmListProps {
  films: Array<string>;
}

const FilmList = ({ films }: FilmListProps): JSX.Element => {
  const { data, isLoading } = useQuery('films', () => {
    const requests = films.map((filmUrl: string) => api.get(filmUrl)
      .then((res: AxiosResponse<any>) => res.data));
    return Promise.all(requests);
  });

  if (isLoading) return <CircularProgress />;

  return (
    <List>
      <ListItem>
        <Typography variant="h5">Filmes</Typography>
      </ListItem>
      {data && data.map((film: any, i: number) => (
        <ListItem key={String(i)}>
          <Typography variant="body1">{`${getYear(new Date(film.releaseDate))} - ${film.title}`}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default FilmList;
