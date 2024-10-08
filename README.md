
# Max Fit Server Backend

[Server Live Link](https://maxfit-server.vercel.app)

## Description

This is a backend application of [Max Fit](https://github.com/sabilar-rahman/Max-Fit-client-frontend) built with [Express](https://expressjs.com/), a fast, unopinionated, minimalist web framework for Node.js and also using typeScript, cors , dotenv, mongoose and zod validation.

## Features

- Product Management: Add, update, delete , search products.
- Variant Management: Manage different variants of products (e.g., colors, sizes).
- Order Management: Create and manage orders for products.
- Data Validation: Ensure data integrity using Zod validation schemas.


## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18.x or above)
- [npm](https://www.npmjs.com/) (Node package manager)
- [Express.Js](https://expressjs.com/) (Node.js framework)
- [Mongoose](https://mongoosejs.com/) (Object Data Modeling for node.js)
- [TypeScript](https://www.typescriptlang.org/) (Object Data Modeling for node.js)

## Getting Started Locally Setup.

### Installation

1. **Clone the repository:**

   ```sh
   git clone  https://github.com/sabilar-rahman/e-commerce.git

   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install or npm i
   ```

### Configuration

1. **Environment Variables:**
   Create a `.env` file in the root of the project and add the following variables:
   ```env
   PORT=5000
   DB_URL=your-database-url from mongodb
   ```

### Running the Application Locally

1. **Start the server:**

  ```sh
   npm run start:dev
   ```


2. **Access the application:**

- Open your browser and navigate to `http://localhost:5000`
- USE Post man to interact with the API at `http://localhost:5000`
-  Product section , use `http://localhost:5000/api/products` 
- For Order, `http://localhost:5000/api/orders` 
   