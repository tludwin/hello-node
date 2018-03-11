import express = require('express')
import http = require('http')
import fileHandler = require('./file-handler')
import fileInfoHandler = require('./file-info-handler')

const port = process.env.PORT || 3000
var counter = 0

var fileInfoHandlerInstance = new fileInfoHandler.FileInfoHandler
var fileHandlerInstance = new fileHandler.FileHandler

var app = express()
app.set('port', port)
app.get('/', (req, res) => {
    res.send('Dobriden')
})
app.get('/1', (req, res) => {
    res.send('eins')
})

app.get('/json', (req, res) => {
    var localCounter = ++counter
    console.log('New nr ' + localCounter + ' request is coming:\n')
    console.log(req.method + ' ' + req.url)

    //res.writeHead(200, { 'Content-Type' : 'application/json' })

    res.end(JSON.stringify({ error: null, data: { "request_no": localCounter } }))
})

app.get('/v1/fileInfoHandler/:filename', fileInfoHandlerInstance.getFileName)
app.get('/v1/fileHandler/add/:x/:y', fileHandlerInstance.add)

app.get('/user/:userid', (req, res) => {
    res.end("You asked for user id: " + req.params.userid)
})
app.get('', (req,res) => {
    
})
app.post('/stream', (req, res) => {
    var localCounter = ++counter
    console.log('New nr ' + localCounter + ' request is coming:\n')
    console.log(req.method + ' ' + req.url)

    var json_data = ''

    req.on("readable", () => {
        console.log("readable")
        var d = req.read()
        if (typeof d === "string") {
            json_data += d
        } else if (typeof d === "object" && d instanceof Buffer) {
            json_data += d.toString()
        }
    })

    req.on("end", () => {
        console.log("end")
        var output = ''
        var json
        if (!json_data || json_data.length == 0) {
            output = 'No data'
        } else {
            try {
                json = JSON.parse(json_data)
            } catch (e) {

            }
            if (!json) {
                output = 'Invalid JSON'
            } else {
                output = 'Received valid JSON: ' + json_data
            }
        }

        res.end(output)
    })
})

http.createServer(app)
    .listen(app.get('port'), () => {
        console.log('Listening on ' + app.get('port'))
        console.log('Examples:')
        console.log('curl -X GET http://localhost:3000/v1/fileInfoHandler/')
        console.log('curl -X GET http://localhost:3000/v1/fileHandler/add/')
    })