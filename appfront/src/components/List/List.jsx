import React from 'react';
import { items } from '../featured/FeaturedProducts';
import Card from '../Card/Card';
import './List.scss'


const List = () => {
    const data = items
    return (
        <div className='list'>
          {  data.map(item => 
                <Card item={item} key={item.id}/>
             )}
        </div>
    );
};

export default List;