const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const image = require('./controllers/image');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl:true
	}
});
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{res.json('');});
app.post('/signin', (req,res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db, bcrypt)});
app.post('/imageUrl', (req,res) => {image.handleApiCall(req, res)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
});