import React from 'react';
import Slider from '../../components/slider/Slider';
import './Home.scss'
import FeaturedProducts from '../../components/featured/FeaturedProducts';
import Categories from '../../components/Categories/Categories';
import HotDeals from '../../components/HotDeals/HotDeals';
import PromoBanners from '../../components/PromoBanners/PromoBanners';
import Newsletter from '../../components/Newsletter/Newsletter';

const Home = () => {
    return (
        <div className='home'>
            <Slider/>
            <HotDeals/>
            <PromoBanners/>
            <FeaturedProducts type='featured'/>
            <Categories/>
            <FeaturedProducts type='trending'/>
            <Newsletter/>
        </div>
    );
};

export default Home;