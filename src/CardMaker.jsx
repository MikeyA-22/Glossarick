import { useEffect, useState, useRef } from "react"
import './CardMaker.css'
import vocabCards from './VocabCards.json'




const translate = async (text) => {
    if (!text) return '';
    try {
        const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=yo&tl=en&dt=t&q=${encodeURIComponent(text)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // response shape: [[["translated text","original text",null,null,...]], ...]
        return data?.[0]?.map(chunk => chunk[0]).join('') || '';
    } catch (err) {
        console.error('Translation failed:', err);
        return '';
    }
};
function CardMaker({ onCardAdded , editCard}) {

    const [isTranslate, setIsTranslate] = useState(true);
    const [englishWord, setEnglishWord] = useState(editCard?.english || '');
    const [retention, setRetention] = useState(editCard?.retention || 0);
    const [yorubaWord, setYorubaWord] = useState(editCard?.yoruba || '');
    const [translatedWord, setTranslatedWord] = useState(editCard?.english || '');
    const [pendingNav, setPendingNav] = useState(false);

    const [vocabCard, setVocabCard] = useState(() => {
        const saved = localStorage.getItem('vocabCards');
        return saved ? JSON.parse(saved) : vocabCards;
    });

    useEffect(() => {
        localStorage.setItem('vocabCards', JSON.stringify(vocabCard));
        if (pendingNav) {
            setPendingNav(false);
            onCardAdded();
        }
    }, [vocabCard]);

    const debounceTimer = useRef(null);

    async function handleYorubaChange(e) {
        const val = e.target.value;
        setYorubaWord(val);

        if (!isTranslate || !val) {
            setTranslatedWord('');
            return;
        }

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(async () => {
            const result = await translate(val);
            setTranslatedWord(result);
        }, 500); // waits 500ms after user stops typing
    }

    function handleTranslation(translation){


        if(!translation){
            return;
        }
        if (translation){
            setEnglishWord(translation);
        }
    }
    function handleAddCard(e) {
        e.preventDefault();

        const newCard = {
            id: editCard?.id || crypto.randomUUID(),
            english: translatedWord,
            yoruba: yorubaWord,
            retention: retention
        };
        if (editCard) {
            setVocabCard(prev => prev.map(c => c.id === editCard.id ? newCard : c));
        } else {
            setVocabCard(prev => [...prev, newCard]);
        }
        setEnglishWord('');
        setYorubaWord('');
        setTranslatedWord('');
        setPendingNav(true);
    }

    return (
        <div>
            <h2>Please input Yoruba and English Definitions</h2>
            <div>
            <input
                placeholder="Yoruba"
                value={yorubaWord}
                onChange={handleYorubaChange}
            />
            <input
                placeholder="English"
                value={translatedWord}
                onChange={e => setTranslatedWord(e.target.value)}
            />
            </div>
            <label className="cl-checkbox">
                <input
                    type="checkbox"
                    checked={isTranslate}
                    onChange={e => setIsTranslate(e.target.checked)}
                />
                <span>translate</span>
            </label>
            <div>
            <button onClick={handleAddCard} className='button'>Add Card</button>
            <button className='button' onClick={onCardAdded}>Go to Card List</button>
            </div>
        </div>
    );
}

export default CardMaker