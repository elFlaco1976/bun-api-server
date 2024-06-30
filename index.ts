const server = Bun.serve({
  port: 8080,
  fetch(req) {
    return new Response("Hello, World!");
  },
});

console.log(`Server is running on port ${server.port}`);
