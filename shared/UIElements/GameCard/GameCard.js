import React from 'react';
import './GameCard.css';
import './GameCardSmall.css'
import { Link } from 'react-router-dom';

const GameCard = (props) => {
    let className = "GameCard";
    let title = "title"
    if (props.small) {
        className = "GameCardSmall"
        title = "title_small"
    }
    return (
        <Link to={{
            pathname: "/WebGamesPortal/game",
            search: `?id=${props.id}&category=${props.category}`,
            data: props.gameUrl,
            title: props.title,
        }} >
            <div className={className} >
                <img src={props.url} alt="Cover_image"></img>
                <h3 className={title}>{props.title}</h3>
            </div>
        </Link>
    );
}

export default GameCard;