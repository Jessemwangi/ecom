import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import './Products.scss'
import List from '../../components/List/List';


const Products = () => {
  const id = parseInt(useParams().id)
  const [maxPrice, setMaxPrice] =useState(1000)
  const [sort, setSort] =useState()


    return (
        <div className="products">
        <div className="left">
            <h1>product category</h1>
          <div className="filterItem">
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check" >shoes</label>
          </div>
          <div className="filterItem">
            
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check" >leather</label>
          </div>
          <div className="filterItem">
            
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check" >bags</label>
          </div>
          <div className="filterItem">
            <h1>product price</h1>
            <span>0</span>
            <input type="range" min={0} max={1000} onChange={(e) => setMaxPrice(e.target.value)}/>
            <span>1000</span>
          </div>
          <div className="filterItem">
            <h1>product sort</h1>
            <div className="inputItem">

            <input type="radio" id="asc" name="price" value="asc" onChange={(e) => setSort('asc')} />
            <label htmlFor="asc">lowest</label>
            </div>
            <div className="inputItem">
            <input type="radio" id="asc" value={'desc'} name="price" onChange={(e) => setSort('desc')} />
            <label htmlFor="desc">highest</label>
              </div>
          </div>
        </div>
        <div className="right">
          <img src="https://source.unsplash.com/1200x400/?women" className="categoryImg" alt="" />
          <List catId ={id} maxPrice={maxPrice} sort={sort}/>
        </div>
      </div>
    );
};

export default Products;