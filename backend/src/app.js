const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reorderRoutes = require("./routes/reorderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();


// CORS Configuration

const allowedOrigins = [

  "http://localhost:5173",

  process.env.FRONTEND_URL

];


app.use(
  cors({

    origin: function(origin, callback){

      // allow postman / server requests
      if(!origin) {
        return callback(null,true);
      }


      if(allowedOrigins.includes(origin)){

        return callback(null,true);

      }


      return callback(
        new Error("Not allowed by CORS")
      );

    },

    credentials:true

  })
);



app.use(express.json());



// API Routes

app.use(
  "/api/products",
  productRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use(
  "/api/reorders",
  reorderRoutes
);


app.use(
  "/api/notifications",
  notificationRoutes
);


app.use(
  "/api/auth",
  authRoutes
);



// Serve React Frontend

const distPath = path.join(
  __dirname,
  "../../frontend/dist"
);


console.log(
  "React dist exists:",
  fs.existsSync(distPath)
);


console.log(
  "React index exists:",
  fs.existsSync(
    path.join(distPath,"index.html")
  )
);



app.use(
  express.static(distPath)
);



// React Router support

app.get(
  "*",
  (req,res)=>{

    res.sendFile(
      path.join(
        distPath,
        "index.html"
      )
    );

  }
);


module.exports = app;