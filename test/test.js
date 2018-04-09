var app = require('express')();
var multer = require('multer');
var bodyparser = require('body-parser');
const multerConfig = {
    storage: multer.diskStorage({
        //Setup where the user's file will go
        destination: function (req, file, next) {
            next(null, __dirname + '/uploads');
        },

        //Then give the file a unique name
        filename: function (req, file, next) {            
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),
    //A means of ensuring only images are uploaded. 
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if (image) {
            console.log('photo uploaded');
            next(null, true);
        } else {
            console.log("file not supported");
            //TODO:  A better message response to user on failure.
            return next();
        }
    }
};

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html') })
app.post('/upload', multer(multerConfig).single('image') ,(req, res) => {
    console.log(req.file);
})

app.listen(4000, console.log('Server at 4000'))