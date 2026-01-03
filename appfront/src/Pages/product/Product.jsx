import React, { Fragment, useState, useEffect } from "react";
import "./Product.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import { Slider } from "@mui/material";
import UseFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import Reviews from "../../components/Comments/Reviews";
import { buildImageUrl } from "../../Utility/imageHelper";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";

const Product = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { data, loading, error } = UseFetch(`/products/${id}?populate=*`);
  const { getCurrentUser } = useAuth();
  const { addToCart, loading: cartLoading } = useCart();
  const { addToWishlist, isInWishlist, loading: wishlistLoading } = useWishlist();
  const { trackView } = useRecentlyViewed();

  const [bgcolor, setbgColor] = useState('purple');
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');
  const [inWishlist, setInWishlist] = useState(false);

  // Track product view when component loads
  useEffect(() => {
    const user = getCurrentUser();
    if (user && id) {
      trackView(user.id, parseInt(id));
    }
  }, [id, getCurrentUser, trackView]);

  const handleColorChange = (e) => {
    e.preventDefault();
    const color = e.target.value !== '' ? e.target.value : 'purple';
    setbgColor(color.toLowerCase());
    setSelectedColor(color);
  };

  const handleAddToCart = async () => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    if (quantity < 1) {
      setMessage('Please select at least 1 item');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const productPrice = data?.attributes?.price || data?.price || 0;
    const productTitle = data?.attributes?.title || data?.title || '';
    const productImage = data?.attributes?.images?.[0]?.url || data?.images?.[0]?.url || '';
    const productStock = data?.attributes?.quantity || data?.quantity || 0;
    
    const productData = {
      color: selectedColor,
      size: selectedSize,
      title: productTitle,
      image: productImage,
      stock: productStock
    };

    const result = await addToCart(user.id, parseInt(id), quantity, productPrice, productData);
    if (result.success) {
      setMessage('Added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error || 'Failed to add to cart');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAddToWishlist = async () => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const productPrice = data?.attributes?.price || data?.price || 0;
    const result = await addToWishlist(user.id, parseInt(id), productPrice, true, true);
    if (result.success) {
      setInWishlist(true);
      setMessage(result.message || 'Added to wishlist!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error || 'Failed to add to wishlist');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <Fragment>
      {loading ? 
        (
          <>Loading ..</>
        )
        :
        (
          <div className="product">
            {message && (
              <div className="notification-message">
                {message}
              </div>
            )}
            <div className="upper">
              <div className="left">
                <div className="images">
                  {/* Add null/undefined check for data.images */}
                  {data?.images && data.images.length > 0 && data.images.map((pic, index) => (
                    <img
                      src={buildImageUrl(pic?.url)}
                      alt=""
                      key={pic.id}
                      onClick={(e) => setSelectedImg(index)}
                    />
                  ))}
                </div>
                <div className="mainImg">
                  {/* Add safety checks for the main image */}
                  {data?.images && data.images[selectedImg] && (
                    <img src={buildImageUrl(data.images[selectedImg].url)} alt="preview" />
                  )}
                </div>
              </div>
    
              <div className="right">
                <h1>{data?.title}</h1>
                <span className="price">Price ${data?.price} </span>
                <span className="quantity">In store #{data?.quantity} </span>
                <p>
                  {data?.desc}
                </p>
                <div className="quantity">
                  <button
                    onClick={() => setQuantity((prev) => (prev <= 1 ? 1 : prev - 1))}
                  >
                    -
                  </button>
                  <span className="totalSelected">{quantity}</span>
        
                  <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                </div>
                <div className="color">
                  <select className="select" onChange={(e) => handleColorChange(e)}
                    style={{background:bgcolor, color:bgcolor ==='white'? 'purple' : 'white'}}>
                    <option value="">Select an color</option>
                    {/* Add null check for colors array */}
                    {data?.colors && data.colors.length > 0 && data.colors.map((col) => (
                      <option key={col?.id} value={col?.name} className="options">
                        {col?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="size">
                  <h3>Size</h3>
                  <div className="item">
                    {/* Add null check for productsizes array */}
                    {data?.productsizes && data.productsizes.length > 0 && data.productsizes.map(size => 
                      <span 
                        key={size?.id}
                        onClick={() => setSelectedSize(size?.size)}
                        className={selectedSize === size?.size ? 'selected' : ''}
                        style={{cursor: 'pointer'}}
                      >
                        {size?.size}
                      </span>
                    )}
                  </div>
                </div>
                
                <button className="add" onClick={handleAddToCart} disabled={cartLoading}>
                  <AddShoppingCartOutlinedIcon />
                  {cartLoading ? 'Adding...' : 'Add to Cart'}
                </button>
                <div className="links">
                  <div className="item" onClick={handleAddToWishlist} style={{cursor: 'pointer'}}>
                    {inWishlist ? <FavoriteIcon style={{color: 'red'}} /> : <FavoriteBorderOutlinedIcon />}
                    {wishlistLoading ? 'Adding...' : inWishlist ? 'In Wishlist' : 'Add to wish'}
                  </div>
                  <div className="item">
                    <CompareOutlinedIcon /> Add to compare
                  </div>
                </div>
        
                <div className="info">
                  <span>vendor</span>
                  <span>product : .....</span>
                  <span>tag : ......</span>
                  <hr></hr>
                </div>
                <div className="details">
                  <h4>rating</h4>
                  <div className="description">
                    <h4>Description</h4>
                    <p>description</p>
                  </div>
        
                  <div className="review">
                    <h4>leave a review</h4>
                    <div className="reviewSlider">
                      0 <Slider sx={{ color: "purple" }} /> 5
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lower">
              <Reviews productId={id} />
            </div>
          </div>
        )
      }
      {error && 'error has occurred'}
    </Fragment>
  );
};

export default Product;