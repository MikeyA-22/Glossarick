import { useState } from 'react'
import CardMaker from './CardMaker'
import CardList from './CardList'
import Quiz from './Quiz'


// Main Application
function App() {
    const [view, setView] = useState('maker');
    const [card, setSelectedCard] = useState(null);

    function editCard(card){
        setSelectedCard(card);
        setView('maker');
    }

    return (
        <>
            {view === 'maker' && <CardMaker onCardAdded={() => setView('list')}  editCard={card}/>}
            {view === 'list' && <CardList backToList={() =>{
                setView('maker');
                setSelectedCard(null);
            }

            } editCard = {editCard}
            startQuiz={() => setView('quiz')}
            />}
            {view === 'quiz' && <Quiz toList={() => {setView('list')}}/>}
        </>
    )
}



export default App