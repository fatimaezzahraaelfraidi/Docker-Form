const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb://mongodb-container:27017/formulaire-db';
const dbName = 'mydb';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB server:', err);
    process.exit(1);
  }

  console.log('Connected successfully to MongoDB server');
  const db = client.db(dbName);

  app.locals.db = db; // make the database instance available to the app
  app.listen(port, () => {
    console.log(`Form server listening at http://localhost:${port}`);
  });
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html>
  <head>
    <title>My Form</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous">
    <!-- Custom CSS -->
    <style>
      body {
        background-color: #f5f5f5;
      }
      form {
        margin: 50px auto;
        max-width: 500px;
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      label {
        font-weight: bold;
      }
      button[type="submit"] {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <form method="POST" action="/submit">
      <div class="form-group">
        <label for="firstname">First name:</label>
        <input type="text" class="form-control" id="firstname" name="firstname">
      </div>
      <div class="form-group">
        <label for="lastname">Last name:</label>
        <input type="text" class="form-control" id="lastname" name="lastname">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" name="email">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <!-- Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQ
<!DOCTYPE html>
<html>
  <head>
    <title>My Form</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous">
    <!-- Custom CSS -->
    <style>
      body {
        background-color: #f5f5f5;
      }
      form {
        margin: 50px auto;
        max-width: 500px;
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      label {
        font-weight: bold;
      }
      button[type="submit"] {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <form method="POST" action="/submit">
      <div class="form-group">
        <label for="firstname">First name:</label>
        <input type="text" class="form-control" id="firstname" name="firstname">
      </div>
      <div class="form-group">
        <label for="lastname">Last name:</label>
        <input type="text" class="form-control" id="lastname" name="lastname">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" name="email">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <!-- Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQ
      BkhRcbYAy3lV0p8Oy/RYbThp+xhFf33pNI5aU9"
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNS"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"></script>
  </body>
</html>


  `);
});

app.post('/submit', (req, res) => {
  const { firstname,lastname, email } = req.body;
  const { db } = req.app.locals;
  const collection = db.collection('compte');
  collection.insertOne({ firstname,lastname, email }, (err) => {
    if (err) {
      console.error('Failed to insert submission:', err);
      res.status(500).send('Failed to submit form');
    } else {
      console.log('Form submitted:', { firstname,lastname, email });
      res.send('Form submitted!');
    }
  });
});

