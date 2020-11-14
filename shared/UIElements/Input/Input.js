import React, { useContext } from 'react';
import './Input.css';
import SearchContext from '../../Contexts/SearchContext';

const Input = (props) => {
    const search = useContext(SearchContext);
    return (
        //One way of doing it
        // <SearchContext.Consumer>
        //     {context => {
        //         return <input className="Input" id={props.id} type={props.type} placeholder={props.placeholder} onChange={context.searchItem} value={context.value || props.value} />
        //     }}
        // </SearchContext.Consumer>
        <input className="Input" id={props.id} type={props.type} placeholder={props.placeholder} onChange={search.searchItem} />
    );
}

export default Input;