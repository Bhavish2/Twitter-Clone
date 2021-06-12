const mongoose=require("mongoose")
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useUnifiedTopology',true)

class Database{
  constructor()
  {
    this.connect();
  }

  connect()
  {
    mongoose.connect("mongodb+srv://Bhavishya:watchdogs23@socialcluster.od9sn.mongodb.net/Social?retryWrites=true&w=majority")
    .then(()=>{
      console.log("Database connection was successful")
    })
    .catch((err)=>{
      console.log("Database connection Failed"+err)
    })
  }
}

module.exports=new Database();
