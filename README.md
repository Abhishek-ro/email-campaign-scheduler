# Email Campaign Scheduler Backend

This project implements a simple backend system for scheduling and sending email campaigns. It provides APIs to manage campaigns and leads, along with a scheduler that automatically dispatches emails at their designated times.

---

## ✨ Features

- **Campaign Creation API**: Create new email campaigns with details like user ID, campaign name, scheduled time, and a list of recipients.
- **Lead Management API**: Fetch all leads associated with a specific user. Includes an endpoint for easily adding dummy lead data.
- **Automated Email Scheduler**: A background script that runs every minute to check and execute scheduled email campaigns.
- **Actual Email Sending**: Integration with Nodemailer to send real emails to recipients using SMTP.

---

## 💻 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – REST API framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **node-cron** – Scheduler
- **nodemailer** – Email delivery
- **dotenv** – Environment configuration

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS)
- MongoDB (Local or Atlas)

### Installation

```bash
git clone https://github.com/Abhishek-ro/email-campaign-scheduler.git
cd email-campaign-scheduler
npm install
