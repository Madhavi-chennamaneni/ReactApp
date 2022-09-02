import React,{useState} from "react";
import AdminHeader from "./AdminHeader";
import {BrowserRouter as Router,Routes,Route,useNavigate,} from "react-router-dom";
import FeatureComp from "./Featurecomponent";
import QuestionsEntry from "../QuestionsEntry";
import Uploads from "../uploads";
import QuestionLanding from "./QuestionBody";
// import QuestionLanding from "../QuestionBody";


function AdminRoot(){
const[ShowQuestions,setShowQuestions]=useState(false);
const[UploadCSV,setUploadCSV]=useState(false);

let diaplayQuestions=()=>{
    setShowQuestions(!ShowQuestions);
    setUploadCSV(false);
}

let diaplayCSVUpload=()=>{
    setUploadCSV(!UploadCSV);
    setShowQuestions(false);
    
}


    return(

    <>
    <AdminHeader/>
    <FeatureComp  showquestions={diaplayQuestions} uploadQuestionCSV={diaplayCSVUpload}/>
    {/* <QuestionLanding/> */}
        {ShowQuestions&&<QuestionsEntry showquestions={diaplayQuestions}/>}
        {UploadCSV&&<Uploads uploadQuestionCSV={diaplayCSVUpload}/>}


    </>
    )

}


export default AdminRoot
