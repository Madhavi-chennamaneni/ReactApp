import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReportHead from './ReportHead';
import './report.css'

const reportDatas = require('../../model/report.json')

const Report = () => {

    const [reportData, setreportData] = useState([]);
    const [batchName, setBatchName] = useState('Cohort Alpha');
    const changeBatch = () => {
        let batchName = document.getElementById("inputGroupSelect01").value
        setBatchName(batchName)
    }
    const datas=reportData.map(datas=>JSON.parse(datas._data))

    const data = datas.filter(reportData => reportData.batch === batchName ? reportData.data : null)

         useEffect(() => {
             axios.post("https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/admin/report",JSON.stringify({batchid:1}),
                 {
                     headers: { 'Content-Type': 'application/json' }
                 })
                 .then((response) => {
                     setreportData(JSON.parse(response.data.body));
                 });
                 
         },[])
    


    return (
        <main>
            <div className="container-fluid">
                <div className="card p-3 bg-light">
                    <div className="input-group">
                        <select className="custom-select select-module bg-light" id="inputGroupSelect01" onChange={changeBatch}>
                            {datas.map(reportData =>
                                <option key={reportData.batch} value={reportData.batch}>{reportData.batch}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="m-3 report-btn">
                    <button type="button" className="btn btn-primary">Add Grade</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-light btn-outline-dark">Export</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger">Delete</button>
                </div>
                <ReportHead reportData={data}/>
            </div>
        </main>
    )
}

export default Report