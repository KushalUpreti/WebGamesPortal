import React from 'react';
import From from '../Form/Form';
import Input from '../Input/Input';

const Search = (props) => {

    return (
        <From>
            <Input type="text" placeholder="Search.." name="search"></Input>
        </From>
    );
}

export default Search;