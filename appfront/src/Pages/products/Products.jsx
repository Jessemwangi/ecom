import React, { Fragment, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Products.scss";
import List from "../../components/List/List";
import UseFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import EmptyState from "../../components/EmptyState/EmptyState";

const Products = () => {
  const id = useParams().id;
  const [sort, setSort] = useState("asc");
  const [selectsubCat, setSelectsubCat] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);

  const { data, loading, error } = UseFetch(
    `/sub-categories?[filters][categories][id][$eq=${id}]&populate=*`
  );

  const { data: categoryData } = UseFetch(
    `/categories/${id}?populate=*`
  );

  const handleCatChange = (e, itemId) => {
    const isChecked = e.target.checked;
    setSelectsubCat(
      isChecked
        ? [...selectsubCat, itemId]
        : selectsubCat.filter((item) => item !== itemId)
    );
  };

  const handlePriceFilter = (range) => {
    setPriceRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const clearAllFilters = () => {
    setSelectsubCat([]);
    setPriceRanges([]);
  };

  return (
    <Fragment>
      {error ? (
        <div className="products-error">
          <EmptyState 
            icon="😕"
            title="Something Went Wrong"
            message="We couldn't load the products at this moment. Please check your connection and try again."
          />
        </div>
      ) : loading ? (
        <div className="products-loading">
          <LoadingSpinner message="Loading amazing products for you..." />
        </div>
      ) : (
        <div className="products">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="current">{categoryData?.title || 'Products'}</span>
          </div>

          <div className="products-container">
            <aside className="left">
              <div className="filter-header">
                <h2>Filters</h2>
                {(selectsubCat.length > 0 || priceRanges.length > 0) && (
                  <button className="clear-all" onClick={clearAllFilters}>
                    Clear All
                  </button>
                )}
              </div>

              <div className="filterItem">
                <h3>Categories</h3>
                <div className="filter-options">
                  {data && data.length > 0 ? (
                    data.map((item) => (
                      <label className="filter-checkbox" key={item.id}>
                        <input
                          type="checkbox"
                          id={item.id}
                          value={item.id}
                          checked={selectsubCat.includes(item.id)}
                          onChange={(e) => handleCatChange(e, item.id)}
                        />
                        <span>{item.title}</span>
                      </label>
                    ))
                  ) : (
                    <p className="no-filters">No subcategories available</p>
                  )}
                </div>
              </div>

              <div className="filterItem">
                <h3>Price Range</h3>
                <div className="filter-options">
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
              
              <div className="filterItem">
                <h3>Sort By Price</h3>
                <div className="filter-options">
                  <label className="filter-radio">
                    <input
                      type="radio"
                      id="asc"
                      name="price"
                      value="asc"
                      checked={sort === "asc"}
                      onChange={(e) => setSort("asc")}
                    />
                    <span>Price: Low to High</span>
                  </label>
                  <label className="filter-radio">
                    <input
                      type="radio"
                      id="desc"
                      value={"desc"}
                      name="price"
                      checked={sort === "desc"}
                      onChange={(e) => setSort("desc")}
                    />
                    <span>Price: High to Low</span>
                  </label>
                </div>
              </div>
            </aside>

            <div className="right">
              {categoryData && (
                <div className="category-banner">
                  <img
                    src={
                      categoryData.img?.url?.startsWith('http')
                        ? categoryData.img.url
                        : `${process.env.REACT_APP_API_URL || 'http://localhost:1337'}${categoryData.img?.url}` || 
                          "https://source.unsplash.com/1200x400/?fashion,shopping"
                    }
                    className="categoryImg"
                    alt={categoryData.title}
                    onError={(e) => {
                      e.target.src = "https://source.unsplash.com/1200x400/?fashion,shopping";
                    }}
                  />
                  <div className="banner-overlay">
                    <h1>{categoryData.title}</h1>
                    <p>{categoryData.description || `Explore our ${categoryData.title} collection`}</p>
                  </div>
                </div>
              )}
              <List
                catId={id}
                sort={sort}
                subCats={selectsubCat}
                priceRanges={priceRanges}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Products;
