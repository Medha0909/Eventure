const mongoose = require('mongoose');
const {Schema}=mongoose;


const userSchema = new Schema({
  eventTitle:{
    type:String,
    required:true
  },
    name:{
        type:String,
        required:true
      },
  email:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  payment:{
    type:Boolean,
    default:false
  }
   });
const Participant = mongoose.model('participant',userSchema);
module.exports = Participant;