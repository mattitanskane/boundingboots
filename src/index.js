import game from './Game';
import './index.scss';

const newGame = Object.create(game).init(800, 300);

newGame.start();
