import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from '@material-ui/core/styles';
import { Home, Details, Favorites } from './pages';
import { Navbar } from './common';
import { FavoriteCharactersProvider } from './contexts/FavoriteCharacters';
import { theme } from './config/theme';
import { useStyles } from './styles';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <FavoriteCharactersProvider>
          <BrowserRouter>
            <Container maxWidth="md" className={classes.container}>
              <Navbar />

              <Route path="/" exact component={Home} />
              <Route path="/details/:id" component={Details} />
              <Route path="/favorites" component={Favorites} />
            </Container>
          </BrowserRouter>
        </FavoriteCharactersProvider>
      </QueryClientProvider>

    </ThemeProvider>
  );
};

export default App;
