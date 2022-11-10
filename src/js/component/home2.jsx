import React, { useEffect, useState } from "react";
import InputBar from "./inputBar.jsx";

const Home = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    getList();
  }, []);
  // visits end point for the get method. End point serves list of Todos
  //catch response and apply the .json() method - changes string to JS object
  // take response(the list) and setting the state
  // catch used to display "error" message
  
  
  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/shakir")
      .then((response) => response.json())
      .then((result) => setList(result))
      .catch((error) => console.log(error));

      
  };

  // fetch uses get method by default, specified 'PUT' method
  // specifies content type w/ header b/c using 'PUT', sending info.
  // sending newList, JSON.stringify changes object to text so it can travel through internet
  const addTask = (item) => {
    const newList = [...list, item];
    fetch("https://assets.breatheco.de/apis/fake/todos/user/shakir", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newList),
    })
      .then((response) => response.json())
      .then((result) => getList())
      .catch((error) => console.log(error));
      
  };
  //handle
	const handleSubmit = (event) => {
		event.preventDefault()
		if (input != ""){
			let addTask = {
				id: Math.floor(Math.random() * 1000) ,
				text: input,
				completed: false,
			}
			setTasks([...tasks, addTask])
			setInput("")
		}}

  const deleteTask = (item) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/shakir", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((result) => getList())
      .catch((error) => console.log(error));
  };

  // map reads array, for every item in array, there will be a value and index
  return (
    <div className="text-center">
      <h1 className="todo">Daily Goals</h1>
      <div className="list-card">

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask({ label: inputValue, done: false });
              setInputValue("");
            }
          }}
        />
        </form>

      <div className="list-item">
        
          {list.map((task, i) => {
            return (
              <div className="todo" key={i}>
               <p> {task.label}
                <button
                  className="button"
                  onClick={() => {
                    const newList = list.filter((item, index) => index !== i);
                    deleteTask(newList);
                  }}
                >
                  {" "}
                  &#10060;
                </button>
                </p> 
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
};

export default Home;
