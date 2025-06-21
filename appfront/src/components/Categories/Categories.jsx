import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';
import UseFetch from '../../hooks/useFetch';

const Categories = () => {
    const { data, loading, error } = UseFetch(`/categories?populate=*`);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading categories</p>;
    if (!data || data.length === 0) return <p>No categories available</p>;

    // Helper function to get image URL
    const getImageUrl = (imgData) => {
        if (!imgData) return 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300';
        
        // If it's a full URL, return as is
        if (imgData.url && imgData.url.startsWith('http')) {
            return imgData.url;
        }
        
        // If it's a relative path, prepend your base URL
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:1337';
        return `${baseUrl}${imgData.url}`;
    };

    // Convert data to array if it's not already
    const categories = Array.isArray(data) ? data : [data];
    
    // Fallback categories with placeholder data if we don't have enough
    const fallbackCategories = [
        { id: 'fallback-1', title: 'Sale', img: { url: 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' } },
        { id: 'fallback-2', title: 'Kidswear', img: { url: 'https://images.pexels.com/photos/1648376/pexels-photo-1648376.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' } },
        { id: 'fallback-3', title: 'Accessories', img: { url: 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=400&h=600' } },
        { id: 'fallback-4', title: 'Women', img: { url: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=400&h=600' } },
        { id: 'fallback-5', title: 'Mens', img: { url: 'https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg?auto=compress&cs=tinysrgb&w=400&h=600' } },
        { id: 'fallback-6', title: 'Travel', img: { url: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400&h=600' } }
    ];

    // Ensure we have at least 6 categories for the layout, fill with fallbacks if needed
    const displayCategories = [...categories];
    while (displayCategories.length < 6) {
        const fallbackIndex = displayCategories.length;
        if (fallbackIndex < fallbackCategories.length) {
            displayCategories.push(fallbackCategories[fallbackIndex]);
        } else {
            break;
        }
    }

    return (
        <>
         <div className="row">
                            <h1>Select Category</h1>
                            </div>
            {data && (
                <div className='categories'>
                    {/* First Column - 2 rows */}
                    <div className="col">
                        {displayCategories.slice(0, 2).map((category, index) => (
                            <div className="row" key={category.id || index}>
                                <img 
                                    src={getImageUrl(category.img)} 
                                    alt={category.title} 
                                />
                                <button>
                                    <Link className='link' to={`/products/${category.id}`}>
                                        {category.title}
                                    </Link>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Second Column - 1 tall row */}
                       
                    <div className="col">

                        {displayCategories.slice(2, 3).map((category, index) => (
                            <div className="row" key={category.id || (index + 2)}>
                                <img 
                                    src={getImageUrl(category.img)} 
                                    alt={category.title} 
                                />
                                <button>
                                    <Link className='link' to={`/products/${category.id}`}>
                                        {category.title}
                                    </Link>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Third Column (col-l) - Complex layout with 2 categories in top row, 1 in bottom */}
                    <div className="col col-l">
                        <div className="row">
                            {displayCategories.slice(3, 5).map((category, index) => (
                                <div className="col" key={category.id || (index + 3)}>
                                    <div className="row">
                                        <img 
                                            src={getImageUrl(category.img)} 
                                            alt={category.title} 
                                        />
                                        <button>
                                            <Link className='link' to={`/products/${category.id}`}>
                                                {category.title}
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {displayCategories.slice(5, 6).map((category, index) => (
                            <div className="row" key={category.id || (index + 5)}>
                                <img 
                                    src={getImageUrl(category.img)} 
                                    alt={category.title} 
                                />
                                <button>
                                    <Link className='link' to={`/products/${category.id}`}>
                                        {category.title}
                                    </Link>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Categories;