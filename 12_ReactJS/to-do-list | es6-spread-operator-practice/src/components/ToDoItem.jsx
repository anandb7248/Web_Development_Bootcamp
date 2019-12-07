import React, {useState} from "react"

// function TodoItem(props) {

//     const [itemStyle, setItemStyle] = useState({textDecoration : 'none'});

//     function handleClick(){
//         setItemStyle(prevValue => {
//             if (prevValue.textDecoration === 'none'){
//                 return {textDecoration : 'line-through'}
//             }else{
//                 return {textDecoration : 'none'}
//             }
//         });
//     }

//     return <li onClick={handleClick} style={itemStyle}>{props.text}</li>
// }

function TodoItem(props) {

    const [isDone, setIsDone] = useState(false);

    function handleClick(){
        setIsDone(prevValue => {
            return !prevValue;
        });
    }

    return <li onClick={handleClick} style={{ textDecoration : isDone ? 'line-through' : 'none'}}>{props.text}</li>
}

export default TodoItem;