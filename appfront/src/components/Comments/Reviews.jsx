import React, { useState, useEffect, useCallback } from "react";
import "./Comment.scss";
import { Star, ThumbUpOutlined, VerifiedUser } from "@mui/icons-material";
import { makeRequest } from "../../Utility/functions";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await makeRequest.get(`/reviews/product/${productId}`);
      setReviews(response.data.reviews || []);
      setAverageRating(response.data.averageRating || 0);
      setTotalReviews(response.data.totalReviews || 0);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit a review");
      return;
    }

    if (!newReview.title || !newReview.comment) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await makeRequest.post("/reviews/create", {
        product: productId,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
      });

      setNewReview({ rating: 5, title: "", comment: "" });
      fetchReviews();
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.error?.message || "Error submitting review. You may have already reviewed this product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkHelpful = async (reviewId) => {
    if (!user) {
      alert("Please login to mark reviews as helpful");
      return;
    }

    try {
      await makeRequest.put(`/reviews/${reviewId}/helpful`);
      fetchReviews();
    } catch (error) {
      console.error("Error marking review as helpful:", error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        sx={{
          color: index < rating ? "#FFD700" : "#ddd",
          fontSize: "18px",
        }}
      />
    ));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="comments-container">Loading reviews...</div>;
  }

  return (
    <div className="comments-container">
      <div className="reviews-header">
        <h1 className="main-heading">Customer Reviews</h1>
        <div className="rating-summary">
          <div className="average-rating">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <span className="total-reviews">Based on {totalReviews} reviews</span>
          </div>
        </div>
      </div>

      {user && (
        <div className="review-form">
          <h3>Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="rating-input">
              <label>Rating:</label>
              <div className="star-selection">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    sx={{
                      color: star <= newReview.rating ? "#FFD700" : "#ddd",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Review Title"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Write your review here..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows="4"
                required
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="submit-review-btn">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      <ul className="comments-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <li key={review.id}>
              <div className="comment-main-level">
                <div className="comment-avatar">
                  <img
                    src={`https://ui-avatars.com/api/?name=${review.user?.username || "User"}&background=6441a5&color=fff`}
                    alt={review.user?.username || "User"}
                  />
                </div>

                <div className="comment-box">
                  <div className="comment-head">
                    <h6 className="comment-name">
                      {review.user?.username || "Anonymous"}
                      {review.verified && (
                        <VerifiedUser
                          sx={{ fontSize: "16px", color: "#4CAF50", marginLeft: "5px" }}
                          titleAccess="Verified Purchase"
                        />
                      )}
                    </h6>
                    <div className="review-rating">{renderStars(review.rating)}</div>
                    <span className="review-date">{formatDate(review.createdAt)}</span>
                  </div>
                  <div className="review-title">
                    <strong>{review.title}</strong>
                  </div>
                  <div className="comment-content">{review.comment}</div>
                  <div className="review-actions">
                    <button
                      className="helpful-btn"
                      onClick={() => handleMarkHelpful(review.id)}
                    >
                      <ThumbUpOutlined sx={{ fontSize: "16px" }} />
                      Helpful ({review.helpfulCount || 0})
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Reviews;
