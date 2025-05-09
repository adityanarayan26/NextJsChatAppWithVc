import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create a custom HTTP server for handling Next.js and Socket.IO
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl); // Let Next.js handle all non-WebSocket requests
  });

  // Attach Socket.IO to the custom server
  const io = new Server(server, {
    cors: {
      origin: '*', // Replace '*' with your front-end origin in production for security
      methods: ['GET', 'POST']
    }
  });

  // Handle client connection to Socket.IO
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`); // Log socket ID

    // Optional: emit socket ID to client (for client-side tracking)
    socket.emit('connected', { socketId: socket.id });

    // Example: Handle custom events here
    // socket.on('message', (data) => {
    //   console.log(`Message from ${socket.id}:`, data);
    //   io.emit('message', { socketId: socket.id, ...data }); // broadcast with sender ID
    // });

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});