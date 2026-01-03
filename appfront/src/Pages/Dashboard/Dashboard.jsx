import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import HistoryIcon from '@mui/icons-material/History';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { makeRequest } from '../../Utility/functions';
import { useAuth } from '../../contexts/AuthContext';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('cart');
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [orders, setOrders] = useState([]);
  const [rewards, setRewards] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCart, removeFromCart, updateCartQuantity: updateCartQty, clearCart } = useCart();
  const { getWishlist, removeFromWishlist } = useWishlist();

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      // Fetch cart from database
      const cartResult = await getCart(user.id);
      if (cartResult.success) {
        setCart(cartResult.data);
      }

      // Fetch wishlist from database
      const wishlistResult = await getWishlist(user.id);
      if (wishlistResult.success) {
        setWishlist(wishlistResult.data);
      }

      // Fetch orders
      const ordersRes = await makeRequest.get(`/orders?filters[user][id][$eq]=${user.id}&populate=*`);
      setOrders(ordersRes.data.data || []);

      // Fetch rewards
      const rewardsRes = await makeRequest.get(`/rewards?filters[user][id][$eq]=${user.id}&populate=*`);
      if (rewardsRes.data.data.length > 0) {
        setRewards(rewardsRes.data.data[0]);
      }

      // Fetch suggestions (popular products)
      const suggestionsRes = await makeRequest.get('/products?populate=*&pagination[limit]=8');
      setSuggestions(suggestionsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate, user, getCart, getWishlist]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getImageUrl = (imgData) => {
    if (!imgData) return 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=300';
    if (imgData.url && imgData.url.startsWith('http')) return imgData.url;
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:1337';
    return `${baseUrl}${imgData.url}`;
  };

  const updateCartQuantity = async (itemIndex, newQuantity) => {
    try {
      const res = await makeRequest.put('/cart/update', {
        itemIndex,
        quantity: newQuantity,
      });
      setCart(res.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (itemIndex) => {
    try {
      const res = await makeRequest.delete(`/cart/remove/${itemIndex}`);
      setCart(res.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await makeRequest.delete(`/wishlist/remove/${productId}`);
      setWishlist(res.data);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const res = await makeRequest.post('/cart/add', {
        productId: product.id,
        quantity: 1,
        price: product.price,
      });
      setCart(res.data);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      alert('Please enter a coupon code');
      return;
    }

    setCouponLoading(true);
    try {
      const res = await makeRequest.post('/coupons/validate', {
        code: couponCode,
        cartTotal: cart.totalAmount,
      });

      if (res.data.valid) {
        setAppliedCoupon(res.data);
        alert(`Coupon applied! You saved $${res.data.discountAmount.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      alert(error.response?.data?.error?.message || 'Invalid or expired coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const renderCart = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      return (
        <div className="empty-state">
          <ShoppingCartOutlinedIcon />
          <h3>Your cart is empty</h3>
          <p>Add items to get started</p>
        </div>
      );
    }

    const finalTotal = appliedCoupon ? appliedCoupon.finalAmount : cart.totalAmount;

    return (
      <div className="cart-section">
        <div className="cart-items">
          {cart.items.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={getImageUrl(item.product?.img)} alt={item.product?.title} />
              <div className="item-details">
                <h4>{item.product?.title}</h4>
                <p className="item-price">${item.price}</p>
                {item.color && <span className="item-variant">Color: {item.color}</span>}
                {item.size && <span className="item-variant">Size: {item.size}</span>}
              </div>
              <div className="item-actions">
                <div className="quantity-control">
                  <button onClick={() => updateCartQuantity(index, item.quantity - 1)}>
                    <RemoveIcon />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(index, item.quantity + 1)}>
                    <AddIcon />
                  </button>
                </div>
                <p className="item-subtotal">${item.subtotal?.toFixed(2)}</p>
                <button className="remove-btn" onClick={() => removeFromCart(index)}>
                  <DeleteOutlineIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <div className="summary-row">
            <span>Total Items:</span>
            <span>{cart.totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cart.totalAmount?.toFixed(2)}</span>
          </div>

          {/* Coupon Section */}
          <div className="coupon-section">
            {!appliedCoupon ? (
              <>
                <div className="coupon-input">
                  <LocalOfferIcon />
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                  <button onClick={validateCoupon} disabled={couponLoading}>
                    {couponLoading ? 'Checking...' : 'Apply'}
                  </button>
                </div>
              </>
            ) : (
              <div className="applied-coupon">
                <div className="coupon-info">
                  <LocalOfferIcon />
                  <span>{appliedCoupon.code}</span>
                  <span className="discount">-${appliedCoupon.discountAmount.toFixed(2)}</span>
                </div>
                <button className="remove-coupon" onClick={removeCoupon}>Remove</button>
              </div>
            )}
          </div>

          {appliedCoupon && (
            <div className="summary-row discount-row">
              <span>Discount:</span>
              <span className="discount-amount">-${appliedCoupon.discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-row total">
            <span>Total:</span>
            <span>${finalTotal?.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    );
  };

  const renderWishlist = () => {
    if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
      return (
        <div className="empty-state">
          <FavoriteOutlinedIcon />
          <h3>Your wishlist is empty</h3>
          <p>Save items you love</p>
        </div>
      );
    }

    return (
      <div className="wishlist-grid">
        {wishlist.products.map((product) => (
          <div key={product.id} className="wishlist-item">
            <img src={getImageUrl(product.img)} alt={product.title} />
            <div className="item-info">
              <h4>{product.title}</h4>
              <p className="price">${product.price}</p>
              <div className="item-actions">
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                <button className="remove-btn" onClick={() => removeFromWishlist(product.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOrders = () => {
    if (!orders || orders.length === 0) {
      return (
        <div className="empty-state">
          <HistoryIcon />
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
        </div>
      );
    }

    return (
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h4>Order #{order.orderNumber}</h4>
                <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.status}`}>{order.status}</span>
                <span className={`payment-badge ${order.paymentStatus}`}>{order.paymentStatus}</span>
              </div>
            </div>
            <div className="order-items">
              {order.items?.slice(0, 3).map((item, index) => (
                <div key={index} className="order-item-mini">
                  <img src={getImageUrl(item.product?.img)} alt={item.product?.title} />
                  <span>{item.quantity}x</span>
                </div>
              ))}
              {order.items?.length > 3 && <span className="more-items">+{order.items.length - 3} more</span>}
            </div>
            <div className="order-footer">
              <span className="order-total">Total: ${order.totalAmount?.toFixed(2)}</span>
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRewards = () => {
    if (!rewards) {
      return <div className="loading">Loading rewards...</div>;
    }

    const tierColors = {
      bronze: '#cd7f32',
      silver: '#c0c0c0',
      gold: '#ffd700',
      platinum: '#e5e4e2',
    };

    return (
      <div className="rewards-section">
        <div className="rewards-header">
          <div className="tier-badge" style={{ borderColor: tierColors[rewards.tier] }}>
            <CardGiftcardIcon />
            <h3>{rewards.tier.toUpperCase()}</h3>
          </div>
          <div className="points-display">
            <h2>{rewards.totalPoints || 0}</h2>
            <p>Total Points</p>
          </div>
        </div>
        <div className="rewards-info">
          <h4>How to Earn Points</h4>
          <ul>
            <li>Place an order: 10 points per $1</li>
            <li>Write a review: 50 points</li>
            <li>Refer a friend: 500 points</li>
            <li>Birthday bonus: 200 points</li>
          </ul>
        </div>
        {rewards.transactions && rewards.transactions.length > 0 && (
          <div className="transactions">
            <h4>Recent Transactions</h4>
            {rewards.transactions.slice(0, 5).map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div>
                  <p className="transaction-desc">{transaction.description}</p>
                  <span className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</span>
                </div>
                <span className={`transaction-points ${transaction.type}`}>
                  {transaction.type === 'earned' ? '+' : '-'}
                  {transaction.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSuggestions = () => {
    if (!suggestions || suggestions.length === 0) {
      return <div className="loading">Loading suggestions...</div>;
    }

    return (
      <div className="suggestions-grid">
        {suggestions.map((product) => (
          <div key={product.id} className="suggestion-card" onClick={() => navigate(`/product/${product.documentId || product.id}`)}>
            <img src={getImageUrl(product.img)} alt={product.title} />
            <div className="suggestion-info">
              <h4>{product.title}</h4>
              <p className="price">${product.price}</p>
              {product.isNew && <span className="new-badge">NEW</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p>Manage your shopping experience</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingCartOutlinedIcon />
            <span>Cart</span>
            {cart && cart.totalItems > 0 && <span className="tab-badge">{cart.totalItems}</span>}
          </button>
          <button
            className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <FavoriteOutlinedIcon />
            <span>Wishlist</span>
            {wishlist && wishlist.products?.length > 0 && <span className="tab-badge">{wishlist.products.length}</span>}
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <HistoryIcon />
            <span>Orders</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            <CardGiftcardIcon />
            <span>Rewards</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggestions')}
          >
            <LightbulbOutlinedIcon />
            <span>For You</span>
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'cart' && renderCart()}
          {activeTab === 'wishlist' && renderWishlist()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'rewards' && renderRewards()}
          {activeTab === 'suggestions' && renderSuggestions()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
