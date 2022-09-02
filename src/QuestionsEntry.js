import React, { useState, useEffect } from 'react'
import './question.css'
import axios from 'axios';
import Io from './Components/testcases/io';
import Qcodesdata from './Components/qcodes/languages';
import Modules from './Components/modules/Modules';
import Complexity from './Components/complexity/Complexity';
import AdminHeader from './Components/AdminHeader';
import FeatureComp from './Components/Featurecomponent';

function QuestionsEntry(Props) {
    let [UserInput, setuserinp] = useState({
        category: 1,
        autoevaluate: "no"
    });

    let [Errors, setErrors] = useState({
        language: "java",
        difficulty: "easy", exampleio: "", problemstatement: "",
        testcaseio: "", oursolution: "", executioncode: "",
        maxtime: "", boilerplate: ""
    });

    let [modules, setmodules] = useState();
    let [complexity, setcomplexity] = useState();

    useEffect(() => {
        axios.get("http://localhost:3005/api/getmodules").then((res) => { setmodules(res.data) });
        axios.get("http://localhost:3005/api/getcomplexity").then((res) => { setcomplexity(res.data) });


    }, [])


    function handleInputChange(event) {
        // event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name + ":  " + value); 

        if (name === "testcaseio") {
            if (!value.includes('\n')) {
                setErrors({ ...Errors, testcaseio: "Test case should contain atleast one line with break", success: false });
            } else {
                setErrors({ ...Errors, testcaseio: "", success: true });
            }
        }

        if (name === "maxtime") {
            if (isNaN(value)) {
                setErrors({ ...Errors, maxtime: "Please enter only Numbers", success: false });
            } else {
                setErrors({ ...Errors, maxtime: "", success: true });
            }
        }

        if (name === "marks") {
            if (isNaN(value)) {
                setErrors({ ...Errors, marks: "Please enter only Numbers", success: false });
            } else {
                setErrors({ ...Errors, marks: "", success: true });
            }
        }

        setuserinp({ ...UserInput, [name]: value, result: "", success:true});
    }



    let handleSubmit = (event) => {

        if ((UserInput.maxtime === "") ||(UserInput.marks==="")||(UserInput.longdesc==="")||(UserInput.shortdesc==="") ){
            setuserinp({ ...UserInput, result: "Please enter all details", success: true,  });

        }
        else {

            var questionsdata = JSON.stringify({ qdata: UserInput, qcodes: QuestionCodes, io: iodata });
            axios.post("https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/admin/question/add", questionsdata,
                { headers: { 'Content-Type': 'text/plain' } })
                .then(res => {
                    console.log("", res.data.body);
                      setuserinp({ ...UserInput, result: res.data.body, success: true });

                    // setuserinp({ autoevaluate: "yes", result: "Please enter all details", success: true, exampleio: "", problemstatement: "",
                                    // testcaseio: "", oursolution: "", executioncode: "",
                                    // maxtime: "", boilerplate: "", marks:"" });

            // setiodata([]);

                })
                //.then((response)=>{alert(response.body)})
                .catch(error => { setuserinp({ ...UserInput, result: error.data.body, success: false }) })
        }
    }

    let [QuestionCodes, setQuestionCodes] = useState([])
    let codesdata = (data) => {

        setQuestionCodes(data);
        console.log("language data   " + data.length + "       ", data);

    }

    let [iodata, setiodata] = useState([])

    let saveiodata = (data) => {

        setiodata(data);
        console.log(data)

    }

    return (
        <div>
      

            <form >
                {/* <fieldset> */}

                <h2 ><b>Add Questions To Database</b></h2>
                {UserInput.success && <p className='errors'>{UserInput.result}</p>}
                {!UserInput.success && <h3>{UserInput.result}</h3>}

                <br />
                <Modules setvalue={handleInputChange} /><br />
                <Complexity setvalue={handleInputChange} />

                <br />
                <div class="form-group">
                    <label for="exampleFormControlTextarea1"><b>Short Description</b></label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" name="shortdesc" rows="3" value={UserInput.shortdesc} onChange={handleInputChange} />
                </div>
                <br />
                <div class="form-group">
                    <label for="exampleFormControlTextarea1"><b>Long Description:</b></label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" name="longdesc" rows="3" value={UserInput.longdesc} onChange={handleInputChange} />
                </div>

                <br />
                <div class="form-group">
                    <label for="exampleFormControlTextarea1"><b>Example Input:</b></label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" name="exampleinput" rows="3" value={UserInput.boilerplate} onChange={handleInputChange} />
                </div>
                <br />
                <div class="form-group">
                    <label for="exampleFormControlTextarea1"><b>Example output:</b></label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" name="exampleoutput" rows="3" value={UserInput.boilerplate} onChange={handleInputChange} />
                </div>

                <br />
                <b>Auto Evaluate: </b> &nbsp; &nbsp;&nbsp;
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="autoevaluate" id="auto_yes" value="0" onChange={handleInputChange} checked={(UserInput.autoevaluate === "0")} />
                    <label class="form-check-label" for="difficulty_easy">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="autoevaluate" id="auto_no" value="1" onChange={handleInputChange} checked={(UserInput.autoevaluate === "1")} />
                    <label class="form-check-label" for="difficulty_medium">No</label>
                </div>
                <br />

                <div className='io'>
                    <Io iodata={saveiodata} />
                    <br/>
                    <br/>
                    <Qcodesdata data={codesdata} />
                </div>

                <br/>
                <br/>
                <div class="form-group">
                    <label for="maxtime"><b> Max Time:</b></label>
                    <p className='errors'>{Errors.maxtime}</p>
                    <input type="text" class="form-control" id="maxtime" placeholder="Max Time" name="maxtime" value={UserInput.maxtime} onChange={handleInputChange} />
                </div>

                <br />

                <div class="form-group">
                    <label for="maxtime"> <b>Marks: </b></label>
                    <p className='errors'>{Errors.marks}</p>
                    <input type="text" class="form-control" id="maxtime" placeholder="Marks" name="marks" value={UserInput.marks} onChange={handleInputChange} />
                </div>
                <br />

                <div class="col-auto my-1">
                    <button type="button" onClick={() => { handleSubmit() }} class="btn btn-primary">Submit</button> &nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={() => { Props.showquestions() }} class="btn btn-primary">Close</button>
                </div> 

                {/* <div class="col-auto my-1">
                    <button type="button" onClick={() => { Props.showquestions() }} class="btn btn-primary">Close</button>
                </div>  */}

                {/* </fieldset> */}
            </form>

        </div>
    )
}

export default QuestionsEntry;
