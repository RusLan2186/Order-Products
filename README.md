# Vue.js Application for Order and Product Management

## Description

This Vue.js application is designed for managing orders and products. Key features include:

1. **Component layout based on example screenshots.**
2. **The application includes separate pages.**
3. **Navigation Menu component** with route links to Orders and Products pages.
4. **TopMenu component** displaying the current date and time in real-time (top-right corner) and a counter using Socket.io to show the number of active sessions in real-time.
5. **Orders and Products components.** Each Order has its own Products.
6. **Orders component functionality** allowing users to click on a specific order to view its details, which can be closed. Display information for each order: name, number of products, creation dates in two formats, total sum in two currencies, and a delete button that opens a popup.
7. **Products component** displaying all products with a filter by product type. Display fields for each product: name, type, warranty dates in different formats, price in different currencies, and order name.

## Installation and Running

1. Clone the repository:
    ```sh
    git clone https://github.com/RusLan2186/Order-Products.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Order-Products
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Run the application:
    ```sh
    npm run dev
    ```

## Deploying to GitHub Pages

1. Build the project:
    ```sh
    npm run build
    ```
2. Deploy to GitHub Pages:
    ```sh
    npm run deploy
    ```

