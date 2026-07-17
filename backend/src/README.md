# Inventory Management & Automated Reorder System

## Project Overview

The Inventory Management & Automated Reorder System is a full-stack web application that helps administrators manage inventory, monitor stock levels, receive real-time low-stock alerts, and automatically process supplier reorder requests.

The system uses asynchronous processing with BullMQ and Redis to handle reorder operations efficiently in the background.

---

# Features

## Inventory Management

- Add new products
- View all products
- Update product details
- Delete products
- Track available stock quantity
- Configure low-stock thresholds

---

## Low Stock Monitoring

- Automatically detects products below stock threshold
- Generates reorder requests
- Sends real-time notifications
- Maintains notification history

---

## Automated Reorder Processing

Reorder workflow:

```
Low Stock Detected
        |
        ↓
BullMQ Queue
        |
        ↓
Redis
        |
        ↓
Background Worker
        |
        ↓
Supplier Processing
        |
        ↓
Completed / Failed
```

Features:

- Asynchronous reorder processing
- Background worker handling
- Supplier communication simulation
- Retry mechanism for failed jobs

---

## OTP Approval System

For high-value orders:

```
High Value Order
        |
        ↓
Pending Approval
        |
        ↓
Generate OTP
        |
        ↓
Verify OTP
        |
        ↓
Approved
        |
        ↓
Supplier Processing
```

Features:

- OTP generation
- OTP verification
- Approval-based processing

---

# Technology Stack

## Frontend

- React.js
- Vite
- Axios
- React Router
- Bootstrap / Tailwind CSS
- Socket.IO Client

## Backend

- Node.js
- Express.js
- BullMQ
- Socket.IO

## Database

- PostgreSQL
- node-pg-migrate

## Queue Management

- Redis
- BullMQ

---

# Project Structure

```
inventory-management-system

│
├── backend
│
│   ├── src
│   │
│   │   ├── controllers
│   │   ├── routes
│   │   ├── models
│   │   ├── queues
│   │   ├── workers
│   │   ├── config
│   │   └── utils
│   │
│   ├── migrations
│   ├── example.env
│   └── package.json
│
│
└── frontend
    │
    ├── src
    ├── components
    ├── pages
    └── package.json
```

---

# Installation and Setup

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```
example.env → .env
```

Configure:

- PostgreSQL database
- Redis connection
- JWT secret

---

## Database Migration

Run:

```bash
npm run migrate
```

This creates:

- Products table
- Reorder Requests table

---

## Start Backend Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# Redis Setup

Start Redis server.

Check Redis connection:

```bash
redis-cli ping
```

Expected output:

```
PONG
```

---

# Start Background Worker

Open another terminal:

```bash
cd backend
node src/workers/worker.js
```

Worker handles:

- Queue processing
- Supplier simulation
- Retry failures
- Status updates

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Endpoints

## Products

### Get All Products

```
GET /api/products
```

### Create Product

```
POST /api/products
```

Example:

```json
{
 "product_name":"Laptop",
 "sku":"LP100",
 "available_quantity":20,
 "low_stock_threshold":5,
 "cost_price":55000
}
```

---

## Reorders

### Get Reorders

```
GET /api/reorders
```

### Create Reorder

```
POST /api/reorders
```

Example:

```json
{
 "product_id":2,
 "quantity":5
}
```

---

## OTP Verification

```
POST /api/reorders/verify-otp
```

Example:

```json
{
 "reorderId":9,
 "otp":"988469"
}
```

---

## Dashboard

```
GET /api/dashboard/stats
```

```
GET /api/dashboard/recent-activities
```

---

# Database Tables

## Products

Stores:

- Product information
- Stock quantity
- Price
- Threshold level


## Reorder Requests

Stores:

- Product details
- Supplier information
- Order quantity
- Total price
- Status
- OTP approval details

---

# Screenshots

- Dashboard

- Product Management
- Low Stock Alerts
- Reorder Management
- OTP Approval Screen
- Reports and Charts

---

# Security

- Environment variables used for secrets
- Database credentials are not committed
- API validation implemented

---

# Future Improvements

- Real supplier API integration
- Email/SMS OTP delivery
- Advanced analytics
- Role-based authentication
- Cloud deployment

---

# Author

Inventory Management System Project