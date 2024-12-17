import http from 'http';
import {parse} from 'url';
const hostname = '127.0.0.1';
const port = 3000;

let posts = [
  {id: 1, title: 'Hello World'},
  {id: 2, title: 'Hello Again World'},
];

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const {pathname} = parsedUrl;

  // Handle request methods and paths
  if (req.method == 'GET' && pathname === '/posts') {
    // Read data from server
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(posts));
  } else if (req.method === 'POST' && pathname === '/posts') {
    // Send data to server
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
      const newPost = JSON.parse(body);
      newPost.id = posts.length + 1; // Assign a new ID
      posts.push(newPost);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(newPost));
    });
  } else if (req.method === 'DELETE' && pathname.startsWith('/posts/')) {
    // Delete data
    const id = parseInt(pathname.split('/')[2]);
    const index = posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      posts.splice(index, 1); // Remove the post
      res.writeHead(204); // No content
      res.end();
    } else {
      // Test error response for deleting a non-existing resource
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: 'Post not found'}));
    }
  } else if (req.method === 'PUT' && pathname.startsWith('/posts/')) {
    // Modify something
    const id = parseInt(pathname.split('/')[2]);
    const index = posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const updatedPost = JSON.parse(body);
        posts[index] = {id, ...updatedPost}; // Update the post
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(posts[index]));
      });
    } else {
      // Test error response for modifying a non-existing resource
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: 'Post not found'}));
    }
  } else {
    // Send 404 response for non-existing resources
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: 'Resource not found'}));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
