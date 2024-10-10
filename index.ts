import express, { type Request, type Response } from "express";

import { PrismaClient, type Post } from "@prisma/client";

import cors from "cors";

/* Config database */
const prisma = new PrismaClient();

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

app.post("/posts", async (req: Request, res: Response) => {
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

app.get("/posts", async (req: Request, res: Response) => {
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

app.get("/posts/:id", async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while trying to get the post");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
