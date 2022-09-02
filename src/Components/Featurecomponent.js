import React from "react";
import Popup from "reactjs-popup"
import "./css/featurecomp.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faPlusSquare } from '@fortawesome/free-regular-svg-icons'

class FeatureComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { flag: "", query1: "", query2: "", searchinput: "" };

    }

    selectedQuery1 = (e) => {
        this.setState = {
            query1: e.target.value
        }

    }
    handleSearchInput = (e) => {
        this.setState({ searchinput: e.target.value })
        this.props.searchinput(this.state.searchinput)

    }

    render() {
        //console.log(this.state.searchinput);
        return (
            <>
                <div className="Features">
                    <div id="add-box">
                        {/* <button className="Feature" type={"button"} id="add-but" onClick={this.qstncreateopen}>+ Add</button> */}
                        <Popup trigger={<button className="Feature" type={"button"} id="add-but">+Add</button>} position="bottom right" closeOnDocumentClick="true">
                            {close => (
                                <div className="add_popup">
                                    <div onClick={() => {
                                        this.props.showquestions();
                                        close();
                                    }} className="creatquestion_in_popup" ><FontAwesomeIcon icon={faPlusSquare} /> Create Question</div>
                                    <div className="import_csv_in_popup" onClick={() => { this.props.uploadQuestionCSV(); close(); }}  >

                                        <FontAwesomeIcon icon={faCircleUp} /> Import csv</div>
                                </div>
                            )}
                        </Popup>

                    </div>
                    <div id="sort-box">
                        <input className="Feature" type={"button"} id="sort-but" />
                    </div>
                    <div id="filter-box">
                        <Popup trigger={<input className="Feature" type={"button"} id="filter-but" />}
                            position={"bottom right"}>
                            <>
                                <div className="filter-popup" id="filter-pop">
                                    <div className="filter-popup" id="filter-pop-head">
                                        <div className="filter-popup" id="filter-name">
                                            Filter for <input type={"button"} id="name-filter" />
                                            <span className="filter-popup" id="fil-name">Test 1</span>
                                        </div>
                                        <div className="filter-popup" id="clr-btn">
                                            <button className="filter-popup" type="button" id="clear" placeholder="Clear all">Clear all</button>
                                        </div>
                                        <div className="filter-popup" id="save-view">
                                            <button className="filter-popup" type="button" id="save-view-btn">Save as new view</button>
                                        </div>
                                    </div>
                                    <div className="filter-popup" id="filter-query">
                                        <span>Where</span>
                                        <select className="query" id="query1" onChange={this.selectedQuery1}>
                                            <option value="">---select---</option>
                                            <option value="attachment">Attachments</option>
                                            <option value="type">Type</option>
                                            <option value="category">Category</option>
                                            <option value="level">Level</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        </Popup>

                    </div>
                    <div id="search-box">
                        <input type="text" id="search" onChange={this.handleSearchInput} value={this.state.searchinput} placeholder="Search" />
                    </div>
                </div>

            </>
        )
    }
}

export default FeatureComp;