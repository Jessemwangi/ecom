import React from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import UseFetch from "../../hooks/useFetch";

export const items = [
  {
    title: "Premium Athletic Shoes",
    isNew: true,
    img: "https://picsum.photos/300/400?random=1",
    img2: "https://picsum.photos/300/400?random=2",
    img3: "https://picsum.photos/300/400?random=3",
    img4: "https://picsum.photos/300/400?random=4",
    oldPrice: 50,
    price: 40,
    id: 1,
    dateCreated: "2023-05-24",
    description:
      "Step into comfort and style with our premium athletic footwear collection. Engineered for performance and designed for everyday wear, featuring advanced cushioning technology and breathable materials that keep you moving all day long.",
  },
  {
    title: "Designer Handbags",
    isNew: false,
    img: "https://picsum.photos/300/400?random=5",
    img2: "https://picsum.photos/300/400?random=6",
    oldPrice: 30,
    price: 25,
    id: 2,
    dateCreated: "2023-05-23",
    description:
      "Elevate your accessory game with our curated selection of designer handbags. Crafted from premium materials with attention to detail, these bags seamlessly blend functionality with sophisticated style for the modern woman.",
  },
  {
    title: "Elegant Evening Dresses",
    isNew: true,
    img: "https://picsum.photos/300/400?random=7",
    img2: "https://picsum.photos/300/400?random=8",
    oldPrice: 80,
    price: 60,
    id: 3,
    dateCreated: "2023-05-22",
    description:
      "Make a statement at your next special occasion with our collection of elegant evening dresses. From flowing maxi dresses to chic cocktail styles, each piece is designed to flatter and make you feel confidently beautiful.",
  },
  {
    title: "Trendy Accessories",
    isNew: true,
    img: "https://picsum.photos/300/400?random=9",
    img2: "https://picsum.photos/300/400?random=10",
    oldPrice: 20,
    price: 15,
    id: 4,
    dateCreated: "2023-05-21",
    description:
      "Complete your look with our versatile collection of fashion accessories. From statement hats to casual caps, our accessories add the perfect finishing touch to any outfit while providing both style and functionality.",
  },
];

// Category-specific descriptions for the top section
const getCategoryDescription = (type) => {
  const descriptions = {
    featured: "Discover our handpicked selection of premium products that combine quality craftsmanship with contemporary design. Each featured item represents the perfect balance of style, functionality, and value.",
    trending: "Stay ahead of the fashion curve with our trending collection. These popular items are flying off our shelves and represent the latest in style and innovation that our customers can't get enough of.",
    new: "Be the first to experience our newest arrivals, carefully curated to bring you the latest trends and innovations. Fresh designs that set tomorrow's style standards, available today.",
    bestsellers: "These customer favorites have earned their place as our top-selling items. Proven quality, exceptional style, and outstanding value make these products the go-to choice for discerning shoppers.",
    sale: "Don't miss these incredible deals on premium products. Limited-time offers on high-quality items that deliver exceptional value without compromising on style or craftsmanship.",
    default: "Explore our carefully curated collection of premium products designed to enhance your lifestyle. Quality craftsmanship meets contemporary design in every piece we offer."
  };
  
  return descriptions[type?.toLowerCase()] || descriptions.default;
};

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = UseFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  
  return (
    <div className="featuresProduct">
      <div className="top">
        <h1>{type} Products</h1>
        <p>
          {getCategoryDescription(type)}
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Error occurred while loading products"
          : loading
          ? "Loading amazing products..."
          : data?.map((item) => <Card item={item} key={item.documentId} />)
        }
      </div>
    </div>
  );
};

export default FeaturedProducts;