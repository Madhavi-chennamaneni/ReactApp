import React from "react";
import {BrowserRouter as Router,Routes,Route,useNavigate,} from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginPage from "./Components/LoginPage/LoginPage";
import Footer from "./Components/Footer/Footer";
import CodeSection from "./Components/CodeSection/CodeSection";
import Home from "./Components/Home/Home";
import QuestionsEntry from "./QuestionsEntry";
import Uploads from "./uploads";
import FeatureComp from "./Components/Featurecomponent";
import QuestionLanding from "./Components/QuestionBody";

function CandidateRoot(){
    return(

    <>
    <Header />
    <FeatureComp/>

    {/* <Routes>
            <Route path="/" element={<AdminRoot />} />
          </Routes> */}

    </>
    )

}


export default CandidateRoot
