import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/media', express.static(path.join(__dirname, 'media')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

let mediaItems = [
  {
    media_id: 9632,
    filename: 'ffd8.jpg',
    filesize: 887574,
    title: 'Favorite drink',
    description: '',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
  },
  {
    media_id: 9590,
    filename: '60ac.jpg',
    filesize: 23829,
    title: 'Basement',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

let users = [
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
];

app.get('../', (req, res) => {
  res.render('index', {
    title: 'My Express REST API',
    description: 'This is a simple REST API created with Express and Pug.',
  });
});

app.get('/api/media', (req, res) => {
  res.status(200).json(mediaItems);
});

app.get('/api/media/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const media = mediaItems.find((item) => item.media_id === id);
  if (!media) return res.status(404).json({error: 'Media item not found'});
  res.status(200).json(media);
});

app.post('/api/media', express.json(), (req, res) => {
  const {filename, title, description, user_id, media_type} = req.body;

  if (!filename || !title || !user_id || !media_type) {
    return res.status(400).json({error: 'Missing required fields'});
  }

  const newMedia = {
    media_id: mediaItems.length + 1,
    filename,
    filesize: Math.floor(Math.random() * 1000000),
    title,
    description: description || '',
    user_id,
    media_type,
    created_at: new Date().toISOString(),
  };

  mediaItems.push(newMedia);
  res.status(201).json(newMedia);
});

app.put('/api/media/:id', express.json(), (req, res) => {
  const id = parseInt(req.params.id);
  const {title, description} = req.body;

  const media = mediaItems.find((item) => item.media_id === id);
  if (!media) return res.status(404).json({error: 'Media item not found'});

  media.title = title || media.title;
  media.description = description || media.description;

  res.status(200).json(media);
});

app.delete('/api/media/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mediaItems.findIndex((item) => item.media_id === id);

  if (index === -1)
    return res.status(404).json({error: 'Media item not found'});

  mediaItems.splice(index, 1);
  res.status(204).send();
});

app.get('/api/user', (req, res) => res.status(200).json(users));

app.get('/api/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.user_id === id);
  if (!user) return res.status(404).json({error: 'User not found'});
  res.status(200).json(user);
});

app.post('/api/user', express.json(), (req, res) => {
  const {username, password, email, user_level_id} = req.body;

  if (!username || !password || !email || !user_level_id) {
    return res.status(400).json({error: 'Missing required fields'});
  }

  const newUser = {
    user_id: users.length + 1,
    username,
    password: '********',
    email,
    user_level_id,
    created_at: new Date().toISOString(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/user/:id', express.json(), (req, res) => {
  const id = parseInt(req.params.id);
  const {username, email} = req.body;

  const user = users.find((user) => user.user_id === id);
  if (!user) return res.status(404).json({error: 'User not found'});

  user.username = username || user.username;
  user.email = email || user.email;

  res.status(200).json(user);
});

app.delete('/api/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.user_id === id);

  if (index === -1) return res.status(404).json({error: 'User not found'});

  users.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`),
);
