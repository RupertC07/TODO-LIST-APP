
const express = require('express')


const route = express.Router()

const connection = require('../dbconfig')

route.post ('/addTask', (req, res) => {

    const { task } =  req.body

    const query = `INSERT INTO task_tbl (task) VALUES(?)`
    
    connection.query(query, [task], (err, results) => 
    {
        if (err) 
        {
            res.status(500).send({

                Message  : false

            })
            console.log(err)
            return
            
        }
        else 
        {
            res.status(200).send({

                Message  : true

            })
        }
    })



})

route.post('/deleteTask', (req, res) => {


    const { id } = req.body

    const query = `UPDATE task_tbl SET is_hidden=1 WHERE id=? `
    
    connection.query (query, [id], (err)=> 
    {
        if (err) {

            console.log(err)
            res.status(500).send({

                Message : false

            })
            
        }
        else 
        {

            res.status(200).send({

                Message : true

            })

        }
    })


})

route.post("/updateTask" , (req, res)=> {

    const { id, newTask } = req.body

    const query = `UPDATE task_tbl SET task=? WHERE  id=?`

    connection.query(query,[newTask,id], (err) => {
        if (err) {

            console.log(err)
            res.status(500).send({

                Message : false

            })
            
        }
        else 
        {

            res.status(200).send({

                Message : true

            })

        }
    })
})

route.post("/checkTask" , (req, res)=> {

    const { id, is_checked} = req.body

    let query = `UPDATE task_tbl SET is_checked=1 WHERE  id=?`

    if (is_checked ==1)
    {
        query = `UPDATE task_tbl SET is_checked=0 WHERE  id=?`


    }

    connection.query(query,[id], (err) => {
        if (err) {

            console.log(err)
            res.status(500).send({

                Message : false

            })
            
        }
        else 
        {

            res.status(200).send({

                Message : true

            })

        }
    })
})


route.post("/getTask" , (req, res)=> {

    

    const query = `SELECT * FROM task_tbl WHERE is_hidden=0`

    connection.query(query, (err, result) => {
        if (err) {

            console.log(err)
            res.status(500).send({

                Message : "ERROR IN FETCHING"

            })
            
        }
        else 
        {

            


           res.json({
            data: result
           })

        }
    })
})




module.exports = route