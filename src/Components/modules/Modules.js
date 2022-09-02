import React, { useState, Fragment,useEffect } from "react";
import axios from "axios";


let Modules=(Props)=>{
    let[ModuleData,setModuleData]=useState([]);

    useEffect(()=>
    {
        axios.get("http://localhost:3005/api/getmodules").then((res)=>{setModuleData(res.data)});
        console.log(ModuleData);

    },[])


    const [value, setValue] = useState(1);

    const handleChange = (event) => {
      setValue(event.target.value);

      Props.setvalue(event);
    };
    
    return(

<>
<div>
      <label>
      &nbsp;&nbsp;&nbsp; Select Modules: &nbsp;&nbsp;&nbsp;
        <select name="module" value={value} onChange={handleChange}>
          {ModuleData.map((option) => (
            <option key={Date.now() + Math.random()}value={parseInt(option.id)}>{option.name}</option>
          ))}
        </select>
      </label>
    </div>


</>

    )
}

export default Modules;