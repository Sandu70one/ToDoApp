import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
    },

    username:{
        type:String,
        min:5,
        max:32,
        require:true
    },
    password:{
        type:String
    },
    email:{
        type: String,
        require: true
    },
    todos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    },]
    ,
    date:{
        type:Date,
        default: Date.now
    },
})

export default mongoose.model("User", userSchema);