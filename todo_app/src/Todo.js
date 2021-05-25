import React from 'react'

function Todo(props) {
    return (
        <div>
            <li>{props.post} <button onClick={() => { props.onSelect(props.id )}}>X</button></li>
        </div>
    )
}

export default Todo;
