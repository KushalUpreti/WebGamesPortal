import React from 'react';
import Carousel, { autoplayPlugin, arrowsPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './Carousel.css'
import { useHistory } from 'react-router';



const MyCarousel = (props) => {
    const history = useHistory();

    return <Carousel plugins={['arrows',
        'infinite',
        {
            resolve: autoplayPlugin,
            options: {
                interval: 2000,
            }
        },
        {
            resolve: arrowsPlugin,
            options: {
                arrowLeft: <button> </button>,
                arrowLeftDisabled: <button></button>,
                arrowRight: <button></button>,
                arrowRightDisabled: <button></button>,
                addArrowClickHandler: true,
            }
        }
    ]}
        animationSpeed={1000} >

        {props.itemList.map(item => {
            return (
                <img key={item.gameId} className="Images" onClick={() => {
                    history.push({
                        pathname: "/WebGamesPortal/game",
                        search: `?id=${item.gameId}&category=${item.category}`
                    })
                }} alt="Cover" src={item.imageUrl}></img>
            )
        })}
    </Carousel>
};

export default MyCarousel;