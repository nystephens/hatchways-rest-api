const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const { response } = require('express');

// here is where we set up our express server connection to the local port
const app = express();
const port = process.env.PORT || 3001

// use body parser to parse the json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Nate's Hatchways Assessment");
});

app.get('/api/ping', (req, res) => {
    request('https://api.hatchways.io/assessment/blog/posts?tag=tech', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.statusCode);
            res.json({ "success": true, "Response Status Code": response.statusCode });
        } else
            console.log(error);
    });
});


app.get('/api/posts/:tag', (req, res) => {
    const { tag } = req.params;
    request(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            // returns raw response data
            res.send(body);

            // returns undefined..
            // var postsObj = body
            // var posts = postsObj.posts
            // console.log(posts);

            // returns all characters individually within an array..
            // const dataObject = response.body;
            // const valuesOnly = Object.values(dataObject);
            // console.log(valuesOnly);

            // returns an object around body object so the opposite of what we want..
            // let unwrap = ({ posts }) => ({ posts });
            // let picked = unwrap({ posts});
            // console.log(picked)
        } else
            console.log(error);
    });
});




// TRY TO GET MULTIPLE TAGS (PERHAPS USING res.json like above?  see /ping)
app.get('/api/posts/:tags', (req, res) => {
    const { tags } = req.params;
    request(`https://api.hatchways.io/assessment/blog/posts?tag=${tags}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else
            console.log(error);
    });
});


// TRYING TO GET MULTIPLE PARAMETERS WORKING BUT IT SEEMS TO ONLY BE ACCEPTING FIRST PARAM
app.get('/api/posts/:tag/:sortBy', (req, res) => {
    const tag = req.params.tag;
    const sortBy = req.params.sortBy;

    request(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else
            console.log(error);
    });
});

app.get('/api/posts/:tag/:direction', (req, res) => {
    const tag = req.params.tag;
    const direction = req.params.direction;
    console.log(direction)

    request(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}&direction=${direction}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else
            console.log(error);
    });
});

// app.use('/', require('./routes/tags'));



app.listen(port, () => {
    // remember: backticks means you can insert variables with the ${syntax}
    console.log(`server is live on port: ${port}`);
});