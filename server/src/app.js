const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// app.post('/', (req, res) => {
// 	
// })

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.listen(process.env.PORT || 8081)

//ex: http://localhost:8081/model?color1=000fff&color2=00000&color3=ffffff&color4=ff0000&color5=f0f0f0f0
app.get('/model', (req, res) => {
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

            if(stdout !== null){
                res.send({name_color: stdout.replace('\n',"")})
            }}
    );
})

