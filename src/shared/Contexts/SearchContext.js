import { createContext } from 'react';

const SearchContext = createContext({
    text: "",
    searchItem: () => { }
});

export default SearchContext;