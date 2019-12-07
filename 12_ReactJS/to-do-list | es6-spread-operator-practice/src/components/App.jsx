import React, {useState} from "react";
import ToDoItem from "./ToDoItem.jsx"
import TodoItem from "./ToDoItem.jsx";

function App() {
  const [inputText, updateInputText] = useState("");
  const [tasks, updateTasks] = useState([]);

  function handleTextUpdate(event){
    const text = event.target.value;

    updateInputText(text);
  }

  function handleClick() {
    updateTasks([...tasks, inputText]);

    updateInputText("");
  }

  function deleteItem(id){
    console.log(id);

    updateTasks(prevItems => {
      return prevItems.filter((item, index) => 
        {return index != id});
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleTextUpdate} type="text" value={inputText}/>
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {tasks.map((item, index) => <TodoItem key={index} id={index} text={item} onClicked={deleteItem}></TodoItem>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
