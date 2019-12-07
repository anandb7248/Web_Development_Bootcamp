import React, {useState} from "react";

function CreateArea(props) {

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

  return (
    <div>
      <form onSubmit={(event) => {
          props.addClicked(noteObj);
          event.preventDefault();
        }}>
        <input onChange={handleInput} name="title" placeholder="Title" value={noteObj.title}/>
        <textarea onChange={handleInput} name="content" placeholder="Take a note..." value={noteObj.content} rows="3" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
