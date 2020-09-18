const { Schema, model} = require('mongoose');

const employeeSchema = new Schema({
  nombre:{
    type: String,
    trim:true,
    required: true,
    max:32
  },
  apellidos:{
    type:String,
    trim: true,
    required:true,
    unique:true,
    lowercase:true
  },
  titulo:{
    type:String,
    required:true,
    trim: true,
    max:32,
  },
  celular:{
   type:Number,
   trim:tru,
   required:true
  },
  Estado:{
    type:Boolean,
    required:true
  },
  correo:{
    type:String,
    trim:true,
    required:true
  },
  cumpleaños:{
    type:Date,
    required:true
  },
  departamento:{
     type:String,
     trim:true,
     required:true
  }
},{
    timestamps:true
})

module.exports = model('employee', employeeSchema);