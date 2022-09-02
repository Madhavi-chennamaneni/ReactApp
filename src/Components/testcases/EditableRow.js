import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit
}) => {
  return (
    <tr>
      <td>
        {/* <input */}
           {/* type="text" */}
         < textarea
          required="required"
          placeholder="Enter a input..."
          name="input"
          value={editFormData.input}
          onChange={handleEditFormChange}
        />

        {/* </input> */}
      </td>
      <td>
        {/* <input */}
           {/* type="text" */}
          < textarea
          required="required"
          placeholder="Enter an output..."
          name="output"
          value={editFormData.output}
          onChange={handleEditFormChange}
        />

        {/* </input> */}
      </td>
      <td>
        <button type="button" onClick={handleEditFormSubmit}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;