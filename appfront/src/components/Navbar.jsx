import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";
import Cart from "./Cart/Cart";
import UseFetch from "../hooks/useFetch";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch categories with subcategories
  const { data: categories } = UseFetch('/categories?populate=*');

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Get image URL helper
  const getImageUrl = (imgData) => {
    if (!imgData) return 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=200';
    if (imgData.url && imgData.url.startsWith('http')) return imgData.url;
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:1337';
    return `${baseUrl}${imgData.url}`;
  };

  const handleMouseEnter = (categoryId) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    setDropdownTimeout(timeout);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const makeRequest = (await import("../Utility/functions")).makeRequest;
      const response = await makeRequest.get(`/products?populate=*&filters[title][$contains]=${query}`);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="navbar">
      {/* Promo Bar */}
      <div className="promo-bar">
        <div className="promo-content">
          <LocalOfferIcon className="promo-icon" />
          <span>Free Shipping on Orders Over $50 | Holiday Sale - Up to 40% Off</span>
        </div>
      </div>

      <div className="wrapper">
        <div className="left">
          <div className="logo">
            <Link className="link" to="/">
              <h2>Kuguza Shops</h2>
            </Link>
          </div>
          
          <div className="desktop-menu">
            {categories && categories.slice(0, 3).map((category) => (
              <div 
                className="item mega-menu-item" 
                key={category.id}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link className="link" to={`/products/${category.id}`}>
                  {category.title} <KeyboardArrowDownIcon />
                </Link>
                
                {activeDropdown === category.id && category.sub_categories && category.sub_categories.length > 0 && (
                  <div 
                    className="mega-dropdown"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mega-dropdown-content">
                      <div className="subcategories-grid">
                        {category.sub_categories.map((subCat) => (
                          <Link 
                            key={subCat.id} 
                            to={`/subcategory/${subCat.id}`} 
                            className="subcategory-card"
                          >
                            <div className="subcategory-image">
                              <img 
                                src={getImageUrl(subCat.img)} 
                                alt={subCat.title}
                                onError={(e) => {
                                  e.target.src = 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=200';
                                }}
                              />
                            </div>
                            <span className="subcategory-title">{subCat.title}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="view-all-link">
                        <Link to={`/products/${category.id}`}>
                          View All {category.title} →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="item dropdown">
              <span className="link">More <KeyboardArrowDownIcon /></span>
              <div className="dropdown-menu">
                {categories && categories.slice(3).map((category) => (
                  <Link key={category.id} className="dropdown-link" to={`/products/${category.id}`}>
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="desktop-links">
            <div className="item">
              <Link className="link" to="/">Hot Deals</Link>
            </div>
            <div className="item">
              <Link className="link" to="/">New Arrivals</Link>
            </div>
          </div>

          <div className="icons">
            <div className="icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
              <SearchIcon />
            </div>
            <Link to={user ? "/profile" : "/login"} className="icon-btn">
              <PersonOutlineIcon />
              {user && <span className="user-indicator"></span>}
            </Link>
            <div className="icon-btn">
              <FavoriteBorderOutlinedIcon />
              <span className="badge">0</span>
            </div>
            <div className="icon-btn cartIcon" onClick={() => setOpenCart(!openCart)}>
              <ShoppingCartOutlinedIcon />
              <span className="badge">0</span>
            </div>
          </div>

          <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="search-bar">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            <button className="close-search" onClick={handleSearchClose}>
              <CloseIcon />
            </button>
          </div>

          {searchQuery.length >= 2 && (
            <div className="search-results">
              {searchLoading ? (
                <div className="search-loading">
                  <div className="spinner"></div>
                  <span>Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="results-grid">
                  {searchResults.slice(0, 8).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.documentId || product.id}`}
                      className="search-result-item"
                      onClick={handleSearchClose}
                    >
                      <div className="result-image">
                        <img
                          src={getImageUrl(product.img)}
                          alt={product.title}
                          onError={(e) => {
                            e.target.src = 'https://images.pexels.com/photos/3756346/pexels-photo-3756346.jpeg?auto=compress&cs=tinysrgb&w=200';
                          }}
                        />
                      </div>
                      <div className="result-info">
                        <h4>{product.title}</h4>
                        <p className="result-price">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <span>🔍</span>
                  <p>No products found for "{searchQuery}"</p>
                  <small>Try different keywords</small>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-items">
            {categories && categories.map((category) => (
              <div key={category.id} className="mobile-menu-category">
                <Link className="mobile-link" to={`/products/${category.id}`} onClick={() => setMobileMenuOpen(false)}>
                  {category.title}
                </Link>
                {category.sub_categories && category.sub_categories.length > 0 && (
                  <div className="mobile-subcategories">
                    {category.sub_categories.map((subCat) => (
                      <Link 
                        key={subCat.id} 
                        to={`/subcategory/${subCat.id}`} 
                        className="mobile-sublink"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subCat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link className="mobile-link" to="/" onClick={() => setMobileMenuOpen(false)}>Hot Deals</Link>
            <Link className="mobile-link" to="/" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
          </div>
        </div>
      )}

      {openCart && <Cart />}
    </div>
  );
};

export default Navbar;

