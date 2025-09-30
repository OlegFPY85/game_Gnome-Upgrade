import './style.css';
import GameBoard from './js/GameBoard';
import Goblin from './js/Goblin';
import GameController from './js/GameController';

document.addEventListener('DOMContentLoaded', () => {
  const boardElement = document.getElementById('gameBoard');
  const gameBoard = new GameBoard(boardElement, 4);
  const goblin = new Goblin();
 
  new GameController(gameBoard, goblin); 
});