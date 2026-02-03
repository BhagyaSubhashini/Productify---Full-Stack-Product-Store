import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors( { origin: ENV.FRONTEND_URL } )); //enables CORS for frontend
app.use(clerkMiddleware()); //auth obj will be attached to req obj
app.use(express.json()); //parses JSON request bodies
app.use(express.urlencoded({ extended: true })); //parses form data like HTML forms


app.get("/", (req, res) => {

  res.json({ 
    message: "Welcome to Productify - Full Stack Product Store",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments"
    },
  });
});

app.listen(ENV.PORT, () => {
  console.log("Server is up and running on port", ENV.PORT);
});