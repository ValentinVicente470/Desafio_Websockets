const express = require('express')

const { Server: HttpServer } = require('http')

const { Server: IOServer } = require('socket.io')

const Contenedor2 = require('./contenedor2')

const Contenedor = require('./contenedor')
const app = express()

const httpServer = new HttpServer(app)

const io = new IOServer(httpServer)

app.set ('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', async (req, res) => {
    res.render('index.ejs', {root: __dirname})
})

io.on('connection', async (sockets) => {

    sockets.emit('productos', await Contenedor.getall())

    console.log('Un cliente se ha conectado!: ' + sockets.id)

    sockets.emit('messages', await Contenedor2.getall2())

    sockets.on('new-producto', async data => {

        await Contenedor.save(data)

        console.log(data)

        io.sockets.emit('productos', await Contenedor.getall())
    })

    sockets.on('new-message', async dato => {

        await Contenedor2.save(dato)

        console.log(dato)

        io.sockets.emit('messages', await Contenedor2.getall2())
    })
})


// preguntar por que no funciona con el io.on de aca abajo.--------------------------------------------------




//      io.on('connection', async (sockets) => {

//          sockets.emit ('productos', await Contenedor.getall())

//          sockets.emit ('messages', await Contenedor2.getall2())

//          console.log ('Un cliente se ha conectado!')

//          sockets.on ('new-producto', async data => {

//               await Contenedor.save (data)

//              io.sockets.emit ('productos', await Contenedor.getall())
//          })
   
//          sockets.on ('new-message', async dato => {

//              await Contenedor2.save (dato)

//              io.sockets.emit ('messages', await Contenedor2.getall2())
//          })    
//      }) 



//-----------------------------------------------------------------------------------------------------------

const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))