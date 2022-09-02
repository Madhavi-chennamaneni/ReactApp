import React, { useState } from 'react'
import axios from 'axios';
import AdminHeader from './Components/AdminHeader';
import download  from 'js-file-download'
function Uploads(Props) {

    const [type, setType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleSubmit = () => {
        const formData = new FormData();
         formData.append("type", type);
        formData.append("file", selectedFile);
       let UPLOAD_URL="http://localhost:3005/api/uploads";
        axios
          .post(UPLOAD_URL, formData) 
        
        // .then(response => {
        //     console.log(response)
        // }).catch(error => {
        //     console.log(error)
        // })
          .then((res) => {
            download(res.data, "processed_file.csv");
              //  res.data.pipe(fs.createWriteStream("/temp/my.csv"));
          })
          .catch((err) => alert("File Upload Error"));
      };


let setRadio=(e)=>{
  // e.preventdefault()
    setType(e.target.value);
}




  return (

    <>

    <div class="file_uploads">
      <h2>File Uploads</h2>
      <form>
      <div class="input-group mb-3">
  <input type="file" class="form-control" name="csvfile" id="uploadfile" onChange={(e) => setSelectedFile(e.target.files[0])}/>
  <label class="input-group-text" for="inputGroupFile02">Upload</label>
</div>

Choose file type:&nbsp;&nbsp;
{/* <div class="form-check form-check-inline" >
  <input class="form-check-input" type="radio" name="uploads" id="questions" value="questions" onChange={setRadio} checked={type==="questions"}/>
  <label class="form-check-label" for="questions">Questions</label>
</div> */}
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="modules" value="modules" onChange={setRadio} checked={type==="modules"}/>
  <label class="form-check-label" for="modules">Modules</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="institute" value="institute" onChange={setRadio} checked={type==="institute"}/>
  <label class="form-check-label" for="institute">Institute</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="candidates" value="candidates" onChange={setRadio} checked={type==="candidates"}/>
  <label class="form-check-label" for="candidates">Candidates</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="batch" value="batch" onChange={setRadio} checked={type==="batch"}/>
  <label class="form-check-label" for="batch">batch</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="learningpathmodule" value="learningpathmodule" onChange={setRadio} checked={type==="learningpathmodule"}/>
  <label class="form-check-label" for="learningpathmodule">learning path module</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="batchmoduleconfig" value="batchmoduleconfig" onChange={setRadio} checked={type==="batchmoduleconfig"}/>
  <label class="form-check-label" for="batchmoduleconfig">Batch Module Config</label>
</div>

<div class="col-auto my-1">
                        <button type="button" onClick={() => { handleSubmit() }} class="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" onClick={() => { Props.uploadQuestionCSV() }} class="btn btn-primary">Close</button>
                    </div>
                    
                {/* <div class="col-auto my-1">
                    <button type="button" onClick={() => { Props.uploadQuestionCSV() }} class="btn btn-primary">Close</button>
                </div>  */}

                    </form>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
 
    </div>

<div>
{/* <a href={require("./static/Learning_program.csv")} download="myFile"><button type="button">Download Questions Template</button></a> */}
{/* <a href="../../static/Questions.csv" download="Lp.csv"><button type="button">Download Questions Template</button></a> */}
<br/>
<br/>
<a href="../../static/Candidate.csv" download="candidate_template.csv"><button type="button">Download Candidate Template</button></a>
<br/>
<br/>
<a href="../../static/institite_template.csv" download="institite_template.csv"><button type="button">Download Institute Template</button></a>
<br/>
<br/>
<a href="../../static/batch_template.csv" download="batch_template.csv"><button type="button" download>Download batch Template</button></a>
<br/>
</div>
<div>
<br/>
<a href="../../static/learningpathmodule_template.csv" download="learningpathmodule_template.csv"><button type="button" download>Download Learningpath module Template</button></a>
<br/>
</div>
<div>
<br/>
<a href="../../static/modules_template.csv" download="modules_template.csv"><button type="button" download>Download modules Template</button></a>
<br/>
</div>
<div>
<br/>
<a href="../../static/batchmoduleconfig_template.csv" download="batch_module_config_template.csv"><button type="button" download>Batch Module Config template</button></a>
<br/>
</div>



</>

  )
}

export default Uploads
