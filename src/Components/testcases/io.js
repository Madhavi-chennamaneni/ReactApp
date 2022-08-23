import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
//import "./io.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const Io = (Props) => {
  const [IOdata, setIOdata] = useState([]);
  const [addFormData, setAddFormData] = useState({
    input: "",
    output: ""
  });

  const [Errors, setErrors] = useState("");

  const [editFormData, setEditFormData] = useState({
    input: "",
    output: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setErrors("");
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    if ((addFormData.input === "") || (addFormData.output === "")) {
      setErrors("Input & Output cannot be empty");
    }
    else {
      const newContact = {
        id: nanoid(),
        input: addFormData.input,
        output: addFormData.output,
      };

      const newContacts = [...IOdata, newContact];
      setIOdata(newContacts);
      Props.iodata(newContacts);

    }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      input: editFormData.input,
      output: editFormData.output,
    };

    const newContacts = [...IOdata];

    const index = IOdata.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setIOdata(newContacts);
    setEditContactId(null);
    Props.iodata(newContacts);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      input: contact.input,
      output: contact.output,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...IOdata];

    const index = IOdata.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setIOdata(newContacts);
    Props.iodata(newContacts);
  };


  return (

    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <br />
        <p style={{ color: "red" }}>{Errors}</p>
        <h6><b>Add a Test Case</b></h6>
        {/* <form > */}
          <input
            type="text"
            name="input"
            required="required"
            placeholder="Enter a input..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="output"
            required="required"
            placeholder="Enter an output..."
            onChange={handleAddFormChange}
          />

          <button type="button" onClick={handleAddFormSubmit} >Add</button>

        {/* </form> */}
        <div>
          <table className="iotable">
            <thead>
              <tr>
                <th>Added Input</th>
                <th>Output Cases</th>
              </tr>
            </thead>
            <tbody>
              {IOdata.map((contact) => (
                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      handleEditFormSubmit={handleEditFormSubmit}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                      handleEditFormSubmit={handleEditFormSubmit}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </form>


    </div>
  );
};

export default Io;
