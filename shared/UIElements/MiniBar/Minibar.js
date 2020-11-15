import React from 'react';
import Container from '../../Containers/Container';
import MiniNav from './MiniNav';
import './Minibar.css'

const Minibar = (props) => {
    return (
        <Container>
            <div className="Minibar">
                <MiniNav favorites={props.loadFav} />
            </div>
        </Container>
    )
}
export default Minibar;