import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  






































// // class Square extends React.Component {
//     // constructor(props){
//     //     super(props);
//     //     this.state={
//     //         value:null,
//     //     };
//    // }
//     // render(){

//     // //Replacing square class with function
//     function Square(props){
//       return (
//         <button 
//         className="square" 
//         // to modify the square to be a fonction component, we also changed
//         //  onClick={() => this.props.onClick()} to a shorter onClick={props.onClick} (note the lack of parentheses on both sides).
//         onClick={props.onClick}> 
//           {props.value}
//         </button>
//       );
//     }
//     // }
// //   }
  
//   class Board extends React.Component {
//     //   constructor(props){
//     //       super(props);
//     //       this.state={
//     //           squares: Array(9).fill(null),
//     //           xIsNext:true,
//     //       };
//     //   }

//     //   renderSquare(i) {
//     //     return (
//     //     <Square 
//     //   //   value ={this.state.squares[i]}
//     //   //   onClick={() =>this.handleClick(i)}
//     //   value={this.props.squares[i]}
//     //   onClick={() => this.props.onClick(i)}
//     //     />);
//     //   }



  
//     render() {

//     //     // we have changed  +'X' to (this,state.xIsNext ? 'x': 'O')
//     //   const status = 'Next player:' + (this,state.xIsNext ? 'x': 'O');
//     // const winner = calculateWinner(this.state.squares);
//     // let status;
//     // if (winner) {
//     //   status = 'Winner: ' + winner;
//     // } else {
//     //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     // }

  
//       return (
//          <div>
//         //   <div className="status">{status}</div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }
  
//   class Game extends React.Component {
// // Adding Time Travel
//     constructor(props) {
//         super(props);
//         this.state = {
//           history: [
//               {
//             squares: Array(9).fill(null),
//           }
//         ],
//           //Clicking any of the list item’s 
//           //buttons throws an error because the jumpTo method is undefined.
//           // Before we implement jumpTo, we’ll add stepNumber to the Game 
//           //component’s state to indicate which step we’re currently viewing.
//           //stepNumber added & initialised to 0
//           stepNumber: 0,
//           xIsNext: true,
//         };
//       }
      

//       handleClick(i){
//         //   const squares = this.state.squares.slice();
//         ///replace reading this.state.history with this.state.history.slice(0, this.state.stepNumber + 1).
//         // This ensures that if we “go back in time” and then make a new move from that point,
//         // we throw away all the “future” history that would now become incorrect.
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);

//         const history = this.state.history;
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//          //We can now change the Board’s handleClick function to return early by 
//          //ignoring a click if someone has won the game or if a Square is already filled:
//           if (calculateWinner(squares) || squares[i]) {
//             return;
//           }


//         //   Each time a player moves, xIsNext (a boolean) will be flipped to 
//         //   determine which player goes next and the game’s state will be saved.
//         //   We’ll update the Board’s handleClick function to flip the value of xIsNext.
//         //   With this change, “X”s and “O”s can take turns
//           squares[i] = this.state.xIsNext ? 'X':'o';
//           this.setState({
//             history: history.concat([{
//                 squares: squares,
//               }]),
//               stepNumber: history.length,
//               xIsNext: !this.state.xIsNext,
//             });
//       }
//        // we’ll define the jumpTo method in Game to update that stepNumber.
// // We also set xIsNext to true if the number that we’re changing stepNumber to is even:
//     jumpTo(step) {
//         this.setState({
//           stepNumber: step,
//           xIsNext: (step % 2) === 0,
//         });
//       }

   
    
//     render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     // const current = history[history.length - 1];
//     const winner = calculateWinner(current.squares);
//     //map over the history in the Game’s render method:
//     const moves = history.map((step, move) => {
//         const desc = move ?
//           'Go to move #' + move :
//           'Go to game start';
//         return (
//           <li  key={move}>
//             <button onClick={() => this.jumpTo(move)}>{desc}</button>
//           </li>
//         );
//       });
//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }

//       return (
//         <div className="game">
//           <div className="game-board">
//             <Board 
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)}/>
//           </div>
//           <div className="game-info">
//             <div>{status}</div>

//             {/* moves is added here */}
//             <ol>{moves}</ol>
//           </div>
//         </div>
//       );
//     }
//   }
  
//   // ========================================
  
//   ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
//   );
  
//   // //Now that we show which player’s turn is next,
//   // we should also show when the game is won and there are no more turns to make.
//   // //Given an array of 9 squares, this function will check for a winner and return 'X', ///'O', or null as appropriate.

//   function calculateWinner(squares) {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a];
//       }
//     }
//     return null;
//   }

