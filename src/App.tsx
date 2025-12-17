import { useState, useRef, type FormEvent } from 'react'
import './App.scss'

function App() {
    const [answer, setAnswer] = useState(-1);
    const [max, setMax] = useState(100);
    const [min, setMin] = useState(0);
    const [guessInput, setGuessInput] = useState("");
    const [tipText, setTipText] = useState("");
    const [warningText, setWarningText] = useState(""); // 即時輸入警告

    // Focus management
    const inputRef = useRef<HTMLInputElement>(null);

    const startGame = () => {
        setGuessInput("");
        setMax(100);
        setMin(0);
        setTipText("");
        setWarningText(""); // 重置警告
        setAnswer(Math.floor(Math.random() * 100) + 1);
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    // 即時輸入驗證
    const handleInputChange = (value: string) => {
        setGuessInput(value);

        if (value === "") {
            setWarningText("");
            return;
        }

        const num = Number(value);
        if (!isNaN(num) && (num > max || num < min)) {
            setWarningText(`⚠️ 請輸入 ${min} ~ ${max} 之間的數字`);
        } else {
            setWarningText("");
        }
    }

    const guess = (e: FormEvent) => {
        e.preventDefault(); // Prevent form submission refresh

        const guessNum = Number(guessInput);

        // Validation: Empty or NaN
        if (!guessInput || isNaN(guessNum)) {
            return;
        }

        // 範圍驗證
        if (guessNum > max || guessNum < min) {
            setWarningText(`⚠️ 請輸入 ${min} ~ ${max} 之間的數字`);
            return;
        }
        setWarningText(""); // 清除警告

        console.log(`ans=${answer} min=${min} max=${max} guessNum=${guessNum}`);

        if (guessNum > answer) {
            const newMax = guessNum;
            setMax(newMax);
            setTipText(`太大了，在 ${min} ~ ${newMax} 間`);
            setGuessInput("");
        } else if (guessNum < answer) {
            const newMin = guessNum;
            setMin(newMin);
            setTipText(`太小了，在 ${newMin} ~ ${max} 間`);
            setGuessInput("");
        } else {
            setTipText(`你猜中了，就是 ${guessInput}`);
            setAnswer(-1); // Game Over state
        }

        // UX: Auto focus back to input
        inputRef.current?.focus();
    }

    const isGameStarted = answer !== -1;

    return (
        <div className="App">
            <h1 className='title'>猜數字遊戲</h1>
            {!isGameStarted ? (
                <button onClick={startGame}>
                    {tipText ? "點我重新開始" : "點我開始遊戲"}
                </button>
            ) : (
                <form className="game" onSubmit={guess}>
                    <input
                        ref={inputRef}
                        type="number"
                        value={guessInput}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    {warningText && <div className="warning">{warningText}</div>}
                    <br />
                    <button type="submit">我猜</button>
                </form>
            )}
            <div id='tip'>{tipText}</div>
        </div>
    )
}

export default App
