import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./SubCategory.scss";
import Card from "../../components/Card/Card";
import UseFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import ProductSkeleton from "../../components/Loading/ProductSkeleton";
import EmptyState from "../../components/EmptyState/EmptyState";

const SubCategory = () => {
  const { id } = useParams();
  const [sort, setSort] = useState("asc");
  const [priceRanges, setPriceRanges] = useState([]);

  // Fetch subcategory details
  const { data: subCategoryData, loading: subCategoryLoading } = UseFetch(
    `/sub-categories/${id}?populate=*`
  );

  // Fetch products for this subcategory
  const { data: productsData, loading: productsLoading, error: productsError } = UseFetch(
    `/products?populate=*&[filters][sub_categories][id][$eq]=${id}&sort=price:${sort}`
  );

  // Fetch related subcategories from same parent category
  const parentCategoryId = subCategoryData?.categories?.[0]?.id;
  const { data: relatedSubCategories } = UseFetch(
    parentCategoryId 
      ? `/sub-categories?[filters][categories][id][$eq]=${parentCategoryId}&populate=*`
      : null
  );

  const handlePriceFilter = (range) => {
    setPriceRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const filterByPrice = (products) => {
    if (priceRanges.length === 0) return products;
    
    return products.filter(product => {
      return priceRanges.some(range => {
        switch(range) {
          case 'under25':
            return product.price < 25;
          case '25-50':
            return product.price >= 25 && product.price <= 50;
          case '50-100':
            return product.price >= 50 && product.price <= 100;
          case '100-200':
            return product.price >= 100 && product.price <= 200;
          case 'over200':
            return product.price > 200;
          default:
            return true;
        }
      });
    });
  };

  const getImageUrl = (imgData) => {
    if (!imgData) return 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=200';
    if (imgData.url && imgData.url.startsWith('http')) return imgData.url;
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:1337';
    return `${baseUrl}${imgData.url}`;
  };

  const filteredProducts = productsData ? filterByPrice(productsData) : [];

  return (
    <div className="subcategory-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        {subCategoryData?.categories?.[0] && (
          <>
            <Link to={`/products/${subCategoryData.categories[0].id}`}>
              {subCategoryData.categories[0].title}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="current">{subCategoryData?.title || 'Loading...'}</span>
      </div>

      {/* Hero Section */}
      {subCategoryLoading ? (
        <LoadingSpinner message="Loading subcategory..." />
      ) : subCategoryData && (
        <div className="subcategory-hero">
          <div className="hero-image">
            <img 
              src={getImageUrl(subCategoryData.img)} 
              alt={subCategoryData.title}
              onError={(e) => {
                e.target.src = 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400';
              }}
            />
            <div className="hero-overlay">
              <h1>{subCategoryData.title}</h1>
              <p>{subCategoryData.description || `Discover our amazing ${subCategoryData.title} collection`}</p>
            </div>
          </div>
        </div>
      )}

      <div className="subcategory-content">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Related Categories</h3>
            <div className="related-categories">
              {relatedSubCategories && relatedSubCategories
                .filter(sub => sub.id !== parseInt(id))
                .map((subCat) => (
                  <Link 
                    key={subCat.id} 
                    to={`/subcategory/${subCat.id}`}
                    className="related-category-item"
                  >
                    <div className="category-image">
                      <img 
                        src={getImageUrl(subCat.img)} 
                        alt={subCat.title}
                        onError={(e) => {
                          e.target.src = 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=100';
                        }}
                      />
                    </div>
                    <span>{subCat.title}</span>
                  </Link>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-filters">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={priceRanges.includes('under25')}
                  onChange={() => handlePriceFilter('under25')}
                />
                <span>Under $25</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={priceRanges.includes('25-50')}
                  onChange={() => handlePriceFilter('25-50')}
                />
                <span>$25 - $50</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={priceRanges.includes('50-100')}
                  onChange={() => handlePriceFilter('50-100')}
                />
                <span>$50 - $100</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={priceRanges.includes('100-200')}
                  onChange={() => handlePriceFilter('100-200')}
                />
                <span>$100 - $200</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={priceRanges.includes('over200')}
                  onChange={() => handlePriceFilter('over200')}
                />
                <span>Over $200</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <div className="sort-options">
              <label className="filter-radio">
                <input
                  type="radio"
                  name="sort"
                  checked={sort === "asc"}
                  onChange={() => setSort("asc")}
                />
                <span>Price: Low to High</span>
              </label>
              <label className="filter-radio">
                <input
                  type="radio"
                  name="sort"
                  checked={sort === "desc"}
                  onChange={() => setSort("desc")}
                />
                <span>Price: High to Low</span>
              </label>
            </div>
          </div>

          {priceRanges.length > 0 && (
            <button 
              className="clear-filters-btn"
              onClick={() => setPriceRanges([])}
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Products Grid */}
        <div className="products-section">
          <div className="products-header">
            <h2>Products</h2>
            <span className="product-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>

          <div className="products-grid">
            {productsError ? (
              <EmptyState 
                icon="😕"
                title="Oops! Something went wrong"
                message="We couldn't load the products. Please try again later."
              />
            ) : productsLoading ? (
              <ProductSkeleton count={6} />
            ) : filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((item) => <Card item={item} key={item.id} />)
            ) : (
              <EmptyState 
                icon="🎁"
                title="No Products Found"
                message="We're currently stocking up on amazing products for this category! Check back soon."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
