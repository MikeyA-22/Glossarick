import { useState, useEffect } from 'react'
import fetchData from "./utils/fetchData.jsx";
import Flashcard from "./Flashcard.jsx";




const API_URL = 'http://localhost:3000/flashcards';

// Function to create a list of cards in the local storage
function CardList({backToList, editCard, startQuiz}) {

    // keep cards blank, fetch it, then set it from there
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() =>{
        const doFetch = async () => {
            const [data, error] = await fetchData(`${API_URL}`);
            if (data) setCards(data);
            if (error) setError(error);

        };
        doFetch();
    }, []);


    //update function to update VocabCards.json using DELETE method in json format if resp.ok is true then successfully delete else not success
    async function DeleteData(id) {
        const resp = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        return resp.ok;
    }



    // Clear all cards, TODO: Make this usable
    function handleClear() {
        localStorage.removeItem('vocabCards');
        setCards([]);
    }


    // Delete card
    function deleteCard(id) {
        const updated = cards.filter(card => card.id !== id);
        setCards(updated);
        /*localStorage.setItem('vocabCards', JSON.stringify(updated));*/
        DeleteData(id);


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