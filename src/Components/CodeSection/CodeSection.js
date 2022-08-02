import React, { useState, useEffect } from "react";
import CodeEditor from './CodeEditor'
import OutputWindow from './OutputWindow'
import Problems from './Problems'
import Split from 'react-split'
import { defaultProps } from "react-ace-editor";


 const CodeSection=()=> {

    var [UserCode, SetUserCode] = useState(``);
    var [CodeOutput, SetCodeOutput] = useState(``);

    function codeChange(NewValue) 
    {
      SetUserCode(NewValue)
    }

    function getOutput() 
    {
        var code = UserCode.split("\n")
        
        for (var i = 0; i < code.length; i++) 
        {
            code[i] = code[i].trim();
            code[i] = code[i].replace('//start here', "")
        }
        code = code.join('');
       return code;
    }

  return (
    <div>
        <Split direction="horizontal" className='main-container'>
            <Problems/> 
            <CodeEditor UserCode={UserCode} codeChange={codeChange} getOutput={getOutput}/> 
            <OutputWindow CodeOutput={CodeOutput}/>
        </Split>
    </div>
  )
}

export default CodeSection;