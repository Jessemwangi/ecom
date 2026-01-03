import React, { useState, useEffect, useCallback } from "react";
import "./FAQ.scss";
import { makeRequest } from "../../Utility/functions";
import { ExpandMore, ThumbUpOutlined } from "@mui/icons-material";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "all", label: "All Questions" },
    { value: "general", label: "General" },
    { value: "orders", label: "Orders" },
    { value: "shipping", label: "Shipping" },
    { value: "returns", label: "Returns" },
    { value: "payments", label: "Payments" },
    { value: "products", label: "Products" },
    { value: "account", label: "Account" },
  ];

  const fetchFAQs = useCallback(async () => {
    setLoading(true);
    try {
      const url = activeCategory === "all" 
        ? "/faqs?populate=*" 
        : `/faqs/category/${activeCategory}`;
      const response = await makeRequest.get(url);
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const handleMarkHelpful = async (faqId) => {
    try {
      await makeRequest.put(`/faqs/${faqId}/helpful`);
      // Update local state
      setFaqs(faqs.map(faq => 
        faq.id === faqId 
          ? { ...faq, helpfulCount: (faq.helpfulCount || 0) + 1 }
          : faq
      ));
    } catch (error) {
      console.error("Error marking FAQ as helpful:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our store, products, and policies</p>
      </div>

      <div className="faq-container">
        <div className="faq-categories">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`category-btn ${activeCategory === cat.value ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {loading ? (
            <div className="loading">Loading FAQs...</div>
          ) : faqs.length === 0 ? (
            <div className="no-faqs">
              <p>No FAQs found in this category.</p>
            </div>
          ) : (
            faqs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${expandedId === faq.id ? "expanded" : ""}`}
              >
                <div className="faq-question" onClick={() => toggleExpand(faq.id)}>
                  <h3>{faq.question}</h3>
                  <ExpandMore className="expand-icon" />
                </div>
                {expandedId === faq.id && (
                  <div className="faq-answer">
                    <div
                      className="answer-content"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                    <div className="faq-actions">
                      <button
                        className="helpful-btn"
                        onClick={() => handleMarkHelpful(faq.id)}
                      >
                        <ThumbUpOutlined />
                        Helpful ({faq.helpfulCount || 0})
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="faq-footer">
        <h3>Still have questions?</h3>
        <p>Can't find what you're looking for? Contact our support team.</p>
        <a href="/contact" className="contact-btn">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQ;
