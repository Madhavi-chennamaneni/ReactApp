import React, { useState, Fragment } from "react";

const Questioncodes = (Props) => {
  var [Languagesdata,setLanguagesData]=useState({language:Props.id});
  

  const handleAddFormChange = (event) => {
 
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...Languagesdata };
    newFormData[fieldName] = fieldValue;

    setLanguagesData(newFormData);

    Props.languagedata(Languagesdata,Props.language,Props.id);

    // console.log("language data :     ",Languagesdata);


  };

  return (
    <div className="app-container" >
      
        <div >
        <input 
          type="text"
          name="boilerplatecode"
          required="required"
          placeholder="Enter Boilerplate code..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="executioncode"
          required="required"
          placeholder="Enter an Execution code..."
          onChange={handleAddFormChange}
        />
          <input
          type="text"
          name="solutioncode"
          required="required"
          placeholder="Enter an our solution code..."
          onChange={handleAddFormChange}
        />
      </div>
    </div>
  );
};

export default Questioncodes;
