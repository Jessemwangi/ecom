import React from "react";
import Card from "../Card/Card";
import "./List.scss";
import UseFetch from "../../hooks/useFetch";

const List = ({ catId, maxPrice, sort, subCats }) => {
    //fetch categories and sub categories since strapi does not support array filter we use map
  const { data, loading, error } = UseFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort} `
  );

  return (
    <div className="list">
      {error
        ? "An error occured"
        : loading
        ? "loading ..."
        : data.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
