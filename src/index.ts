import express, { json, Router } from 'express'
import { createConnection } from 'typeorm'
import glob from 'glob'
import errorHendler from './errors/hendler'

createConnection().then(connection => {

    const server = express()
    server.use(json())
    
    glob('./src/routes/**/*.ts', {
        absolute: true
    }, (error, files) => {
        for (const file of files) {
            const route = require(file).default as Router
            server.use(route)
        }
    })
    
    server.use(errorHendler)
    server.listen(5000, () => {
        console.log('Server star in port: 5000')
    })
}).catch(error => {
    console.log(error)
})
