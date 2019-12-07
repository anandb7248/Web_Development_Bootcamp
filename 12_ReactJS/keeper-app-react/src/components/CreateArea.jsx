import React, {useState} from "react";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom'

function CreateArea(props) {

  const [isExpanded, setExpanded] = useState(false);
  const [noteObj, updateNoteObj] = useState({
    title: "",
    content: ""
  });

  function handleInput(event){
    const {name, value} = event.target;

    updateNoteObj(prevValue => {
      return {
        ... prevValue,
        [name] : value
      }
    });
  }

  function expand(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={(event) => {
          props.addClicked(noteObj);
          event.preventDefault();
        }}>
        {isExpanded ? 
          <input 
            onChange={handleInput} 
            name="title" 
            placeholder="Title" 
            value={noteObj.title}
            is/> : null}
        <textarea 
          onChange={handleInput} 
          name="content" 
          placeholder="Take a note..." 
          value={noteObj.content} 
          onClick={expand}
          rows={isExpanded ? "3" : "1"} />
        <Zoom in={isExpanded ? true : false}><Fab><NoteAddIcon /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
