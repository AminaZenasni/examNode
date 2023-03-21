const express = require('express')
const session = require("express-session")
const router = express.Router();
const bodyParser = require('body-parser')
let Tasks = []

router.use(session({
    secret: 'amina', 
    resave: false,
    saveUninitialized: true
  }))

router.use(bodyParser.json())
router.post('/', (req, res) => {

    const newUser = req.body

    //check if the Tasks fields are missing
    if (newUser.task == null ) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    
    //check if the username exist already
    const findExist = Tasks.find(user => user.task === newUser.task)
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }
    
    //add the new user data to the Tasks array
    Tasks.push(newUser)

    req.session.Tasks = Tasks
    
    res.send({success: true, msg: 'User data added successfully', data: newUser})

})

router.delete('/:task', (req, res) => {
    const task = req.params.task
  
    // Récupérer les données utilisateur à partir de la session
    const Tasks = req.session.Tasks || []
  
    // Filtrer les utilisateurs en supprimant l'utilisateur correspondant
    const filteredTasks = Tasks.filter(user => user.task !== task)
  
    // Vérifier si l'utilisateur existe
    if (filteredTasks.length === Tasks.length) {
      return res.status(409).send({ error: true, msg: 'username does not exist' })
    }
  
    // Mettre à jour les données utilisateur dans la session
    req.session.Tasks = filteredTasks
  
    res.send({ success: true, msg: 'User removed successfully' })
  })

router.get('/', (req, res) => {
    const Tasks = req.session.Tasks || []
    res.send(Tasks)
  })

router.delete('/session', (req, res) => {
//
  })
module.exports=router

