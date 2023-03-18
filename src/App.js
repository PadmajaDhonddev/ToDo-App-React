//import logo from './logo.svg';
//import './App.css';
import { useState,useEffect } from "react";
import List from "./components/List/list";

const App=() =>{
  const [work,setWork] = useState(false);
  const [todoItem,setTodoItem] = useState(["Feed the dog","water the plants","Do shopping"]);
  const [workItem,setWorkItem] = useState(["Learn DotNet","Learn React","Review PR"]);
  const [input,setInput] = useState("");
  const [apiData,setApiData] = useState(null)

  const submit=(e)=>{
    e.preventDefault();
    work?setWorkItem([...workItem,input]):setTodoItem([...todoItem,input]);
    setInput("");
    console.log("button works")
  }

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/todos").then((resp)=>resp.json()).then(data=>{
      console.log(data)  
      setApiData(data.slice(0,10))
    });
    // console.log(apiData)
  },[])


  return (
    <div >
      <div>
        <label>Choose Item Type</label>
        <input type={"checkbox"} onChange={e=>setWork(e.target.checked)} value={work} />
      </div>
      <div>
        {
          work?
          (
            <>
            <h1>Work Items</h1>
          <ul>
            <List items={workItem} />
          </ul>
            </>
          )
          :
          (
            <>
            <h1>Todo Items</h1>
              <ul>
                <List items={todoItem} />
              </ul>
            </>
          )
        }
      </div>
      <div>
        <label>Enter your todo Item</label>
        <input type="text" onChange={e=>setInput(e.target.value)} value={input}/>
        <button onClick={e=>submit(e)}>Add</button>
      </div>
    </div>
  );
}

export default App;
