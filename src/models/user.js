const { Schema, model} = require('mongoose');

const userSchema = new Schema({
  first_name:{
    type: String,
    trim:true,
    required: true,
    max:32
  },
  last_name:{
    type:String,
    trim: true,
    required:true,
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
    min:10,
  },
  /*resetlink:{
    data: String,
    default:''
  } */
},{
    timestamps:true
})

module.exports = model('User', userSchema);



