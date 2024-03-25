const express = require('express');
const path = require('path');
const cors = require('cors');

const port = 6000;
const app = express();

app.use(express.json());
app.use(cors());
  
app.use(express.static(path.join(__dirname, 'public')));


app.get('/test', (req, res) => {
    res.send('Hello, this is a test route!');
});


app.listen(port, () => {
    console.log(`Main server listening at http://localhost:${port}`);
});
