import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import Popup from './Popup'

const ReportHead = ({ reportData }) => {
    const [show, setShow] = useState(false);
    const [reportQuestions, setReportQuestions] = useState([]);

    const handleClose = () => setShow(false);

    const handlePopup = (e) => {
        console.log(typeof(e.target.id))
       let questions= reportData.map(data =>
            data.data.map(modules =>
            (modules.modules.filter(module =>
                e.target.id === String(module.moduleid) ? setReportQuestions(module.questions) : null
            ))))
        setShow(true)

    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped report-table">
                <thead className="bg-dark text-light">
                    <tr>
                        <th scope="col">Students</th>
                        {reportData.map(data =>
                            data.data.map(modules =>
                            (modules.modules.map(module =>
                                <th scope='col' key={module.moduleid}>{module.modulename}</th>
                            ))))}
                    </tr>
                </thead>
                <tbody>
                    {reportData.map(data => data.data.map(modules => (
                        <tr key={modules.learnerid}>
                            <th scope="row">{`${modules.firstname} ${modules.lastname}`}</th>
                            {modules.modules.map(module => (
                                <>
                                    <td key={module.moduleid}> <a onClick={(e) => handlePopup(e)} id={module.moduleid}>
                                        completed
                                    </a>

                                    </td>
                                </>
                            ))}
                        </tr>
                    )))}
                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} id="popup" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{module.modulename}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table table-bordered table-striped report-table">
                                <thead className="bg-dark text-light">
                                    <tr>
                                        <th scope="col">Questions</th>
                                        <th scope="col">Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Popup questions={reportQuestions} />
                                </tbody>
                            </table>
                        </Modal.Body>
                    </Modal>
                </tbody>
            </table>
        </div>
    )
}

export default ReportHead;