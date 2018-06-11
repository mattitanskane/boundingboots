import game from './Game';
import './index.scss';

const newGame = Object.create(game).init(1280, 720);

newGame.start();
