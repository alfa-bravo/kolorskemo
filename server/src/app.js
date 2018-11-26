const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const util = require('util');
var path = require('path');

const app = express();
// app.use(proxyMiddleware('/api', { target: 'http://localhost:8081/' } )) //any call on /api on 8080 (or we port you client server uses) will be redirected to 1080
app.use(morgan('combined'));
app.use(cors());

bodyParserOptions = {limit: "10MB"};
app.use(bodyParser.json(bodyParserOptions));

app.get('/api/posts', (req, res) => {
    res.send(
        [{
            title: "Hello World!",
            description: "Hi there! How are you?"
        }]
    )
})

//ex: http://localhost:8081/model?color1=000fff&color2=00000&color3=ffffff&color4=ff0000&color5=f0f0f0f0
app.get('/api/model', (req, res) => {
    // hex color can't contain # --> caused undefined
    var color1 = req.query.color1;
    var color2 = req.query.color2;
    var color3 = req.query.color3;
    var color4 = req.query.color4;
    var color5 = req.query.color5;

    // passing 5 color to a blackbox which return names learned from the model

    var exec = require('child_process').exec;

    exec('python src/python_machine_learning/model.py color1, color2, color3, color4, color5',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            console.log('error: ' + error);

            if (stdout !== null) {
                var output = stdout.replace('\n', "").replace('[', "").replace(']', "").replace(/'/g, "");
                output = output.split(", ");
                console.log(output)
                res.send({name_color: output});
            }
        }
    );
})

app.post('/api/colors', (req, res) => {
    var base64Img = req.body.image;
    if (base64Img != false) {
        base64Img = base64Img.split(';base64,').pop();

        fs.writeFile('image.png', base64Img, {encoding: 'base64'}, function (err) {
            console.log('File created!\n');
        });

        res.send({
            success: true,
            message: 'Image saved successfully!\n'
        });
    } else {
        res.send({
            success: false,
            message: 'No Image Yet!\n'
        });
    }
})

app.get('/api/colors', (req, res) => {
    var color_query = [];
    var number_of_colors = 5;
    const exec = util.promisify(require('child_process').exec);
    (async () => {

        const {stdout, stderr} = await exec('ek --number-of-colors 5 image.png');


        color_query = JSON.parse(stdout);
        console.log(color_query);

        res.send({color_query});

        // Checking if an image has been processed
        if (color_query !== undefined && color_query.length != 0) {
            // Clear Image after processing
            fs.exists('image.png', function (exists) {
                if (exists) {
                    fs.unlink('image.png', (err) => {
                        if (err) throw err;
                        console.log('Temp image was deleted');
                    });
                }
            });

            color_query = []; // Clear data after processing.
        }
    })();
})

//want: /scheme?color1:000fff&color2:111111&....

app.get('/api/scheme', (req, res) => {

    var colors = [];

    var count = 0;
    for (var key in req.query) {

        colors[count] = hex_to_rgb(req.query[key]);
        count++;
    }

    for (var i in colors) {
        console.log(colors[i]);
    }

    var input = {};
    input["colors"] = colors;

    var input_stdin = JSON.stringify(input).replace(" ", "").replace(/"/g, "\\\"");


    exec = util.promisify(require('child_process').exec);

    (async () => {

        const {stdout, stderr} = await exec('python src/python_machine_learning/predict.py src/python_machine_learning/bdic01/categories.json src/python_machine_learning/bdic01/model.h5 <<< ' + input_stdin);

        //color_query = JSON.parse(stdout);
        console.log(stdout);

        res.send(stdout);


    })();
})

app.listen(process.env.PORT || 8081);

function hex_to_rgb(hex) {

    if (hex.charAt(0) === '#') {
        hex = hex.substr(1);
    }

    var values = hex.split(''),
        r,
        g,
        b;

    if (hex.length === 2) {
        r = parseInt(values[0].toString() + values[1].toString(), 16) / 255;
        g = r;
        b = r;
    } else if (hex.length === 3) {
        r = parseInt(values[0].toString() + values[0].toString(), 16) / 255;
        g = parseInt(values[1].toString() + values[1].toString(), 16) / 255;
        b = parseInt(values[2].toString() + values[2].toString(), 16) / 255;
    } else if (hex.length === 6) {
        r = parseInt(values[0].toString() + values[1].toString(), 16) / 255;
        g = parseInt(values[2].toString() + values[3].toString(), 16) / 255;
        b = parseInt(values[4].toString() + values[5].toString(), 16) / 255;
    } else {
        return false;
    }
    return [r, g, b];
}