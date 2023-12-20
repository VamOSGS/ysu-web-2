import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { User } from './models.js';
import { hashPassword, isPasswordValid } from './services/hash.js';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Could not fetch users', error });
  }
});

app.post('/user', async (req, res) => {
  // user creation get from req body
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: 'Please provide username, password and email',
      });
    }
    console.log('req.body', req.body);
    const pwd = await hashPassword(password);
    const user = await User.create({
      username,
      password: pwd,
      email,
    });

    res.json({ user, message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Could not create user', error });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: 'Please provide username and password',
      });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const validPassword = await user.isPasswordValid(password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    res.json({ user, message: 'User logged in successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Could not create user', error });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: 'Please provide username and password',
        error: true,
      });
    }

    const users = JSON.parse(fs.readFileSync('fake-db.json'));
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
        error: true,
      });
    }

    const validPassword = await isPasswordValid(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid password',
        error: true,
      });
    }

    res.json({ user, message: 'Logged in successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Could not log in user', error: true });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: 'Please provide username, password and email',
        error: true,
      });
    }

    const users = JSON.parse(fs.readFileSync('fake-db.json'));
    const existingUser = users.find(
      (user) => user.username === username || user.email === email
    );
    if (existingUser) {
      return res.status(400).json({
        message: 'Username or email already exists',
        error: true,
      });
    }

    const pwd = await hashPassword(password);

    const newUser = {
      username,
      password: pwd,
      email,
    };
    users.push(newUser);
    fs.writeFileSync('fake-db.json', JSON.stringify(users));

    res.json({ user: newUser, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Could not register user', error: true });
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let onlineUsers = 0;

io.on('connection', (socket) => {
  console.log('a user connected');
  onlineUsers++;
  io.emit('onlineUsersCount', onlineUsers);

  socket.on('disconnect', () => {
    onlineUsers--;
    io.emit('onlineUsersCount', onlineUsers);
  });
});

server.listen(port, () => {
  console.log(
    `Server running on \n http://127.0.0.1:${port}/ \n http://localhost:${port}/ `
  );
});
