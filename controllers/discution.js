'use strict'

const Discution = require('../models/discution')

// GET
function getDiscutions(req,res){
    console.log("/GET /api/discutions")
    Discution.find({}, (err, discutions) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
        if(!discutions) return res.status(404).send({mensaje:"No existe la coleccion"})

        res.status(200).jsonp(discutions)
        console.log(discutions)
    })
}

//Get/:id
function getDiscutionById(req,res){
    let id = req.params.id

    Discution.findById(id, (err, discution) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
        if(!discution) return res.status(404).send({mensaje:"La discucion no existe"})

        res.status(200).jsonp(discution)
    })
}

//POST
function saveDiscution(req,res) {
    console.log('POST /api/discution')
    console.log(req.body)

    let discution = new Discution()
    discution.title = req.body.title
    discution.author = req.body.author
    discution.description = req.body.description

    discution.save((err,discution)=>{
        if(err) res.status(500).send({mensaje:"Error al guardar en la BD",err})

        else res.status(200).jsonp(discution)

    })
}

module.exports = {
    getDiscutions,
    getDiscutionById,
    saveDiscution
}