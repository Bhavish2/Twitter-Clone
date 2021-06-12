const express=require('express')
const app=express()
const middleware=require('./middleware')
const path=require('path')
const bodyParser=require("body-parser")
const mongoose=require('./database')
const session=require("express-session")

const port=3000;

app.set("view engine","pug")
app.set("views","views")

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"public")))

app.use(session({
    secret: "bbq",
    resave: true,
    saveUninitialized:false
}))

// Routes
const loginRoute=require('./routes/loginRoutes')
const registerRoute=require('./routes/registerRoutes')
const logoutRoute=require('./routes/logout')
const postRoute=require('./routes/postRoutes')
const profileRoute=require('./routes/profileRoutes')

// APi Routes
const postsApiRoute=require('./routes/api/posts');
const usersApiRoute=require('./routes/api/users');



app.use("/login",loginRoute)
app.use("/register",registerRoute)
app.use("/logout",logoutRoute)
app.use("/api/posts",postsApiRoute)
app.use("/api/users",usersApiRoute)
app.use("/posts",middleware.requireLogin,postRoute)
app.use("/profile",middleware.requireLogin,profileRoute)

app.get("/",middleware.requireLogin,(req,res,next)=>{
  var payload={
      pageTitle:"Home",
      UserLoggedin:req.session.user,
      UserLoggedinJs:JSON.stringify(req.session.user),
  }
  res.status(200).render("home",payload)
})

const server=app.listen(port,()=>console.log("Server Listening"))
