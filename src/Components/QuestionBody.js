import React from "react";
import "./css/body.css"
import noquestion from "./images/noquestion.png";
import DataTable from 'react-data-table-component';
// import ReactHtmlParser from 'react-html-parser';
var gdata;
//  const ExpandedComponent = ({data}) => <pre>{JSON.stringify(gdata,null,2)}</pre>;

const columns = [

    {
        name: 'Question',
        selector: row => row.longdesc,
        sortable: true,
        wrap: true

    },
    {
        name: 'Category',
        selector: row => row.categoryid,
        sortable: true,
        // maxWidth: "200px",
    },
    {
        name: 'Complexity',
        selector: row => row.complexityid,
        sortable: true,
        // maxWidth: "100px",
        conditionalCellStyles: [
            {
                when: row => row.complexityid === 1,
                classNames: ['easy badge'],
               
            },
            {
                when: row => row.complexityid === 2,
                classNames: ['medium badge'],
            },
            {
                when: row => row.complexityid === 3,
                classNames: ['difficult badge'],

            }
        ],


    },
    {
        name: 'Template Code',
        // maxWidth: "150px",
        selector: row => row.templatecode,
        sortable: true,
    },
    {
        name: ' Short Description',
        selector: row => row.shortdesc,
        sortable: true,
        // wrap:true
    }
];



class QuestionLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionData: [],
            filterText: "",
            resetPaginationToggle: false

        }
        this.setState({ filterText: "" })
    }

    handleClear = () => {
        if (this.state.filterText) {
            this.setState(!this.state.resetPaginationToggle);
            this.setState({ filterText: "" });
            this.props.searchval = ""
        }
    };
    componentDidMount() {
        this.getQuestionData();
    }

    getQuestionData = () => {
        fetch(`http://localhost:3005/api/getquestions`)
            .then((response) => response.json())
            .then((data) => {

                if (data.length > 0) {
                    this.setState({ questionData: data })
                    gdata = this.state.questionData;
                }
            });
        // this.props.closeloop();

    }

    // handleChange = ({ selectedRows }) => {
    //     // You can set state or dispatch with something like Redux so we can use the retrieved data
    //     console.log('Selected Rows: ', selectedRows);
    // };

    render() {

        // console.log(this.props.getques);
        // if (this.props.getques === true) {
        //     this.getQuestionData();
        // }
        // let filteredItems = this.state.questionData.filter(item => item.question && item.question.toLowerCase().includes(this.props.searchval.toLowerCase(),));

        return (
            <>

                {this.state.questionData.length > 0 ? (
                    <div className="questionTable">
                        <DataTable
                            columns={columns}
                            selectableRows
                            // selectableRowsHighlight
                            // fixedHeader
                            // subHeader
                            // highlightOnHover 
                            //onSelectedRowsChange={this.handleChange}
                            pagination
                            data={gdata}
                            paginationResetDefaultPage={this.state.resetPaginationToggle}
                            subHeaderComponent={this.handleClear}
                        // expandableRows
                        // expandableRowsComponent={ExpandedComponent}
                        />
                    </div>
                ) : (

                    <div id="emptybody" align="center">
                        <img src={noquestion} alt="No Questions" />
                        <p id="bold-info">No questions added yet!</p>
                        <p id="light-info">Mollit ex cupidatat Lorem et eu amet ipsum id aute anim elit.</p>
                    </div>
                )}
            </>
        )
    }
}

export default QuestionLanding;


