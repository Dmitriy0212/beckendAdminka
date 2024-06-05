
import express from 'express';
const app = express();
import { addTitle } from './mods/addtitle.js';
import { addData } from './mods/home.js';
import multer from 'multer';
import cors from 'cors';
import { dirname } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('pabl'));

app.use(cors());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // your path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage })

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';


app.post('/author/add', upload.single('file'), (req, res) => {
    addTitle(req.body)
    res.send('Файл успешно загружен!');
});
app.get('/author/posts/blog', (req, res) => {
    res.json(addData());
});

app.get('/author/posts/blog/download/img', (req, res) => {
    const getRecipePhoto = (req) => {
        try {
            const filePath = path.join(__dirname + "/uploadsstatik", String(req.query.id) +".png");
            res.sendFile(filePath);
        } catch (e) {
            console.log(e)
        }
    }
    getRecipePhoto(req)
});

app.get('/author/posts/blog/links/img', (req, res) => {
    const getRecipePhoto = (req) => {
        try {
            const filePath = path.join(__dirname + "/staticimg", String(req.query.id) + ".svg");
            res.sendFile(filePath);
        } catch (e) {
            console.log(e)
        }
    }
    getRecipePhoto(req)
});

app.listen(PORT, () => {
    console.log(`Server run: http://${HOST}:${PORT}`)
});