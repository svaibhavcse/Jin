import React, { useState } from "react";
import "../styles/timesheet.css";
import { IoArrowForward } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect } from "react";

function Timesheet() {
  const [drop, setDrop] = useState(false);
  const [tasks, setTasks] = useState([{ id: 1, projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0,tot: 0}]);
  const [sales, setSales] = useState([{ id: 1, projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 ,tot:0}]);
  const [sum,setSum] = useState([{mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }])
  let total =0;
  const handleAddTask = (type) => {
    if (type === 'BAU') {
      const newId = tasks[tasks.length - 1].id + 1;
      setTasks([...tasks, { id: newId, projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0,tot: 0}]);
    } else if (type === 'Sales') {
      const newId = sales[sales.length - 1].id + 1;
      setSales([...sales, { id: newId, projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 ,tot:0}]);
    }
  };

  const handleRemoveTask = (type, id) => {
    if (type === 'BAU') {
      setTasks(tasks.filter(task => task.id !== id));
    } else if (type === 'Sales') {
      setSales(sales.filter(sale => sale.id !== id));
    }
  };

  const handleInputChange = (type, id, field, value) => {
    
    if (type === 'BAU') {
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
         let innerUpdate= { ...task, [field]: value };
         if(field.length ===3){
          innerUpdate = {...innerUpdate,["tot"]:parseInt(task.tot)+parseInt(value)} 
         }
         return innerUpdate
        }
        return task;
      });
      setTasks(updatedTasks);
    } else if (type === 'Sales') {
      const updatedSales = sales.map(sale => {
        if (sale.id === id) {
          let innersale= { ...sale, [field]: value };
          if(field.length === 3){
            innersale ={...innersale,["tot"]:sale.tot + parseInt(value)}
          }
          return innersale;
        }
        return sale;
      });
      setSales(updatedSales);
    }
  };
  useEffect(() => {
    const updatedSum = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    tasks.forEach(task => {
      Object.keys(updatedSum).forEach(day => {
        updatedSum[day] += parseInt(task[day]) || 0;
      });
    });
    sales.forEach(sale => {
      Object.keys(updatedSum).forEach(day => {
        updatedSum[day] += parseInt(sale[day]) || 0;
      });
    });
    setSum(updatedSum);
    for (const day in sum) {
      total += sum[day];
      console.log(total);
    }
  },[tasks,sales]);
  
  //submit
  const handelSubmit=()=>{
    //console.log(tasks,sales) 
    console.log(sum); 
  }

  return (
    <div className="timesheet">
      <div className="MainHead">
        <h1 style={{ margin: "0px" }}>Timesheet</h1>
        <div className="MainHeadDetails">
          <h5 style={{ flexGrow: 1 }}>Total hour: 0.0</h5>
          <p style={{ flexGrow: 0 }}> &lt; 29 Jan 2024 - 04 Feb 2024&gt;</p>
        </div>
      </div>

      <div className="MainBands">
        <p style={{ flexGrow: 1 }}>Allocation Extension</p>
        {!drop && <p> <IoIosArrowDown className="drop" onClick={() => { setDrop(true) }} /></p>}
        {drop && <p><IoIosArrowUp className="drop" onClick={() => { setDrop(false) }} /></p>}
      </div>

      {drop &&
        <table className="MainTable">
          <thead>
            <tr className="TableHead">
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Project end date</th>
              <th>Allocation end date</th>
              <th>Allocation extension</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No available options</td>
            </tr>
          </tbody>
        </table>
      }

      <div className="MainBands">
        <p style={{ margin: "0px" }}>Timesheet</p>
      </div>

      <table className="MainTable">
        <thead>
          <tr className="TableHead">
            <th>Project Type</th>
            <th>Project Name</th>
            <th>Task</th>
            <th>Comment</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              {index === 0 ? (
                <>
                  <td className="projectType">BAU Activity</td>
                </>
              ) : <td></td>}
              <td>
                <select onChange={(e) => handleInputChange('BAU', task.id, 'projectName', e.target.value)}>
                  <option value="">Project</option>
                  <option> Project_1</option>
                </select>
              </td>
              <td>
                <select onChange={(e) => handleInputChange('BAU', task.id, 'task', e.target.value)}>
                  <option value="">Task</option>
                </select>
              </td>
              <td>
                <input className="comments" onChange={(e) => handleInputChange('BAU', task.id, 'comment', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('BAU', task.id, 'mon', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('BAU', task.id, 'tue', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('BAU', task.id, 'wed', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('BAU', task.id, 'thu', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('BAU', task.id, 'fri', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('BAU', task.id, 'sat', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('BAU', task.id, 'sun', e.target.value)} />
              </td>
              <td>
                <p>{task.tot}</p>
              </td>
              <td className="plus" onClick={() => handleAddTask('BAU')}> +</td>
              {index !== 0 && <td className="plus" onClick={() => handleRemoveTask('BAU', task.id)}> - </td>}
            </tr>
          ))}

          {sales.map((sale, index) => (
            <tr key={sale.id}>
              {index === 0 ? (
                <>
                  <td className="projectType">Sales Activity</td>
                </>
              ) : <td></td>}
              <td>
                <select onChange={(e) => handleInputChange('Sales', sale.id, 'projectName', e.target.value)}>
                  <option value="">Project</option>
                </select>
              </td>
              <td>
                <select onChange={(e) => handleInputChange('Sales', sale.id, 'task', e.target.value)}>
                  <option value="">Task</option>
                </select>
              </td>
              <td>
                <input className="comments" onChange={(e) => handleInputChange('Sales', sale.id, 'comment', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('Sales', sale.id, 'mon', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('Sales', sale.id, 'tue', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('Sales', sale.id, 'wed', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('Sales', sale.id, 'thu', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('Sales', sale.id, 'fri', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('Sales', sale.id, 'sat', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" max="24" onChange={(e) => handleInputChange('Sales', sale.id, 'sun', e.target.value)} />
              </td>
              <td>
                <p>{sale.tot}</p>
              </td>
              <td className="plus" onClick={() => handleAddTask('Sales')}> +</td>
              {index !== 0 && <td className="plus" onClick={() => handleRemoveTask('Sales', sale.id)}> - </td>}
            </tr>
          ))}
          
          <tr>
            <td className="projectType">Total Hours</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{sum.mon}</td>
            <td>{sum.tue}</td>
            <td>{sum.wed}</td>
            <td>{sum.thu}</td>
            <td>{sum.fri}</td>
            <td>{sum.sat}</td>
            <td>{sum.sun}</td>
            <td>{total}</td>
            <td></td>
          </tr>
          <tr>
            <td className="projectType">Machine Hours</td>
          </tr>
          <tr>
            <td className="projectType">Break Hours</td>
          </tr>
        </tbody>
      </table>

      <div className="MainSubmission">
        <button className="submit" onClick={()=>{handelSubmit()}}>SUBMIT <IoArrowForward /></button>
        <button className="save">SAVE</button>
      </div>
    </div>
  );
}

export default Timesheet;