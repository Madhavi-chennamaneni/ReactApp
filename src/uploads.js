import React, { useState } from 'react'
import axios from 'axios';
function Uploads() {

    const [type, setType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleSubmit = () => {
        const formData = new FormData();
         formData.append("type", type);
        formData.append("file", selectedFile);
       let UPLOAD_URL="http://localhost:3005/api/uploads";
        axios
          .post(UPLOAD_URL, formData)
          .then((res) => {
            //console.log(res)
               // console.log(res.body)
            alert("File Upload success   "+res.data);
          })
          .catch((err) => alert("File Upload Error"));
      };


let setRadio=(e)=>{
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

Choose file type:
<div class="form-check form-check-inline" >
  <input class="form-check-input" type="radio" name="uploads" id="que" value="Questions" onChange={setRadio} checked={type==="Questions"}/>
  <label class="form-check-label" for="language_java">Question</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="language_JavaScript" value="Modules" onChange={setRadio} checked={type==="Modules"}/>
  <label class="form-check-label" for="language_JavaScript">Modules</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="uploads" id="language_C_CPP" value="learningprogram" onChange={setRadio} checked={type==="learningprogram"}/>
  <label class="form-check-label" for="language_C_CPP">Learning Programs</label>
</div>

<div class="col-auto my-1">
                        <button type="button" onClick={() => { handleSubmit() }} class="btn btn-primary">Submit</button>
                    </div>

                    </form>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
 
    </div>

<div>
{/* <a href={require("./static/Learning_program.csv")} download="myFile"><button type="button">Download Questions Template</button></a> */}
<a href="../../static/Learning_program.csv" download="Lp.csv"><button type="button">Download Questions Template</button></a>
<br/>
<br/>
<a href="../../static/Modules.csv" download="Modules.csv"><button type="button">Download Modules Template</button></a>
<br/>
<br/>
<a href="../../static/Questions.csv" download="Questions.csv"><button type="button" download>Download Learning Program Template</button></a>
<br/>
</div>  


</>

  )
}

export default Uploads
