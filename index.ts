import express, { type Request, type Response } from "express";

import { PrismaClient } from "@prisma/client";

/* Config database */
const prisma = new PrismaClient();

const app = express();
const port = 8080;
app.use(express.json());

app.post("/blog", (req: Request, res: Response) => {
  //create new blog post
});

app.get("/", (req: Request, res: Response) => {
  res.send("Api running");
});

app.get("/blog", (req: Request, res: Response) => {
  //get all posts
});

app.get("/blog/:post", (req: Request, res: Response) => {
  //get a specific post
});

app.delete("/blog/:post", (req: Request, res: Response) => {
  //delete a post
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
