import React from 'react'

const Popup = ({ questions }) => {
    return (
        <>
            {questions.map(question =>(
                <tr key={question.questionid}>
                    <td><a href='/coding'>{question.shortdesc}</a></td>
                    <td>{question.score}</td>
                </tr>
            ))}
        </>
    )
}

export default Popup