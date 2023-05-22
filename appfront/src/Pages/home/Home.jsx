import React from 'react';
import Slider from '../../components/slider/Slider';
import './Home.scss'
import FeaturedProducts from '../../components/featured/FeaturedProducts';

const Home = () => {
    return (
        <div className='home'>
            <Slider/>
            <FeaturedProducts type='features'/>
            <FeaturedProducts type='trending'/>
        </div>
    );
};

export default Home;