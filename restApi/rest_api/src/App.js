import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
  getData()
  }, []);

  async function getData() {
    await axios("https://my-json-server.typicode.com/typicode/demo/posts")
      .then((response) => {
        setData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
      }
      if (loading) return "Loading...";
      if (error) return "Error!";
   
    
    
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
  }


export default App;
