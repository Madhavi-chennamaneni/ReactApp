import React from 'react'

const Popup = ({ questions,attendQuestion ,grade}) => {
console.log(grade)
    function attendQuestion1(question){
        console.log([question])
        attendQuestion([question])
    }
    return (
        <>
            {questions.map(question =>(
                <tr key={question.questionid}>
                    <td><a onClick={()=>attendQuestion1(question)}>{question.shortdesc}</a></td>
                    <td>{`${question.score}/${question.marks}`}</td>
                </tr>
            ))}
        </>
    )
}

export default Popup