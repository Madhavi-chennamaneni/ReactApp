import React, { useState } from 'react'
import './question.css'
import axios from 'axios';

function QuestionsEntry() {

    let [UserInput, setuserinp] = useState({ language: "java", 
                                        difficulty: "easy",exampleio:"",problemstatement:"",
                                        testcaseio:"",oursolution:"",executioncode:"",
                                        maxtime:"",boilerplate:""});

    let [Errors, setErrors] = useState({ language: "java", 
                                        difficulty: "easy",exampleio:"",problemstatement:"",
                                        testcaseio:"",oursolution:"",executioncode:"",
                                        maxtime:"",boilerplate:""});                                    


    function handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name + ":  " + value);

        if(name=="testcaseio")
        {
            if(!value.includes('\n'))
            {
               setErrors({ ...Errors, testcaseio: "Test case should contain atleast one line with break" , success:false});
            }else{
                setErrors({ ...Errors, testcaseio: "" , success:true});
            }
        }

        
        if(name=="maxtime")
        {
            if(isNaN(value))
            {
               setErrors({ ...Errors, maxtime: "Please enter only Numbers" , success:false});
            }else{
                setErrors({ ...Errors, maxtime: "" , success:true});
            }
        }


        setuserinp({ ...UserInput, [name]: value });
    }



    let handleSubmit = (event) => {

if( (UserInput.problemstatement=="") || 
    (UserInput.exampleio=="") || 
    (UserInput.testcaseio=="") || 
    (UserInput.oursolution=="") || 
    (UserInput.executioncode=="") ||
    (UserInput.maxtime=="") ||
    (UserInput.boilerplate=="") )
        {
            setuserinp({ ...UserInput, result: "Please enter all details" , success:true});
    
        }
        else{
         axios.post("http://localhost:3005/api/savequestion", JSON.stringify(UserInput),
         { headers: { 'Content-Type': 'text/plain' } })
         .then(res =>   {
            console.log("",res.data.body);
            setuserinp({ ...UserInput,result: res.data.body , success:true});
        
        })
         //.then((response)=>{alert(response.body)})
         .catch(error => {setuserinp({ ...UserInput,result: error.data.body, success:false})})
        }
    }

    return (
        <div>
            <h2 >Add Questions To Database</h2>
            {UserInput.success&&<p className='errors'>{UserInput.result}</p>}
            {!UserInput.success&&<h3>{UserInput.result}</h3>}
            <form >
                <fieldset>
                    <div class="form-group">
                        <label for="language">Language:</label>
                        <select multiple class="form-control" id="language" name="language" selected={UserInput.language} onChange={handleInputChange}>
                            <option value="Java">Java</option>
                            <option value="Javascript">Javascript</option>
                            <option value="Python">Python</option>
                        </select>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="language">Difficulty:</label>
                        <select multiple class="form-control" id="difficulty" name="difficulty" selected={UserInput.difficulty} onChange={handleInputChange}>
                            <option >Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleFormControlTextarea5"> Problem Statement:</label>
                        <textarea class="form-control" id="exampleFormControlTextarea5" name="problemstatement"  value={UserInput.problemstatement} onChange={handleInputChange}/>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleFormControlTextarea4"> Example Input/Output:</label>
                        <textarea class="form-control" id="exampleFormControlTextarea4" name="exampleio" value={UserInput.exampleio} onChange={handleInputChange} />
                    </div>
                    <br />



                    <label for="exampleFormControlTextarea5"> Test Case input/output:</label>
                    <p className='errors'>{Errors.testcaseio}</p>
                                        <div class="form-group">
                        {/* <label for="exampleFormControlTextarea3"> Test Cases Input/output:</label> */}
                        <textarea class="form-control" id="exampleFormControlTextarea3" name="testcaseio" value={UserInput.testcaseio} onChange={handleInputChange} />
                    </div>
                    {/* <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" name="input1" placeholder="input1" value={userinp.input1} onChange={handleInputChange}/>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" name="output1" placeholder="output1" value={userinp.input1} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" name="input2" placeholder="input2" value={userinp.input2} onChange={handleInputChange}/>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" name="output2" placeholder="output2" value={userinp.output2} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" name="input3" placeholder="input3" value={userinp.input3} onChange={handleInputChange}/>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" name="output3" placeholder="output3" value={userinp.output3} onChange={handleInputChange}/>
                        </div>
                    </div> */}


                    <br />
                    <div class="form-group">
                        <label for="exampleFormControlTextarea2"> Our Solution code</label>
                        <textarea class="form-control" id="exampleFormControlTextarea2" name="oursolution" value={UserInput.oursolution} onChange={handleInputChange} />
                    </div>
                    <br />

                    <br />
                    <div class="form-group">
                        <label for="executioncode"> Execution Code</label>
                        <textarea class="form-control" id="executioncode" name="executioncode" value={UserInput.executioncode} onChange={handleInputChange} />
                    </div>
                    <br />

                    <div class="form-group">
                        <label for="maxtime"> Max Time:</label>
                        <p className='errors'>{Errors.maxtime}</p>
                        <input type="text" class="form-control" id="maxtime" placeholder="Max Time" name="maxtime" value={UserInput.maxtime} onChange={handleInputChange} />
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Boiler Plate</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" name="boilerplate" rows="3" value={UserInput.boilerplate} onChange={handleInputChange} />
                    </div>

                    <div class="col-auto my-1">
                        <button type="button" onClick={() => { handleSubmit() }} class="btn btn-primary">Submit</button>
                    </div>
                </fieldset>
            </form>

        </div>
    )
}

export default QuestionsEntry;
