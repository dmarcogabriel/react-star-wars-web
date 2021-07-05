import React from 'react';
import { Context } from '../contexts/FavoriteCharacters';

export const useFavoriteChars = () => React.useContext(Context);
