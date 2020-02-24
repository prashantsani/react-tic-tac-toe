import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext : true,
            stepNumber : 0,
            history:[
                {cells: Array(9).fill(null)}
            ]
        }
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext : step % 2 === 0
        })
    }
    
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length-1];
        const cells = current.cells.slice();
        const winner = calculateWinner(cells);
        if(winner || cells[i]){
            return 
        }

        cells[i] = this.state.xIsNext? 'x':'0';

        this.setState({
            history: history.concat({
                cells: cells
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.cells);
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to #' + move : 'Start the Game';

            return (
                <li key={move}>
                    <button onClick = {()=> this.jumpTo(move)} >
                        {desc}
                    </button>
                </li>
            );
        });

        let status,
            nextPlayer = this.state.xIsNext ? 'X' : 0;
        
        let announceWinner = function (winner){
            status = 'Winer is ' + winner;
        }
        
        if(winner){
            announceWinner(winner)
        }else{
            status = 'Next Player is ' + nextPlayer;
        }

        return (
            <div className={`game turn-${nextPlayer}`}>
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)}
                        cells={current.cells} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}
function calculateWinner(cells) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
            return cells[a];
        }
    }

    return null;
}

