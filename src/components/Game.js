import React, { Component } from 'react'
import Board from './Board';


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


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext : true,
            stepNumber : 0,
            history:[
                {cells: Array(9).fill(null)}
            ],
            game_grid:[ // might need this later on for min-max algorithm
            ]
        }
    }

    componentDidMount(){
        
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext : step % 2 === 0
        })
    }

    moveAI() {
        let arr = this.state.history[this.state.history.length-1].cells.slice(),
            indexes = Array.from(Array(arr.length).keys()),
            availableIndexes = indexes.filter((index) => arr[index] == null),
            selectedIndex = availableIndexes[Math.floor(Math.random()* availableIndexes.length)];

        console.log(availableIndexes);
        console.log(selectedIndex);
        console.log(this.state.game_grid);
        
        this.handleClick(selectedIndex)
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
            stepNumber: history.length,
            game_grid: cells.reduce(function (rows, key, index) { 
                        return (index % 3 == 0 ? rows.push([key]) 
                        : rows[rows.length-1].push(key)) && rows;
                    }, [])
        });
        // UX Improvement (to be done later) Prevent Clicks on Game Board till MoveAI() is finished
        // (mostly to be done using pointer-events instead of [disabled] attribute on buttons)
    }

    componentDidUpdate(){
        // Once component updates, call moveAI() which will add a radom 0 number to the Game Board. 
        if(!this.state.xIsNext){
            this.moveAI()
        }
        // UX Improvement (to be done later - Enable clicking 
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.cells);
        const moves = history.map((step, move) => {
            console.log(move)
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
            <div className={`game turn-${nextPlayer} ${winner ? 'winner-is-'+winner : winner}`}>
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)}
                        cells={current.cells} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {/* This is for test purpose only */}
                    {/* <ol>{moves}</ol> */}
                    <button className={`restart-game ${winner ? 'd-inline-block' : 'd-none'}`  }
                    onClick={(i) => this.jumpTo(0)}>Restart</button>
                </div>
            </div>
        )
    }
}