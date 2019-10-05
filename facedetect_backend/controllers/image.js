const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '66f226836933402296d63724e252a962'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('Error with the API'))	
}

module.exports = {
	handleApiCall: handleApiCall
}