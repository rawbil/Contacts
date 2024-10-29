// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const PORT = process.env.PORT;
// dotenv.config();
// //END OF IMPORTS

// const authRoute = require("./routes/authRoute");
// const contactRoute = require("./routes/contactRoute");

// // Check if the MongoDB URI is defined
// if (!process.env.MONGODBURI) {
//   console.error("Error: MongoDB URI is not defined in environment variables.");
//   process.exit(1); 
// }
// mongoose
//   .connect(process.env.MONGODBURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(`Database connected: ${mongoose.connection.host}`))
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error.message);
//     process.exit(1); 
//   });

//   const corsOptions = {
//     origin: 'https://contacts-frontend-ecru.vercel.app', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   };
  
//   // Middleware
//   app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.options('*', (req, res) => {
//   console.log('Received OPTIONS request:', req.headers);
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any other headers you might use
//   res.sendStatus(200); // Send OK status for OPTIONS requests
// });

// // Routes
// app.use("/auth", authRoute);
// app.use("/contacts", contactRoute);

// // Test route
// app.get("/", (req, res) => {
//   res.json("Hello from the server!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });


/// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT;

// Routes
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");

// Database Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

const corsOptions = {
  origin: ["https://contacts-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  optionsSuccessStatus: 200,
};
  
  // Middleware
  app.options("*", cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/contacts", contactRoute);

// Test route
app.get("/", (req, res) => {
  res.json("Hello from the server!");
});

// Start the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
