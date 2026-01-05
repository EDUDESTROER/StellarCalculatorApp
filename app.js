import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set the view engine has ejs
app.set('view engine', 'ejs');

//define the views directory
app.set('views', path.join(__dirname, 'views'));

//Middleware for read JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//simple roat
app.get('/', (req, res)=>{

    res.render('index');

});

app.listen(PORT, ()=>{

    console.log(`Server running in http://localhost:${PORT}`);

});