import React, { useState } from 'react'
import "./App.css"
function App() {
  let [todolist, settodolist]=useState([])
  let saveToDoList=(event)=>{
    let toname=event.target.toname.value;
    if(!todolist.includes(toname)){
      let FinalToDoList = [...todolist, toname]
      settodolist(FinalToDoList)
    }
    else{
      alert("ToDo Name Already Exist...");
    }

    event.preventDefault();
  }

  let list=todolist.map((value, index)=>{
    return(
      <ToDoListItems value={value} key={index} indexNumber={index} todolist={todolist} settodolist={settodolist} />
    )
  })
  return (
    <div className='App'>
      <h1>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name='toname'/>
        <button>Save</button>
      </form>
      <div className='OuterDiv'>
        <ul>
          {list}
        </ul>
      </div>
    </div>

  )
}

export default App;

function ToDoListItems({value,indexNumber,todolist,settodolist}){
  let [status, setStatus]= useState(false)
  let deleteRow=()=>{
    let finalData= todolist.filter((v,i)=>i!=indexNumber)
    settodolist(finalData)
  }
  let checkStatus=()=>{
    setStatus(!status)
  }
  return(
    <li className={(status)? 'completetodo': ''} onClick={checkStatus}> {indexNumber+1} {value} <span onClick={deleteRow}>&times;</span></li>
  )
}