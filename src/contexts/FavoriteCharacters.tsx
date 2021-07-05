import React from 'react';
import { Character } from '../interfaces';

interface FavoriteCharactersProviderProps {
  children: React.ReactNode;
}

interface FavoriteCharactersContext {
  chars: Array<Character>;
  favorite(char: Character | undefined): void;
  remove(charId: string): void;
  find(charId: string): Character | void;
}

export const Context = React.createContext<FavoriteCharactersContext>({
  chars: [],
  favorite: () => {},
  remove: () => {},
  find: () => {},
});

export const FavoriteCharactersProvider = ({ children }: FavoriteCharactersProviderProps) => {
  const [chars, setChars] = React.useState<Array<Character>>([]);

  const favorite = (char: Character | undefined) => {
    if (char) {
      const existingChar = chars.some((character) => char.id === character.id);
      if (!existingChar) setChars([...chars, char]);
    }
  };

  const remove = (id: string) => {
    setChars([...chars.filter((char) => char.id !== id)]);
  };

  const find = (id: string) => chars.find((char) => char.id === id);

  return (
    <Context.Provider value={{
      chars, favorite, remove, find,
    }}
    >
      {children}
    </Context.Provider>
  );
};
