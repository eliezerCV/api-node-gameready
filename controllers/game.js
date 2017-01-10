'use strict'

const Game = require('../models/game')
var punct = 0;
// GET
function getGames(req,res){
    console.log('GET /api/games')

    if(req.query.userAuthor){
        let user = req.query.userAuthor
        Game.find({userAuthor:user}, (err, games) => {
            if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
            if(!games) return res.status(404).send({mensaje:"No existe la coleccion"})

            res.status(200).jsonp(games)
        })
    }else if(req.query.reg){
        let reg = req.query.reg

        console.log('peticion por '+req.query.reg)
        Game.find({title:{$regex: new RegExp(reg, "i") }}, (err, games) => {
            if (err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
            //si no encuentra

            res.status(200).jsonp(games)
            console.log(games)
        })
    }else if(req.query.category){
        let cat = req.query.category
        Game.find({category:cat}, (err, games) => {
            if (err) return status(500).send({mensaje:`Error al realizar la peticion ${err}`})

            res.status(200).jsonp(games)
        })
    }else if(req.query.aproved){
        let ap = req.query.aproved
        Game.find({aproved:ap}, (err, games) => {
            if (err) return status(500).send({mensaje:`Error al realizar la peticion ${err}`})

            res.status(200).jsonp(games)
        })
    }
    else{
        Game.find({}, (err, games) => {
            if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
            if(!games) return res.status(404).send({mensaje:"No existe la coleccion"})

            res.status(200).jsonp(games)
        })
    }

}

//Get/:id
function getGameById(req,res){
    
    console.log(req.params.idGame)
    console.log('/Get/:idGame')

    let id = req.params.idGame
    Game.findById(id, (err, game) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion por id ${err}`})
        if(!game) return res.status(404).send({mensaje:"El juego no existe"})
        else{
            res.status(200).jsonp(game)
        }
    })
}

//POST
function saveGame(req,res) {
    console.log('POST /api/games')
    console.log(req.body)

    let game = new Game()
    game.title = req.body.title
    game.genre = req.body.genre
    game.platforms = req.body.platforms
    game.languages = req.body.languages
    game.players = req.body.players
    game.description = req.body.description
    game.gameMode = req.body.gameMode
    game.userAuthor = req.body.userAuthor
    game.category = req.body.category

    game.save((err,gamer)=>{
        if(err) res.status(500).jsonp({mensaje:"Error al guardar en la BD",err})
        else {
            res.status(200).jsonp(gamer)
        }
    })
}

function updatePunctuation(req,res){
    console.log('/PUT api/games')
    console.log(req.body)

    var id = req.params.id
    var newp = req.body.punctuation
   

    Game.findById(id, (err, game) => {
        if(err) return
       
        punct = parseInt(game.punctuation) + parseInt(newp)
        console.log(punct," sumado")
        if(punct > 50){
            Game.findByIdAndUpdate(id,{aproved:true}, (err, up) => {})
        }
        
    })
   console.log(punct," actualizado")
   Game.update({_id:id},{punctuation:punct.toString()},(err,updated) => {
        if(err) res.status(500).send({mensaje:`Error al actualizar la puntuacion ${err}`})
        
        res.status(200).jsonp(updated)
    })
    
}

module.exports = {
    getGames,
    getGameById,
    saveGame,
    updatePunctuation
}