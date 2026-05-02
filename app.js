const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// Las rutas se agregan en el Issue #3app.get('/', (req, res) => res.send('LuBo funcionando'));app.listen(3000, () => console.log('http://localhost:3000'));