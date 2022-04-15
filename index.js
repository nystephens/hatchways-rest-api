const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');

// here is where we set up our express server connection to the local port
const app = express();
const port = process.env.PORT || 3001

// use body parser to parse the json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Nate's Hatchways Assessment");
});

app.get('/api/posts', (req, res) => {
    request('https://api.hatchways.io/assessment/blog/posts?tag=tech', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else 
        
        console.log(error);
    });

});

// app.get('/api/ping', (req, res) => {
//     // console.log(res);
//     // res.json({ ok: true, ping });
// });



// these are possible routes we will use in the future

// app.use('/', require('./routes/tag'));
// app.use('/', require('./routes/ping'));
// app.use('/', require('./routes/posts'));


app.listen(port, () => {
    // remember: backticks means you can insert variables with the ${syntax}
    console.log(`server is live on port: ${port}`);
});