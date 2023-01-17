const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Ladies and Gentlemen, this is ur own chat bot!');
});

app.post('/chat', (req, res) => {
    
});


app.listen(port, () => {
    console.log(`Bot is running on port ${port}`);
}
);