import { useState } from 'react'



// Function to create a list of cards in the local storage
function CardList({backToList, editCard, startQuiz}) {
    const [cards, setCards] = useState(() =>
        JSON.parse(localStorage.getItem('vocabCards')) || []
    );

    // Clear all cards, TODO: Make this usable
    function handleClear() {
        localStorage.removeItem('vocabCards');
        setCards([]);
    }


    // Delete card
    function deleteCard(id) {
        const updated = cards.filter(card => card.id !== id);
        setCards(updated);
        localStorage.setItem('vocabCards', JSON.stringify(updated));

    }



    // Classic react return
    return (
        <>
            <ul>
                {cards.map((card, index) => (
                    <p key={index}>
                        <span>{card.yoruba} </span> : <span className="strike">{card.english}</span>
                        <button onClick={() => editCard(card)}>edit</button>
                        <button onClick={() => deleteCard(card.id)}>delete</button>
                    </p>
                ))}
            </ul>

            <button className='button' onClick={backToList}>Add new Card</button>
            <button className='button' onClick={startQuiz}>Start Quiz</button>
        </>
    )
}



export default CardList
//<button className='button' onClick={handleClear}>Clear Cards</button>