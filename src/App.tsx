import { useState } from 'react'
import './App.scss'

function App() {
    const [answer, setAnswer] = useState(-1);
    const [max, setMax] = useState(100);
    const [min, setMin] = useState(0);
    const [inputNum, setGuessNum] = useState("");
    const [startGameText, setStartGameText] = useState("點我開始遊戲");
    const startGame = () => {
        setGuessNum("");
        setMax(100);
        setMin(1);
        setTipText("")
        setAnswer(Math.floor(Math.random() * 100) + 1);
    }
    const [tipText, setTipText] = useState("")
    const guess = () => {
        const guessNum = Number(inputNum)
        console.log(`ans=${answer} max=${max} max=${max} guessNum=${guessNum}`)
        if (guessNum > answer) {
            setMax(guessNum);
            setTipText(`太大了，在${min}~${guessNum}間`);
            setGuessNum("");
            return
        }
        if (guessNum < answer) {
            setMin(guessNum);
            setTipText(`太小了，在${guessNum}~${max}間`)
            setGuessNum("");
            return
        }
        setTipText(`你猜中了，就是${inputNum}`)
        setStartGameText("點我重新開始");
        setAnswer(-1);
    }
    return (
        <div className="App">
            <h1 className='title'>猜數字遊戲</h1>
            {answer === -1 ? <button onClick={startGame}>{startGameText}</button> :
                <div className="game">
                    <input type="number" value={inputNum} onChange={(e) => { setGuessNum(e.target.value) }} />
                    <br />
                    <button onClick={guess}>我猜</button>
                </div>
            }
            <div id='tip'>{tipText}</div>
        </div>
    )
}

export default App
