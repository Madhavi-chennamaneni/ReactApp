import React, { useState, useEffect } from "react";
import './editorPage.css'
import CodeEditor from './CodeEditor'
import OutputWindow from './OutputWindow'
import Problems from './Problems'
import Split from 'react-split'
import { Link, useNavigate } from 'react-router-dom'

const CodeSection = () => {

  /* Problems */
  const [problems, setProblems] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://62eb6772705264f263d7de1e.mockapi.io/problems")
      .then((res) => res.json())
      .then((json) => {
        setProblems(json);
      })
  }, [])




  /* Output */
  var [UserCode, SetUserCode] = useState(``);
  var [CodeOutput, SetCodeOutput] = useState(``);

  function codeChange(NewValue) {
    SetUserCode(NewValue)
  }

  function getOutput() {
    var code = UserCode.split("\n")

    for (var i = 0; i < code.length; i++) {
      code[i] = code[i].trim();
      code[i] = code[i].replace('//start here', "")
    }
    code = code.join('');
    return code;
  }

  const handleSubmit = () => {
    if (index < problems.length - 1) {
      setIndex(index + 1)
    } else {
      alert('You have done all exercise, Thank you')
      navigate('/home')
    }

  }

  /* useEffect(()=>{
   const onBlur = ()=>{
     alert('You have gone to another tab');
     
      handleSubmit()
   }
   window.addEventListener('blur',onBlur);
   return ()=>window.removeEventListener('blur',onBlur)
 
  },[]) */
  
  return (
    <div>
      {problems.map(data => ((index === problems.indexOf(data) && index <= problems.length - 1) ? (
        <>
          <Split direction="horizontal" className='main-container'>
            <Problems data={data} />
            <CodeEditor UserCode={UserCode} SetUserCode={SetUserCode} codeChange={codeChange} getOutput={getOutput} handleSubmit={handleSubmit} data={data} />
            <OutputWindow CodeOutput={CodeOutput} problems={problems} handleSubmit={handleSubmit} data={data}  />
          </Split>
        </>
      ) : null))}
    </div>
  )
}

export default CodeSection;