var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');


// Multer set up for file upload and storage handling
// Closely followed https://www.bacancytechnology.com/blog/file-upload-using-multer-with-nodejs-and-express and 
// Multer docs on Github
const fileStorage = multer.memoryStorage();

const upload = multer({storage: fileStorage});


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let apiOutputScaffold = {name: req.file.originalname, type: req.file.mimetype, size: req.file.size};
  res.send(apiOutputScaffold);
})




const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
