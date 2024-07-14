# Vue.js Application for Order and Product Management

-  [DEMO LINK](https://ruslan2186.github.io/Order-Products/#/)  

## Description

This Vue.js application is designed for managing orders and products. Key features include:

- **The application includes separate pages.**
- **Navigation Menu component** with route links to Orders and Products pages.
- **TopMenu component** displaying the current date and time in real-time and a counter to show the number of active sessions in real-time.
-  **Orders and Products components.** Each Order has its own Products.
-  **Orders component functionality** allowing users to choose on a specific order to view its details. Display information for each order: name, number of products, creation dates in two formats, total sum in two currencies, and a delete button.
-  **Products component** displaying all products with a filter by product type. Display fields for each product: name, type, warranty dates in different formats, price in different currencies, and order name.

## Technologies used

- Vue.js (v3)
For building the user interface.

- VueX
A state management pattern and library for Vue.js applications.

- CSS Architecture (BEM or Scoped Styles)
For styling the components.

- Linters and Formatters
Tools used to analyze and improve code quality. 

- REST
An architectural style for designing networked applications.

- Git
A distributed version control system for tracking changes in source code during software development. 

- Docker
A platform for developing, shipping, and running applications inside containers. The Docker container for this project runs on port 8080.

- WebSocket (WS)
Communication protocol that allows real-time data transfer between client and server.

## Installation and Running

1. Clone the repository:
   
```bash
git clone https://github.com/RusLan2186/Order-Products.git
```
    
3. Navigate to the project directory:
   
```bash
cd Order-Products
```
    
4. Install dependencies:
   
```bash
npm install
```
    
5. Run the application:
   
```bash
npm run dev
```
    
7. Lint the code:
   
```bash
npm run lint
```

## Deploying to GitHub Pages

1. Build the project:
   
 ```bash
 npm run build
 ```

3. Deploy to GitHub Pages:
   
```bash
npm run deploy
```

