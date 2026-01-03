import React from "react";
import Card from "../Card/Card";
import "./List.scss";
import UseFetch from "../../hooks/useFetch";
import ProductSkeleton from "../Loading/ProductSkeleton";
import EmptyState from "../EmptyState/EmptyState";

const List = ({ catId, sort, subCats, priceRanges = [] }) => {
    //fetch categories and sub categories since strapi does not support array filter we use map
  const { data, loading, error } = UseFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&sort=price:${sort}`
  );

  // Filter by price ranges
  const filterByPrice = (products) => {
    if (!priceRanges || priceRanges.length === 0) return products;
    
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

  const filteredData = data ? filterByPrice(data) : [];

  return (
    <div className="list">
      {error ? (
        <EmptyState 
          icon="😕"
          title="Oops! Something went wrong"
          message="We couldn't load the products. Please try again later or check your internet connection."
        />
      ) : loading ? (
        <ProductSkeleton count={6} />
      ) : filteredData && filteredData.length > 0 ? (
        filteredData.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <EmptyState 
          icon="🎁"
          title="No Products Found"
          message="We're currently stocking up on amazing products for this category! Check back soon for exciting new arrivals."
        />
      )}
    </div>
  );
};

export default List;
