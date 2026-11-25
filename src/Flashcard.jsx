import { useState } from 'react'

const Flashcard = ({ flashcard, clickable, editCard, deleteCard}) => {
    const [text, setText] = useState(flashcard.yoruba)
    const [backgroundColor, setBackgroundColor] = useState('lightblue')

    const flipCard = () => {
        if (text === flashcard.yoruba) { // show the answer
            setText(flashcard.english);
            setBackgroundColor('lightgreen');
        } else {
            setText(flashcard.yoruba); // show the question
            setBackgroundColor('lightblue');
        }
    }

    // set the style dynamically using the backgroundColor state
    const style = {background: backgroundColor}

    if (!clickable) {
        return (
            <li className="card card-row">
                <p>{text}</p>
                <button onClick={() => editCard(flashcard)}>edit</button>
                <button onClick={() => deleteCard(flashcard.id)}>delete</button>
            </li>
        )
    }


    return (
        <li className="card card-row" onClick={flipCard} style={style}>
            <p>{text}</p>
        </li>
    )
}
export default Flashcard