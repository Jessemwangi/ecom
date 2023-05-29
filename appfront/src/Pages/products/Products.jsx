import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.scss";
import List from "../../components/List/List";
import UseFetch from "../../hooks/useFetch";

const Products = () => {
  const id = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("asc");
  const [selectsubCat, setSelectsubCat] = useState([]);

  const { data, loading, error } = UseFetch(
    `/sub-categories?[filters][categories][id][$eq=${id}]`
  );

  // console.log(data, loading, error);

  const handleCatChange = (e, itemId) => {
    const isChecked = e.target.checked;

    setSelectsubCat(
      isChecked
        ? [...selectsubCat, itemId]
        : selectsubCat.filter((item) => item !== itemId)
    );
  };

  return (
    <Fragment>
      {
   loading ? ('Loading ...')
   :
   (
    <div className="products">
    <div className="left">
      <div className="filterItem">
        <h2>product category</h2>
        {data && data?.map((item) => (
          <div className="inputItem" key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              value={item.id}
              onChange={(e) => handleCatChange(e, item.id)}
            />
            <label htmlFor={item.id}>{item.attributes.title}</label>
          </div>
        ))}
      </div>

      <div className="filterItem">
        <h2>product price</h2>
        <div className="inputItem">
          <span>0</span>
          <input
            type="range"
            min={0}
            max={1000}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <span>{maxPrice}</span>
        </div>
      </div>
      <div className="filterItem">
        <h2>product sort</h2>
        <div className="inputItem">
          <input
            type="radio"
            id="asc"
            name="price"
            value="asc"
            onChange={(e) => setSort("asc")}
          />
          <label htmlFor="asc">lowest</label>
        </div>
        <div className="inputItem">
          <input
            type="radio"
            id="asc"
            value={"desc"}
            name="price"
            onChange={(e) => setSort("desc")}
          />
          <label htmlFor="desc">highest</label>
        </div>
      </div>
    </div>
    <div className="right">
      <img
        src="https://source.unsplash.com/1200x400/?women"
        className="categoryImg"
        alt=""
      />
      <List
        catId={id}
        maxPrice={maxPrice}
        sort={sort}
        subCats={selectsubCat}
      />
    </div>
  </div>
   )
      }
{error && 'error has occured'}
    </Fragment>
 
  );
};

export default Products;
