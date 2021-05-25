import React, { useState } from 'react';

import './App.css';
import Todo from './Todo';

function App() {

  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');

  const addPost = (event) => {
    event.preventDefault();

   
    setPosts([...posts, input]);
    setInput('');
}
const clearPost = (event) => {
    event.preventDefault();
    setInput('');
}

const deleteItem = (id) =>{
  setPosts((posts) => {
    return posts.filter((_, index) => {
        return index !== id;
    });
  });
}

  return (
    <div className="App">
    <form className='inputForm'>
      <input className='form__input' value={input} 
        onChange={(e) => setInput(e.target.value)} />
        <div className='buttons'>
          <button className='form__button'  type='submit'  onClick={addPost}>ADD+</button>
          <button className='form__button' onClick={clearPost}>CLEAR</button>
      </div>
  </form>

<ul>
    {posts.map((post, index) => 
    (
        <Todo 
        key={index}
        id={index} 
        post={post}
        onSelect={deleteItem} />
    ))}
</ul>
    </div>
  );
}

export default App;
