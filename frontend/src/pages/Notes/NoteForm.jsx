import { useState } from "react"

export default function NoteForm(){
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(title);
        console.log(content);
        setTitle("");
        setContent("");
    }
    // console.log(content);
    return(
        <div className="flex flex-row w-[70%] border-2">
            <h2>NoteForm</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title
                </label>
                <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <label htmlFor="content">
                    Content
                </label>
                <input type="text" name="content" value={content} onChange={(e)=>setContent(e.target.value)} />
                <button type="submit">Add Note</button>

            </form>
            
        </div>
    )
}