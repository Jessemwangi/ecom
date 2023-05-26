import React from 'react';
import './FeaturedProducts.scss'
import Card from '../Card/Card';

export const items = [
  {
    title: "Item 1",
    isNew: true,
    img: "https://source.unsplash.com/300x400/?shoes",
    img2: "https://source.unsplash.com/300x400/?shoe",
    img3: "https://source.unsplash.com/300x400/?sandles",
    img4: "https://source.unsplash.com/300x400/?boots",
    oldPrice: 50,
    price: 40,
    id: 1,
    dateCreated: "2023-05-24"
  },
  {
    title: "Item 2",
    isNew: false,
    img: "https://source.unsplash.com/300x400/?bags",
    img2: "https://source.unsplash.com/300x400/?bag",
    oldPrice: 30,
    price: 25,
    id: 2,
    dateCreated: "2023-05-23"
  },
  {
    title: "Item 3",
    isNew: true,
    img: "https://source.unsplash.com/300x400/?dress",
    img2: "https://source.unsplash.com/300x400/?dress",
    oldPrice: 80,
    price: 60,
    id: 3,
    dateCreated: "2023-05-22"
  },
  {
    title: "Item 4",
    isNew: true,
    img: "https://source.unsplash.com/300x400/?hats",
    img2: "https://source.unsplash.com/300x400/?caps",
    oldPrice: 20,
    price: 15,
    id: 4,
    dateCreated: "2023-05-21"
  }
];
const FeaturedProducts = ({type}) => {
 
    return (
        <div className='featuresProduct'>
            <div className="top">
                <h1>{type}</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, ut ducimus eos nobis delectus explicabo unde natus
                     eveniet necessitatibus, non exercitationem 
                    soluta! Perspiciatis fugiat sit possimus earum dolores quos nam.</p>
            </div>
            <div className="bottom">
                {items.map(item => 
                     <Card item={item} key={item.id}/>
                    )}

            </div>
        </div>
    );
};

export default FeaturedProducts;