<div align="center">
  <img src="https://raw.githubusercontent.com/nestjs/nest/master/logo-small.svg" alt="Finary Logo" width="120" />
  <h1>🚀 Finary</h1>
  <p><strong>Modern FinTech for Invoicing & Multi-Currency Payments</strong></p>
  
  <p>
    <a href="#-core-features">Features</a> •
    <a href="#-technology-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>
</div>

---

**Finary** is a cutting-edge FinTech Minimum Viable Product (MVP) designed to simplify **virtual account management**, **invoice generation**, and seamless **payment processing** via BaaS providers and Razorpay.

## ✨ Core Features

| Feature | Description | Status |
|---|---|:---:|
| 🔐 **Secure Authentication** | Robust JWT-based user authentication and secure login flow. | ✅ |
| 🏦 **Virtual Accounts** | Instantly generate virtual bank accounts (BaaS) to receive funds. | ✅ |
| 🧾 **Smart Invoicing** | Seamlessly create, send, manage, and track invoices in real-time. | ✅ |
| 💳 **Global Payments** | Multi-currency invoice payment processing powered by Razorpay. | ✅ |
| 📧 **Automated Emails** | Scalable transactional email alerts powered by Resend API. | ✅ |
| 📊 **Dashboard Analytics** | Clear, intuitive overview of transaction history and balances. | ✅ |

## 💻 Technology Stack

Our modern architecture is built for scalability and developer experience:

### Backend
- **Framework:** [NestJS](https://nestjs.com/) (v11) & Node.js
- **Language:** TypeScript
- **Database:** PostgreSQL & TypeORM
- **Integrations:** Razorpay (Payments) & Resend (Emails)

### Frontend
- **Framework:** [React](https://react.dev/) (v19) & [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

### Infrastructure
- **Containerization:** Docker
- **Orchestration:** Kubernetes

## 🚀 Getting Started

Follow these instructions to quickly set up the development environment on your local machine.

### Prerequisites
- Node.js (v18 or higher)
- Docker & Docker Compose
- PostgreSQL (if not using Docker)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/finary.git
cd finary
```

### 2. Infrastructure Services (Optional)
We use Docker Compose to spin up the required databases rapidly.
```bash
docker-compose up -d
```

### 3. Backend Setup
Navigate into the backend service, provide environment variables, and run the API.
```bash
cd backend
npm install
cp .env.example .env  # Ensure you add your DB, Razorpay, and Resend credentials
npm run start:dev
```

### 4. Frontend Setup
Navigate to the frontend service and run the Vite dev server.
```bash
cd ../frontend
npm install
npm run dev
```

## 🛡️ License

This project is currently unlicensed. All rights reserved.

<p align="center">Made with ❤️ for modern finance.</p>
