import React, { useState, Fragment,useEffect } from "react";
import axios from "axios";


let Complexity=(Props)=>{
    let[ComplexityData,setComplexityData]=useState([]);

    useEffect(()=>
    {
        axios.get("http://localhost:3005/api/getcomplexity").then((res)=>{setComplexityData(res.data)});
        console.log(ComplexityData);

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
        Select Complexity: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <select name="complexity" value={value} onChange={handleChange}>
          {ComplexityData.map((option) => (
            <option key={Date.now() + Math.random()} value={parseInt(option.id)}>{option.name}</option>
          ))}
        </select>
      </label>
    </div>


</>

    )
}

export default Complexity;