import express, { type Request, type Response } from "express";

import { PrismaClient, type Post } from "@prisma/client";

import cors from "cors";

/* Config database */
const prisma = new PrismaClient();

const app = express();
const port = 8080;
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
};

app.post("/posts", cors(corsOptions), async (req: Request, res: Response) => {
  try {
    const { title, content, authorName, authorEmail }: Omit<Post, "id"> = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorName,
        authorEmail,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while trying to create the post");
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Api running");
});

app.get("/posts", cors(corsOptions), async (req: Request, res: Response) => {
  //get all posts
  try {
    const posts = await prisma.post.findMany();
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while trying to get the posts");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
