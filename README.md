# Visa Cart System

The **Visa Cart System** is a user-friendly platform designed to streamline visa services.  
Users can explore services, add them to a cart, receive discounts on multiple categories, and simulate payments—all in one seamless flow.  
The UI is responsive, intuitive, and built with modern technologies.

---

## 📸 **Project Preview**  
<p float="left">
  <img src="https://github.com/user-attachments/assets/a4949cc3-3833-4db4-9d6f-96d347055a85" width="250" style="margin-right:10px" />
  <img src="https://github.com/user-attachments/assets/8d160df2-7177-475e-bafe-2a9f664bea2f" width="250" style="margin-right:10px" />
  <img src="https://github.com/user-attachments/assets/3a8b147e-92d2-4fae-92a4-462fd26d9555" width="250" />
</p>

<p float="left" style="margin-top: 20px;">
  <img src="https://github.com/user-attachments/assets/ccd6c615-fcc7-4682-a9f4-c4c1d226eae8" width="250" style="margin-right:10px" />
  <img src="https://github.com/user-attachments/assets/2dbccc57-4a97-4014-b41d-21ed539eef56" width="250" />
</p>
## 🧩 **Key Components**

- **ProductCard** – Displays individual visa services with "Add to Cart" functionality.
- **ProductsPage** – The main landing page showing available services in card format.
- **CartDrawer** – A collapsible cart drawer accessible from the header, shows added items and allows removal.
- **PaymentPage** – A dummy checkout page with payment confirmation or cancellation options.
- **AiChatBot** – An AI-powered support chatbot for user queries and assistance.
- **APIs** – Backend endpoints for product management and cart functionality.

---

## 🎯 **Core Features**

✅ **Add Services to Cart**: Select visa services from the cards.  
✅ **Category-Based Discount**: Add services from two different categories to get a **10% discount** automatically applied.  
✅ **Cart Management**: Remove services directly from the cart.  
✅ **Persistent Cart**: Cart state remains intact across page refreshes or navigations.  
✅ **Payment Flow**:
  - Confirm payment ➡️ Shows confirmation message, resets cart, returns to home page.
  - Cancel payment ➡️ Cart remains unchanged.
✅ **Header Navigation**:
  - Company logo (linked to the official website).
  - Cart button with item count badge.
✅ **AI Chatbot**: For instant user support.  
✅ **Responsive Design**: Works across all devices.

---

## 🛠️ **Tech Stack**

| Frontend      | Backend            | Database |
|---------------|--------------------|----------|
| React         | Node.js            | MongoDB  |
| Tailwind CSS  | Express.js         |          |
| Context API   |                    |          |

---

## 🧭 **Installation Guide**

### 1️⃣ **Clone the Repository**

git clone [https://github.com/bpriyanshu74/visa_cart_system]

### 2️⃣ **Frontend Setup**
```
cd frontend
npm install
npm run dev
Visit the application at: http://localhost:5173

---

### 3️⃣ **Backend Setup**

Ensure you have **MongoDB (e.g., MongoDB Shell or MongoDB Community Edition)** installed and running.
```
cd backend
npm install
node seed
node server

---

# Future Scope

- 💳 **Real Payment Integration**: Integrate real-world payment gateways such as Stripe or Razorpay for actual transactions.
- 🌍 **Multi-Language Support**: Expand the app to support multiple languages for a global user base.
- 📊 **Admin Dashboard**: Develop an admin panel to manage services, orders, and view user analytics.


