'use strict'

const Comment = require('../models/comment')

// GET
function getComments(req,res){
    console.log("GET /api/comments")
    console.log(req.query.author)
    if(req.query.author){
        let name = req.query.author
        console.log(name+'por nombre')
        Comment.find({author: name}, (err, comments) => {
            if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
            if(!comments) return res.status(404).send({mensaje:"No existe la coleccion"})

            res.status(200).jsonp(comments)
            console.log(comments+' comentarios')
        })
    } 
}
function getCommentsById(req,res){
    let id = req.params.id
        console.log(id+ 'por id')
        Comment.find({idPublication: id}, (err, comments) => {
            if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
            if(!comments) return res.status(404).send({mensaje:"No se encontraron comentarios"})

            res.status(200).jsonp(comments)
            
        })
}

//POST
function saveComment(req,res) {
    console.log('POST /api/comments')
    console.log(req.body)

    let comment = new Comment()
    comment.idPublication = req.body.idPublication
    comment.author = req.body.author
    comment.content = req.body.content

    comment.save((err,commentSave)=>{
        if(err) res.status(500).send({mensaje:"Error al guardar en la BD",err})
        else res.status(200).send({comment:commentSave})
    })
}

module.exports = {
    getComments,
    getCommentsById,
    saveComment
}