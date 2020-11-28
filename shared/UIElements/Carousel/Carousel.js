import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useHistory } from 'react-router';


const MyCarousel = (props) => {
    const history = useHistory();
    return <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false}>

        {props.itemList.map(item => {
            return (
                <div className="Div" onClick={() => {
                    history.push({
                        pathname: "/WebGamesPortal/game",
                        search: `?id=${item.gameId}&category=${item.category}`
                    })
                }}>
                    <img key={item.gameId} className="Images" alt="Cover" src={item.imageUrl}></img>
                </div>
            )
        })}


    </Carousel>
};

export default MyCarousel;



