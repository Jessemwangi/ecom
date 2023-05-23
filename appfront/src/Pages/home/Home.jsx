import React from 'react';
import Slider from '../../components/slider/Slider';
import './Home.scss'
import FeaturedProducts from '../../components/featured/FeaturedProducts';
import Categories from '../../components/Categories/Categories';

const Home = () => {
    return (
        <div className='home'>
            <Slider/>
            <FeaturedProducts type='features'/>
            <Categories/>
            <FeaturedProducts type='trending'/>
        </div>
    );
};

export default Home;