import express, { type Request, type Response } from "express";

import { PrismaClient, type Post } from "@prisma/client";

/* Config database */
const prisma = new PrismaClient();

const app = express();
const port = 8080;
app.use(express.json());

app.post("/blog", (req: Request, res: Response) => {
  try {
    const { title, content, authorName, authorEmail }: Omit<Post, "id"> = req.body;
    const post = prisma.post.create({
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

app.get("/blog", (req: Request, res: Response) => {
  //get all posts
  try {
    const posts = prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while trying to get the posts");
  }
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
