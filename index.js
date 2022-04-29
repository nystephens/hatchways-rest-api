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


// ACTUAL SINGLE TAG ENDPOINT
// app.get('/api/posts/:tag', (req, res) => {
//     const { tag } = req.params;
//     request(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             // returns raw response data
//             let data = JSON.parse(body);
//             res.send(data.posts);
//         } else
//             console.log(error);      
//     });
// });


// TESTING SORT METHOD
app.get('/api/posts/:tag', (req, res) => {
    let arr = [
        {
            firstName: "Steve",
            lastName: "Hancock",
            score: 90
        },
        {
            firstName: "Lynette",
            lastName: "Jorgenson",
            score: 100
        },
        {
            firstName: "Andrew",
            lastName: "Wilson",
            score: 71
        },
        {
            firstName: "Annika",
            lastName: "Turner",
            score: 82
        }
    ];

    // sort by lastname
    // arr.sort(function(a, b) {
    //     if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) 
    //     return -1;

    //     if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) 
    //     return 1;

    //     if (a.lastName.toLowerCase() = b.lastName.toLowerCase()) 
    //     return 0;
    // });


    // sort by score
    arr.sort(function(a, b) {
        return a.score - b.score;
    });

    res.send(arr);
});




// TRY TO GET MULTIPLE TAGS (PERHAPS USING res.json like above?  see /ping)
app.get('/api/posts/:tags', (req, res) => {
    const { tag } = req.params;

    // collect all tag params into an array
    var tags = [tag];

    // for each tag in the tags array do a search for that data
    const searchTags = function (tags) {
        console.log(tags)
    }

    searchTags(tags);

    // request(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         // returns raw response data
    //         let data = JSON.parse(body);
    //         res.send(data.posts);
    //     } else
    //         console.log(error);
    // });
});


// TRYING TO GET MULTIPLE PARAMETERS WORKING BUT IT SEEMS TO ONLY BE ACCEPTING FIRST PARAM
app.get('/api/posts/:tag/:sortBy', (req, res) => {
    const tag = req.params.tag;
    const sortBy = req.params.sortBy;

    request(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // returns raw response data
            let data = JSON.parse(body);
            res.send(data.posts);
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
            // returns raw response data
            let data = JSON.parse(body);
            res.send(data.posts);
        } else
            console.log(error);
    });
});

// app.use('/', require('./routes/tags'));



app.listen(port, () => {
    // remember: backticks means you can insert variables with the ${syntax}
    console.log(`server is live on port: ${port}`);
});