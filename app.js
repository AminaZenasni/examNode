const express = require("express")

const TasksRouter =require("./routes/task.js")

const session = require("express-session")

const app = express()


const port =  3000
app.use(express.static("./public"))



 app.use(session({
    secret: 'amina',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      httpOnly: true
    }
  }))


app.use("/tasks",TasksRouter);

app.use(express.json())


app.use((req,res,next)=>{

    if(!req.session.count)
        req.session.count=1
    else
        req.session.count++
    console.log(req.session)
    next()

})
app.use((req,res)=>{
    res.status(404).json({message:"404 not found"})
})

app.listen(port,()=>{
    console.log("server started at localhost: " + port)
})