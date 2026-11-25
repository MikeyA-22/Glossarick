import { useState, useEffect } from 'react'
import fetchData from "./utils/fetchData.jsx";
import Flashcard from "./Flashcard.jsx";




// Function to create a list of cards in the local storage
function CardList({backToList, editCard, startQuiz}) {

    // keep cards blank, fetch it, then set it from there
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() =>{
        const doFetch = async () => {
            const [data, error] = await fetchData('http://localhost:3000/flashcards');
            if (data) setCards(data);
            if (error) setError(error);

        };
        doFetch();
    }, []);






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



    if (error) return <p>{error.message}. Refresh to try again.</p>

    // Classic react return
    return <>
        <h3>My Vocab</h3>
        <ul>

            {
                cards.map((card) => (<Flashcard key = {card.id} flashcard = {card} clickable={false} editCard={editCard} deleteCard={deleteCard}/>))


            }
        </ul>

        <button className='button' onClick={backToList}>Add new Card</button>
        <button className='button' onClick={startQuiz}>Start Quiz</button>
    </>
}



export default CardList
//<button className='button' onClick={handleClear}>Clear Cards</button>