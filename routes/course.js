let nomeRecebido = null
let emailRecebido = null
const db = require("../db/db")
module.exports = {

    // getCourse: (req, res) => {
    //     db.query("SELECT * FROM courses", (err, result)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log(result)
    //             res.send(result[0].title)
    //         }
    //     })
    // },


    getCourse: (req, res) => {
        req.session.teste = { id: 'qualquer' }
        res.send("sessão gerada")
    }

}