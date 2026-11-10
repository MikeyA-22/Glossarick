import { useState } from "react";


function Quiz({toList}){
    const [cards, setCards] = useState(() =>
        JSON.parse(localStorage.getItem('vocabCards')) || []
    );

    const [isDisabled, setIsDisabled] = useState(false);
    const[word, setWord] = useState('');
    const [className, setClassName] = useState("strike");
    const [correctAnswers, setCorrectAnswers] = useState('');
    const [index, setIndex] = useState(0);
    const card = cards[index];
    let hasNext = index < cards.length - 1;

    const [correctCards, setCorrectCards] = useState([]);



    function Increment(correct){
        let updatedCorrect = correctCards;
        if (correct && hasNext){
            if (cards[index].retention < 5) cards[index].retention++;
            updatedCorrect = [...correctCards,cards[index]];
            setCorrectCards(updatedCorrect);
        }
        if(hasNext){
            setIndex(index+1);
            setWord('');
            setClassName("strike");
        }
        else{
            if (correct){
                if (cards[index].retention < 5) cards[index].retention++;
                updatedCorrect = [...correctCards,cards[index]];
            }
            setIsDisabled(true);
            setCorrectAnswers("Correct Answers: ");
            console.log(updatedCorrect);
            localStorage.setItem('vocabCards', JSON.stringify(cards));
            setCorrectCards(updatedCorrect);

        }


    }


    function RevealAnswer(){
     setClassName("");
    }

    function handleWordChange(e){
        setWord(e.target.value);
    }


    return (
        <>

            <div>
                <p>{card.yoruba}</p>

                <input placeholder="your answer" type="text" value={word} onChange={handleWordChange}/>
            </div>
            <div>
                <p className={className}>{card.english}</p>
                <button onClick={RevealAnswer}>Reveal</button><br/>
                <button disabled={isDisabled} onClick={() => Increment(true)}>✅</button>
                <button disabled={isDisabled} onClick={() => Increment(false)}>❌</button>
            </div>
            <button onClick={toList}>Back to List</button>
            <p> {correctAnswers} </p>
            {correctAnswers && correctCards.map((card, index) => (
                <p key={index}> {card.yoruba} : <progress value = {card.retention} max = {5}/>  </p>

            ))}





        </>
    );
}


export default Quiz

//<button onClick={startQuiz}>button</button>
//