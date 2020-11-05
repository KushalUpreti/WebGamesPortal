import { createContext } from 'react';

const SearchContext = createContext({
    value: "",
    searchItem: () => { }
});

export default SearchContext;