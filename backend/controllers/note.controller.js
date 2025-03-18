const Notes = require("../models/Notes");

const createNote = async (req, res) => {
  try {
    const noteData = req.body; 
    noteData.createdBy = req.user.id;
    const newnote = new Notes(noteData);
    await newnote.save();
    return res.status(200).json({
      success: true,
      message: "Note created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const getNotes = async (req,res) => {
    try {
        const {id} = req.user
        const notes = await Notes.find({createdBy:id})
        if(notes) {
            return res.status(201).json({
                success:true,
                notes:notes,
                message:"notes retrieved successsfuly"
            })
        }
        else {
            return res.status(201).json({
                success:true,
                message:"no notes"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage:"error"
        })
    }
}
const updateNotes= async(req,res)=>{
  const {id}=req.params;
  const {title,content}=req.body;
  try{

    const notes=await Notes.findById(id);
    console.log(notes);
    if(!notes){
      return res.status(404).json({
        success:false,
        message:"note not found"
      })
    }
    
    notes.title=title;
    notes.content=content;
    await notes.save();
    return res.status(200).json({
      success:true,
      message:"note updated successfully"
    })
     

  }catch(err){
    return res.status(500).json({
      success:false,
      message:"server error"
    })
  }
}
const deleteNote=async(req,res)=>{
  const {id}=req.params;
  try{
    const notes=await Notes.findById(id);
    console.log(notes);
    if(!notes){
      return res.status(404).json({
        success:false,
        message:"note not found"
      })
    }
    await Notes.deleteOne({_id:id});
    return res.status(200).json({
      success:true,
      message:"note deleted successfully"
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"server error"
    })
  }
}
module.exports = {
  createNote,
  getNotes,
  updateNotes,
  deleteNote,
};
