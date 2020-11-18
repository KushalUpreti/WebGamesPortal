import React from 'react';
import GameCard from '../UIElements/GameCard/GameCard';

const RenderList = (props) => {
    return props.list.map((item) => {
        return <GameCard key={item.gameId}
            url={item.imageUrl}
            gameUrl={item.url}
            title={item.name}
            id={item.gameId}
            category={item.category}>
        </GameCard>
    })
}

export default RenderList;