const http = require('http')
const axios = require("axios")
const { v4: uuidv4 } = require('uuid')
const fecha = require('moment')
const _ = require('lodash')
const chalk = require('chalk')

const datosUsuarios = []

http
    .createServer((req, res) => {
        if (req.url.includes('/buscar')) {
            // 4. Por cada consulta realizada al servidor, se debe devolver al cliente una lista con los
            // datos de todos los usuarios registrados usando Lodash para recorrer el arreglo de
            // usuarios.

            axios
                .get('https://randomuser.me/api/') // 1. El registro de los usuarios debe hacerse con la API Random User usando axios para consultar la data.
                .then((data) => {
                    data.data.results.forEach(e => {
                        datosUsuarios.push(e)
                    })
                    let contador = 1
                    // 2. Cada usuario registrado debe tener un campo id único generado por el paquete UUID.
                    // 3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro obtenida por medio del paquete Moment.

                    _.forEach(datosUsuarios, (e) => {
                        // 5. En cada consulta también se debe imprimir por la consola del servidor la misma lista
                        // de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.
                        console.log(chalk.blue.bgWhite.bold(`${contador}. Nombre: ${e.name.first} Apellido: ${e.name.last} - ID: ${uuidv4().slice(0, 6)} Timestamp: ${fecha().format('MMMM Do YYYY, h:mm:ss a')}`))
                        
                        res.write(`${contador}. Nombre: ${e.name.first} Apellido: ${e.name.last} - ID: ${uuidv4().slice(0, 6)} Timestamp: ${fecha().format('MMMM Do YYYY, h:mm:ss a')}\n`)

                        contador++ // El contador es utlizado para listar con un numero cada impresion, tanto en el console.log como en el documento con el res.write
                    })
                    console.log('--------------------------') // Separador para visualizar mejor la consola
                    res.end()
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    })
    .listen(8080, () => console.log('Escuchando el puerto 8080'))

// 6. El servidor debe ser levantado con el comando Nodemon