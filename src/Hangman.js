import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
	constructor(props) {
		super(props);

		if (this.props.answer) {
			this.state = {
				nWrong: 0,
				guessed: new Set(),
				guessedRight: new Set(),
				answer: this.props.answer,
				won: false,
			};
		} else {
			this.state = {
				nWrong: 0,
				guessed: new Set(),
				guessedRight: new Set(),
				answer: this.getNewAnswer(),
				won: false,
			};
		}

		this.getNewAnswer = this.getNewAnswer.bind(this);
		this.handleGuess = this.handleGuess.bind(this);
		this.newGame = this.newGame.bind(this);
	}

	/** by default, allow 6 guesses. */
	static defaultProps = {
		images: [img0, img1, img2, img3, img4, img5, img6],
		maxWrong: 6,
	};

	getNewAnswer() {
		const words = [
			'apple',
			'man',
			'women',
			'men',
			'woman',
			'pen',
			'pencil',
			'hang',
			'hold',
			'thater',
			'cinema',
			'milk',
			'yellow',
			'pink',
			'mom',
			'dad',
			'space',
			'left',
			'banana',
			'window',
			'door',
		];

		return words[Math.floor(Math.random() * words.length)];
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer
			.split('')
			.map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let won = false;
		let ltr = evt.target.value;
		console.log(this.state.answer.length, this.state.guessedRight.size + 1);
		if (
			this.state.answer.includes(ltr) &&
			this.state.answer.length === this.state.guessedRight.size + 1
		) {
			won = true;
		}
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			guessedRight: st.answer.includes(ltr)
				? st.guessedRight.add(ltr)
				: st.guessedRight,
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
			won: won,
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr, index) => (
			<button
				key={index}
				value={ltr}
				onClick={this.handleGuess}
				disabled={
					this.state.guessed.has(ltr) ||
					this.state.won ||
					this.state.nWrong >= this.props.maxWrong
				}
			>
				{ltr}
			</button>
		));
	}

	newGame() {
		this.setState((st) => ({
			guessed: new Set(),
			guessedRight: new Set(),
			nWrong: 0,
			answer: this.getNewAnswer(),
			won: false,
		}));
	}

	/** render: render game */
	render() {
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				{this.state.nWrong >= 0 &&
				this.state.nWrong < this.props.maxWrong &&
				!this.state.won ? (
					<img src={this.props.images[this.state.nWrong]} alt="game_status" />
				) : this.state.won ? (
					<div>
						<span style={{ display: 'block' }}>
							You Won, you gessed it right.
						</span>
						<button style={{ width: 'auto' }} onClick={this.newGame}>
							Play Again
						</button>
					</div>
				) : (
					<div>
						<span style={{ display: 'block' }}>
							You Died, the word is: ({this.state.answer})
						</span>
						<button style={{ width: 'auto' }} onClick={this.newGame}>
							Play Again
						</button>
					</div>
				)}
				<span style={{ display: 'block' }}>
					Wrong Gusses: {this.state.nWrong > 0 ? this.state.nWrong : 0}
				</span>
				<p className="Hangman-word">{this.guessedWord()}</p>
				<p className="Hangman-btns">{this.generateButtons()}</p>
			</div>
		);
	}
}

export default Hangman;
