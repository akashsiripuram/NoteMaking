const mongoose=require("mongoose");

const NotesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Notes=mongoose.model("Notes",NotesSchema);

module.exports=Notes;