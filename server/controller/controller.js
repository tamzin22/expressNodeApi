var Userdb = require('../model/model');

//create and save new user

exports.create=(req,res)=>{
    //validate requests
    if(!req.body){
        res.status(400).send({message:'Content can not be Empty'});
        return;
    }

    //create new instance of the user

    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    });
    
    //save new user

    user
      .save(user)
      .then(data =>{
          res.redirect('/')
      })
      .catch(err=>{
          res.status(500).send({
              message:err.message || 'An error occured while creating new user'
          });
      });
    
}

//retrieve and return all users & single user

exports.find=(req,res)=>{
    if(req.query.param){
        const id = req.query.id;

        Userdb.findById(id)
         .then(data=>{
             if(!data){
                 res.status(404).send({message:`User with ${id} not found`});
             }else{
                 res.send(data)
             }
         })
         .catch(err=>{
             res.send(500).send({message:"Error retrieving user"+id})
         })

    }else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err || 'Error occurred while retrieving user info'})
    })
   
} 

}

//update user by userId

exports.update=(req,res)=>{
  if(!req.body){
      return res
        .status(400)
        .send({message:'data to update can not be empty'});
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data=>{
      if(!data){
          res.status(404).send({message:`Can not update the user with ${id}, The user may not exist`})
      }
      else{
          res.send(data);
      }
  })
  .catch(err=>{
      res.status(500).send({message:err || 'Error updating user information'});
  })
}

//delete user by userId

exports.delete=(req,res)=>{
    const id = req.params.id;

    Userdb.findOneAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Can not delete the user with ${id}, The user may not exist`})
        }else{
            res.send({
                message:"User deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:err || 'Error deleting user record'});
    });
}