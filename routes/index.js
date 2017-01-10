'use strict'

const jwt = require('jsonwebtoken')
const express = require('express')
const api = express.Router()
const productCtrl = require('../controllers/product')       // el controlador de products
const userCtrl = require('../controllers/user')
const gameCtrl = require('../controllers/game')
const commentCtrl = require('../controllers/comment')
const discutionCtrl = require('../controllers/discution')

/* las rutas de las peticiones del cliente al controlador product*/
api.get('/products', productCtrl.getProducts)
api.get('/products/:productId', productCtrl.getProduct)
api.post('/products', function(req,res){productCtrl.saveProduct})
api.put('/products/:productId', productCtrl.updateProduct)
api.delete('/products/:productId',productCtrl.deleteProduct)

/* las rutas de las peticiones del cliente al controlador de user */
api.get('/users', userCtrl.getUsers)
api.get('/users/:name', userCtrl.getUserByName)
api.post('/users', userCtrl.saveUser)
api.put('/users/:userId', userCtrl.updateUser)


/* para simular la autenticacion con tokens */
api.post('/auth', userCtrl.authUser)

/*las rutas de las peticiones del cliente al controlador game */
api.get('/games', gameCtrl.getGames)
api.get('/games/:idGame', gameCtrl.getGameById)
api.post('/games', gameCtrl.saveGame)
api.put('/games/:id', gameCtrl.updatePunctuation)


/* las rutas de las peticiones a los comentarios */
api.get('/comments', commentCtrl.getComments)
api.get('/comments/:id', commentCtrl.getCommentsById)
api.post('/comments', commentCtrl.saveComment)

// las rutas para las discuciones
api.get('/discutions', discutionCtrl.getDiscutions)
api.get('/discutions/:id', discutionCtrl.getDiscutionById)
api.post('/discutions', discutionCtrl.saveDiscution)

// midleware
// api.use((req, res, next) => {
//     var token = req.body.token || req.query.token || req.headers['x-access-token']

//     if(token){
//         jwt.verify(token, "MetallicaEsLaLuz", (err, decoded) => {
//             if(err) return res.status(404).send({success:false, mensaje:"Fallo al autenticar el token"})
//             else{
//                 req.decoded = decoded
//                 next()
//             }
//         })

//     } else {
//         return res.status(403).send({ 
//             success: false, 
//             message: 'No token provided.' 
//         });
//     }
// })

module.exports = api