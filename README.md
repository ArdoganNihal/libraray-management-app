# Library Management System
This project is a Node.js application that provides RESTful API for a library management system.

## Features

- User management (listing, detail viewing, adding)
- Book management (listing, detail viewing, adding)
- Book borrowing and return transactions
- Book scoring system

## Technologies

- Node.js & TypeScript
- Express.js
- Sequelise ORM
- PostgreSQL
- Joi (Validation)

## Installation
1. Clone the repository:

``` git clone <repo-url>```

2. Install dependencies:

```npm install```

3. Create .env file:
 ``` 
DB_NAME=library_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=3000
```
4. Create database:
```
CREATE DATABASE library_db;
````
5. Start the application:
```
npm run dev
```

