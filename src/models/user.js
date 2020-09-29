const { Schema, model} = require('mongoose');

const userSchema = new Schema({
  /*first_name:{
    type: String,
    trim:true,
    required: false,
    max:32
  },*/
  /*last_name:{
    type:String,
    trim: true,
    required:false,
    unique:true,
    lowercase:true
  },*/
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:10  
  },
  displayName:{
    type:String
  }
  /*resetlink:{
    data: String,
    default:''
  } */
},{
    timestamps:true
})

module.exports = model('user', userSchema);



