import { queryAllByAltText } from "@testing-library/react";
import React, { useState, Fragment, useEffect } from "react";
import  Qcodes from './langinput';
import axios from "axios";


const QuestionLanguages=(Props)=>{

    let [codesdata,setcodesdata]=useState({});
    let [LanguageList,setLanguageList]=useState([]);
    let saveqdata=(data,language,id)=>
    {

    const newFormData = { ...codesdata };
    newFormData[language] = data;

    setcodesdata(newFormData);
    // console.log("codesdata data :     ",codesdata);
        Props.data(newFormData);

    }
    useEffect(()=>
    {
        axios.get("http://localhost:3005/api/getlanguages").then((res)=>{setLanguageList(res.data)});
        

    },[])


    return(
        //query
        <div>
        
        {LanguageList.map((list)=>(
            <div >
            <br/>
            <h6> <b>Enter Code details for {list.name}</b></h6>
         <Qcodes  language={list.name} languagedata={saveqdata} id={list.id}/> 
         </div>
            
                    
        ))}
                    
        </div>

    )
}

export default QuestionLanguages;