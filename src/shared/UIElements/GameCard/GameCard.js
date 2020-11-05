import React from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom'

const GameCard = (props) => {
    return (
        <Link to={{
            pathname: "/game",
            search: `?id=${props.id}&category=${props.category}`,
            data: props.gameUrl,
            title: props.title,
            firebase: props.fireb
        }} >
            <div className="GameCard">
                <img src={props.url} alt="Cover_image"></img>
                <h3>{props.title}</h3>
            </div>
        </Link>

    );
}

export default GameCard;