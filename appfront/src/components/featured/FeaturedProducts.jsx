import React from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import UseFetch from "../../hooks/useFetch";

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
    dateCreated: "2023-05-24",
    description:
      "Explore our extensive shoe collection that combines fashion, comfort, and durability. Whether you're searching for trendy sneakers, elegant heels, casual flats, or sturdy boots, we have the perfect pair for every occasion and outfit",
  },
  {
    title: "Item 2",
    isNew: false,
    img: "https://source.unsplash.com/300x400/?bags",
    img2: "https://source.unsplash.com/300x400/?bag",
    oldPrice: 30,
    price: 25,
    id: 2,
    dateCreated: "2023-05-23",
    description:
      "Discover our stunning collection of dresses that will elevate your style to new heights. From elegant evening gowns to chic cocktail dresses, we have options to suit different tastes and body types",
  },
  {
    title: "Item 3",
    isNew: true,
    img: "https://source.unsplash.com/300x400/?dress",
    img2: "https://source.unsplash.com/300x400/?dress",
    oldPrice: 80,
    price: 60,
    id: 3,
    dateCreated: "2023-05-22",
    description:
      "Dress up your little ones with our adorable and fashionable kidswear. Our children's clothing range combines comfort and style, featuring cute designs and quality materials.",
  },
  {
    title: "Item 4",
    isNew: true,
    img: "https://source.unsplash.com/300x400/?hats",
    img2: "https://source.unsplash.com/300x400/?caps",
    oldPrice: 20,
    price: 15,
    id: 4,
    dateCreated: "2023-05-21",
    description:
      "Our collection of men's and women's clothing encompasses a wide array of styles, from casual everyday wear to formal attire. Browse through our selection of tops, bottoms, outerwear",
  },
];

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = UseFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  console.log(data);
  // if (loading) return <h1>Loading ...</h1>

  return (
    <div className="featuresProduct">
      <div className="top">
        <h1>{type} Products</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, ut
          ducimus eos nobis delectus explicabo unde natus eveniet
          necessitatibus, non exercitationem soluta! Perspiciatis fugiat sit
          possimus earum dolores quos nam.
        </p>
      </div>
      <div className="bottom">
        {
        error
          ? "error occured"
          : loading
          ? "Loading"
          : data.map((item) => <Card item={item} key={item.id} />)
          }
      </div>
    </div>
  );
};

export default FeaturedProducts;
