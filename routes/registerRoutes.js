const express=require('express')
const app=express()
const router=express.Router();
const bodyParser=require("body-parser")
const path=require('path')
const bcrypt=require('bcrypt')
const User=require('../schemas/UserSchema')





app.set("view engine","pug")
app.set("views","views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,"public")))


router.get("/",(req,res,next)=>{

  res.status(200).render("register")
})

router.post("/", async (req,res,next)=>{
  var firstname=req.body.firstname.trim();
  var lastname=req.body.lastname.trim();
  var username=req.body.username.trim();
  var email=req.body.email.trim();
  var password=req.body.password;


  var payload =req.body;

  if(firstname && lastname && username && email && password)
  {
      var user= await User.findOne({
        $or: [
          {username: username},
          {email: email}
        ]
      })
       .catch((error)=>{

         payload.errorMessage="Something Went wrong Try to Register again"
          res.status(200).render("register",payload)
       })

       if(user===null)
       {
         var data=req.body;

        data.password=await bcrypt.hash(password,10)

         User.create(data)
         .then((user)=>
       {
          req.session.user=user;
          return res.redirect("/")
       })

       }
       else {
           if(email===user.email)
           {
                    payload.errorMessage="Account with Email is already in use"
           }
           else {
                   payload.errorMessage="Something Went wrong Try to Register again"
           }
             res.status(200).render("register",payload)
       }
  }
  else {
       payload.errorMessage="Make sure each field have a valid value"
        res.status(200).render("register",payload)
  }

})


module.exports=router;
