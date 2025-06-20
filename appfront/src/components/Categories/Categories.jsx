import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';

const Categories = () => {
    return (
        <div className='categories'>
            <div className="col">
                <div className="row">
                    <img src="https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" alt="Pajamas" />
                    <button>
                        <Link className='link' to={'/products/1'}>Sale</Link>
                        category name
                    </button>
                </div>
                <div className="row">
                    <img src="https://images.pexels.com/photos/1648376/pexels-photo-1648376.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" alt="Kidswear" />
                    <button>
                        <Link className='link' to={'/products/2'}>Kidswear</Link>
                    </button>
                </div>
            </div>

            <div className="col">
                <div className="row">
                    <img src="https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=400&h=600" alt="Accessories" />
                    <button>
                        <Link className='link' to={'/products/3'}>Accessories</Link>
                    </button>
                </div>
            </div>

            <div className="col col-l">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <img src="https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=400&h=600" alt="Women" />
                            <button>
                                <Link className='link' to={'/products/4'}>Women</Link>
                            </button>
                        </div>
                    </div>

                    <div className="col">
                        <div className="row">
                            <img src="https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg?auto=compress&cs=tinysrgb&w=400&h=600" alt="Mens" />
                            <button>
                                <Link className='link' to={'/products/5'}>Mens</Link>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <img src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400&h=600" alt="Travel" />
                    <button>
                        <Link className='link' to={'/products/6'}>Travel</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Categories;
