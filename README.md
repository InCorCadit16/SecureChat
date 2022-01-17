# SecureChat

## PBL Project of Team 13, FAF-193

#### Authors: Rosca Alexandru, Birsan Andreea, Ionasco Gheorghe, Maslihov Vladislav, Dvorac Ana, Siscov Piotr

### General
This application is a simple chat built over HTTP and WebSockets. It allows users to create personal accounts and exchange text messages and images among them using chats.
All messages content is secured using Diffie-Hellman Elliptic Curve key exchange alogrithm along with AES-256-GCM encryption strategy.

### Project Structure
This application consists of 3 parts: React application, NodeJS Express server and MongoDB database.

Frontend and backend applications exchange messages using HTTP endoints. ALso, for chat support, they establish a web socket connection to notify clients about new messages.

Backend communicates with MongoDB database and other services used for mailing and file saving. 

### Frontend
Frontend core functionality uses following dependencies:
- Redux
- React Router
- Socket.IO
- Axios
- Ant Design
- date-fns
- Formik
- crypto

To run the frontend application its required to cd into frontend directory, install application using ```npm install```, 
build it using ```npm run build``` and run it using ```npm start```.

### Backend
Backend is built using Express library which provides suitable interface for creation of endpoints and controllers.
For database communication is used mongoose library, which hold a sets of methods that build MongoDB queries.

Other technologies used:
- TypeScript
- Nodemailer
- Cloudinary
- Socket.IO
- Multer

Steps to run application:
1) Run ```npm install``` or ```yarn install```
3) Create .env file using ```cp .env.example .env``` command
4) Install MongoDB or create a cluster on [MongoDB Cloud](https://cloud.mongodb.com) and insert your connection string in ```backend/src/core/db.ts```
5) Register to [mailtrap.io](https://mailtrap.io/) and insert your account data into .env
6) Register to [cloudinary.com](https://cloudinary.com/), open Dashboard in cloudinary and insert your account data into .env
7) Run ```npm start```

### Database
MongoDB database can be hosted either on MongoDB Atlas Cluster (first cluster is free) or locally. In order to connect database to backend open 
```backend/src/core/db.ts``` file and insert your database connection string.
