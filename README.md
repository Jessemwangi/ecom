# 🛍️ KUGUZA Ecom

**KUGUZA Ecom** is a modern e-commerce web application that allows users to browse, preview, and purchase products with ease. Built using **React** for the frontend and **Strapi** for the backend, it leverages a **PostgreSQL** database for persistent storage. The platform supports multiple payment options including **Visa**, **PayPal**, **M-Pesa**, and **MasterCard**.

---

## 🚀 Features

- 🔍 **Product Browsing** – Explore a catalog of products managed via Strapi
- 🖼️ **Image Preview** – High-quality image previews for each product
- 🛒 **Shopping Cart** – Add or remove products from the cart
- ❤️ **Favorites** – Mark products as favorites for easy access
- 💳 **Payment Integration** – Supports Visa, PayPal, MasterCard, and M-Pesa
- 📦 **Strapi CMS** – Manage products, categories, orders, and users through an admin dashboard

---

## 🧱 Tech Stack

### Frontend
- React (JavaScript)
- Axios for API requests
- Tailwind CSS / CSS Modules (if applicable)

### Backend (Headless CMS)
- [Strapi](https://strapi.io/) – Node.js-based headless CMS
- PostgreSQL database

### Payment Integration
- Visa & MasterCard via Stripe (or another payment gateway)
- PayPal REST API
- M-Pesa (e.g. Safaricom Daraja API)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kuguza-ecom.git
cd kuguza-ecom
```

### 2. Setup Backend (Strapi)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=kuguza_db
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_app_jwt_secret
APP_KEYS=your_app_keys
PAYPAL_CLIENT_ID=your_paypal_id
MPESA_CONSUMER_KEY=your_mpesa_key
```

Run the backend:

```bash
npm run develop
```

> 🔐 Visit [http://localhost:1337/admin](http://localhost:1337/admin) to set up the first admin user.

### 3. Setup Frontend (React)

```bash
cd ../client
npm install
npm start
```

---

## 📁 Folder Structure

```
kuguza-ecom/
├── client/          # React frontend
├── backend/         # Strapi backend
├── README.md
```

---

## 🌐 API Integration

The frontend interacts with the Strapi backend using REST or GraphQL APIs. Core collections include:

- `/products` – Get all product entries
- `/categories` – Product category filter
- `/favorites` – User-specific favorites
- `/cart-items` – Shopping cart operations
- `/orders` – Checkout and order management
- `/auth/local` – Login and registration

You can manage content types using Strapi's admin panel.

---

## 💳 Payment Integration

KUGUZA integrates with:

- **PayPal** via REST API
- **M-Pesa** using Safaricom Daraja API (OAuth + STK Push)
- **Visa/MasterCard** using Stripe or a supported payment SDK

> Payment logic is handled in the frontend with secure communication to the APIs or via a payment proxy route.

---

## 🧪 Testing

Basic unit and integration tests coming soon.

---

## 📌 Roadmap / Future Features

- Admin dashboard analytics
- Product reviews and ratings
- Order history & user profiles
- Mobile app support (React Native)
- Advanced filtering and search

---

## 🙌 Contribution

Contributions are welcome! Feel free to submit issues or pull requests.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact

- **Developer:** [Your Name]
- **Email:** [your.email@example.com]
- **GitHub:** [@your-username](https://github.com/your-username)

---

## 🌟 Acknowledgements

- [React](https://reactjs.org/)
- [Strapi](https://strapi.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [PayPal Developer](https://developer.paypal.com/)
- [M-Pesa Daraja API](https://developer.safaricom.co.ke/)
- [Stripe](https://stripe.com/)

---