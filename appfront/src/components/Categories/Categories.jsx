import React from 'react';
import { Link } from 'react-router-dom'

import './Categories.scss'
const Categories = () => {
    return (
        <div className='categories'>
            <div className="col">
                <div className="row">
                    <img src="https://source.unsplash.com/400x300/?pajamas" alt="pjma" />
                    <button>
                        <Link className='link' to={'/products/1'}>sale</Link>
                        category name</button>
                </div>
                <div className="row">
                    <img src="https://source.unsplash.com/400x300/?kids" alt="" />
                    <button>
                        <Link className='link' to={'/products/2'}>Kidswear</Link>
                       </button>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <img src="https://source.unsplash.com/400x600/?phones" alt="" />
                    <button>
                        <Link className='link' to={'/products/3'}>Accessories</Link>
                       </button>
                </div>
            </div>
            <div className="col col-l">
                <div className="row">
                <div className="col">
                    <div className="row">
                    <img src="https://source.unsplash.com/400x600/?women" alt="" />
                    <button>
                        <Link className='link' to={'/products/4'}>women</Link>
                       </button>
                    </div>
                </div>
           
            <div className="col">
<div className="row">
<img src="https://source.unsplash.com/400x600/?mens" alt="" />
                    <button>
                        <Link className='link' to={'/products/5'}>Mens</Link>
                       </button>
</div>
            </div>
            </div>
            <div className="row">
            <img src="https://source.unsplash.com/400x600/?travel" alt="" />
                    <button>
                        <Link className='link' to={'/products/6'}>Travel</Link>
                       </button>
                
                </div>
        </div>
        </div>
    );
};

export default Categories;