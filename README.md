# 🎟️ WRL – Visitor Pass Management System

### **Western Refrigeration Pvt. Ltd.**

> **A full-stack MERN application for secure, digital visitor registration, QR-based pass generation, and real-time gate monitoring.**

---

## 📌 Overview

**WRL-VisitorPass** is an internal enterprise application developed for
**Western Refrigeration Pvt. Ltd.**, designed to digitize and automate the entire visitor management process.

This web-based solution enables **Security Teams, Admins, and Department Heads** to efficiently register visitors, generate A4 printable QR-based passes, and track check-ins/outs in real time.

> 🔐 Fully secure with **JWT Authentication**
> 🖨 Generates **A4 Printable Visitor Passes with QR codes & photos**
> 📡 Real-time visitor dashboard for Security Control Room
> 🏭 Integrated inside the organization’s MES ecosystem

---

## 🧩 Core Features

### 🎫 **1. Visitor Registration + Pass Creation**

Security/authorized staff can register:

* Visitor Name
* Company
* Department to meet
* Purpose of visit
* Valid From / Valid Till time
* Capture/Upload Visitor Photo

### 📷 **2. Auto QR Code Generation**

Each visitor is assigned a unique `passId` → converted into a scannable QR code.

Used for:

* Entry gate scanning
* Exit gate scanning
* Verifying authenticity
* Tracking visit duration

### 🖨 **3. A4 Printable Visitor Pass**

Pass includes:

* Company header (WRL)
* Visitor photo
* QR Code
* Visitor information
* Department/employee details
* Validity period
* Safety guidelines
* Signature boxes

The system uses **print-only CSS** ensuring perfect clean A4 output.

---

### 🔍 **4. Visitor Tracking Dashboard**

Security team can monitor:

* Visitors currently inside the factory
* Entry/exit timestamp
* Host employee & department
* Visit duration (auto-calculated)
* Overstay alerts

### 🚪 **5. QR-Based Entry & Exit**

Security at the gate uses QR scanning:

* On entry → visitor marked “IN”
* On exit → status updated to “OUT”

Prevents unauthorized stay.

---

### 🛡️ **6. Authentication & Authorization**

* JWT-based login
* Security role
* Admin role
* Only authorized users can create or print passes
* Visitor actions hidden for normal employees

---

## 🧑‍💻 Tech Stack

### **Frontend**

* React.js (Vite)
* React Router
* Tailwind CSS
* Redux Toolkit + Persist
* Axios
* React Hot Toast
* QRCode
* React Datepicker

### **Backend**

* Node.js
* Express.js
* MongoDB / Mongoose
* Multer (for photo uploads)
* QR Code Generator
* JWT Authentication
* Cookie Parser

---

## 🏗️ Application Architecture

### **Overall Workflow**

```
Visitor Arrives
    ↓
Security User Registers Visitor
    ↓
System Generates Visitor Pass (QR + Photo)
    ↓
Print Pass (A4) → Hand over to Visitor
    ↓
Entry Gate Scans QR → Mark IN
    ↓
Visitor Meets Host
    ↓
Exit Gate Scans QR → Mark OUT
    ↓
System Logs Visit Duration
```

---

## 🖼️ Screenshots (Optional Section)

You can add images like:

```
![Visitor Dashboard](image_link)
![QR Based Pass](image_link)
![Print Layout](image_link)
```

---

## 🔐 `.env` Configuration

```env

```

---

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open → **[http://localhost:5173](http://localhost:5173)**

---

## 📝 Key Modules Breakdown

### 🧾 **1. VisitorForm.jsx**

* Visitor registration
* Photo upload
* Form validation
* API trigger to create pass

### 🧲 **2. VisitorPassDisplay.jsx**

* Fetch pass details
* Generate QR code
* A4 printable pass
* Dynamic layout
* Clean print CSS

### 📊 **3. VisitorDashboard.jsx**

* Search visitors
* Filter by date / status
* Show inside/outside visitor count
* Track visit duration

### 📮 **4. QR Scan Endpoint**

Backend verifies:

* Valid pass
* Already checked-in/out
* Expired passes

---

## 🧠 Future Improvements

* Auto SMS to host employee
* Email visitor pass PDF
* Role-based analytics
* Multi-factory support
* Mobile scanning app
* Integration with turnstile gates

---

## 👨‍💻 Developers

### **Varun Yadav**

Software Developer – MES Team
Western Refrigeration Pvt. Ltd., India
🔗 [https://www.linkedin.com/in/thecyberdevvarun](https://www.linkedin.com/in/thecyberdevvarun)

### **Vikash Kumar**

Software Developer – MES Team
Western Refrigeration Pvt. Ltd., India
🔗 [https://www.linkedin.com/in/vikash-kumar-54b464336/](https://www.linkedin.com/in/vikash-kumar-54b464336/)

---

## 📄 License

This project is **internal and proprietary** to
**Western Refrigeration Pvt. Ltd.**
Unauthorized distribution is prohibited.
