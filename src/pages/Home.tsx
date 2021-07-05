import React from 'react';
import {
  Container,
  Box,
  TextField,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Popper,
  Typography,
  Button,
} from '@material-ui/core';
import { MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { Character } from '../interfaces';
import { getCharId } from '../utils/characterMapper';

type InputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

const Home = (): JSX.Element => {
  const [search, setSearch] = React.useState('');
  const [autocomplete, setAutocomplete] = React.useState([]);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [characters, setCharacters] = React.useState<Array<Character>>([]);
  const { push } = useHistory();

  const handleChangeSearchField = async ({ target: { value } }: InputEvent) => {
    setSearch(value);

    const response = await api.get('people', { params: { search } });
    setAutocomplete(response.data.results.map((people: Character) => people.name));
  };

  const handleAutocomplete = (name: string) => {
    setSearch(name);
    setAutocomplete([]);
  };

  const handleSearch = async () => {
    const response = await api.get('people', { params: { search } });
    setCharacters(response.data.results.map((char: Character) => ({
      ...char,
      id: getCharId(char.url),
    })));
  };

  const handleNavigateToDetails = (id: string) => push(`/details/${id}`);

  return (
    <Container maxWidth="md">
      <Box>
        <TextField
          ref={anchorRef}
          value={search}
          onChange={handleChangeSearchField}
        />
        <Button disabled={!search} onClick={handleSearch}><MdSearch size={24} color="#fff" /></Button>
        <Popper open={!!search} anchorEl={anchorRef.current} transition>
          <Paper>
            <Box display="flex" flexDirection="column">
              {autocomplete.map((name, i) => (
                <Button key={String(i)} onClick={() => handleAutocomplete(name)}>
                  <Typography>{name}</Typography>
                </Button>
              ))}
            </Box>
          </Paper>
        </Popper>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Data Nascimento</TableCell>
                <TableCell align="right">Gênero</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.map((char: Character, i) => (
                <TableRow key={String(i)}>
                  <TableCell component="th" scope="row">
                    <Button onClick={() => handleNavigateToDetails(char.id)}>{char.name}</Button>
                  </TableCell>
                  <TableCell align="right">{char.birthYear}</TableCell>
                  <TableCell align="right">{char.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Home;
