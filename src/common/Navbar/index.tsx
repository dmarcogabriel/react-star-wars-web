import React from 'react';
import {
  Box, Button, AppBar,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const { push } = useHistory();

  const handleNavigate = (url: string) => push(url);

  return (
    <AppBar position="static">
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Button onClick={() => handleNavigate('/')}>Consultar</Button>
        <Button onClick={() => handleNavigate('/favorites')}>Favoritos</Button>
      </Box>
    </AppBar>
  );
};

export default Navbar;
