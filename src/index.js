import './styles.css';
import gnomeImage from './assets/gnom.png';
import hammerImage from './assets/hummer.png';
import GameBoard from './classes/GameBoard';
import Goblin from './classes/Goblin';
import GameController from './classes/GameController';

document.addEventListener('DOMContentLoaded', () => {
  const boardElement = document.getElementById('gameBoard');
  const gameBoard = new GameBoard(boardElement, 4);
  const goblin = new Goblin(gnomeImage);
  const game = new GameController(gameBoard, goblin, hammerImage);
});