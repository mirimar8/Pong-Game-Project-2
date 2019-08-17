import {
  SVG_NS,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BOARD_GAP,
  KEYS,
  RADIUS,
  SPEED
} from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.paused = false;
    this.numGamesPlayed = 1;
    this.playerName = document.getElementById('player-name');
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    const boardMid = (this.height - PADDLE_HEIGHT) / 2;
    this.paddle1 = new Paddle(
      this.height,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      BOARD_GAP,
      boardMid,
      KEYS.p1up,
      KEYS.p1down
    );
    const paddle2Gap = this.width - BOARD_GAP - PADDLE_WIDTH;
    this.paddle2 = new Paddle(
      this.height,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      paddle2Gap,
      boardMid,
      KEYS.p2up,
      KEYS.p2down
    );
    this.ball = new Ball(this.width, this.height, RADIUS, "red");
    this.ball2 = new Ball(this.width, this.height, RADIUS, "green");
    this.ball3 = new Ball(this.width, this.height, RADIUS, "blue");
    this.score1 = new Score(this.width / 2 - 100, 30);
    this.score2 = new Score(this.width / 2 + 80, 30);

    document.addEventListener("keydown", event => {
      if (event.key === KEYS.pause) {
        this.paused = !this.paused;
        this.playerName.innerText = '';
      }
    });
  }

  declareWinner(score1, score2) {
    if (score1 === 5) {
      this.playerName.innerText = 'Player 1 wins! Press space to restart.';
      this.numGamesPlayed++;
      this.paused = true;
      this.paddle1.resetScore();
      this.paddle2.resetScore();
      this.ball.reset();

    } else if (score2 === 5) {
      this.playerName.innerText = 'Player 2 wins! Press space to restart.';
      this.numGamesPlayed++;
      this.paused = true;
      this.paddle1.resetScore();
      this.paddle2.resetScore();
      this.ball.reset();
    }
  }

  setBallSize(score1, score2) {
    if (score1 === 5 || score2 === 5) {
      this.ball.ballSize(6);
      this.ball2.ballSize(6);
      this.ball3.ballSize(6);
    }
  }

  render() {

    this.setBallSize(this.paddle1.getScore(), this.paddle2.getScore());
    this.declareWinner(this.paddle1.getScore(), this.paddle2.getScore());

    if (this.paused === false) {

      this.gameElement.innerHTML = "";
      let svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttributeNS(null, "width", this.width);
      svg.setAttributeNS(null, "height", this.height);
      svg.setAttributeNS(null, "viewbox", `0 0 ${this.width} ${this.height}`);
      this.gameElement.appendChild(svg);
      this.board.render(svg);
      this.paddle1.render(svg);
      this.paddle2.render(svg);
      this.paddle1.speed = SPEED;
      this.paddle2.speed = SPEED;

      this.ball.render(svg, this.paddle1, this.paddle2);
      if (this.numGamesPlayed >= 2) {
        this.ball2.render(svg, this.paddle1, this.paddle2);

      }
      if (this.numGamesPlayed >= 3) {
        this.ball3.render(svg, this.paddle1, this.paddle2);
        this.ball.ballSize(4);
        this.ball2.ballSize(4);
        this.ball3.ballSize(4);

      }

      this.score1.render(svg, this.paddle1.getScore());
      this.score2.render(svg, this.paddle2.getScore());

    } else {
      this.paddle1.speed = 0;
      this.paddle2.speed = 0;
    }

  }

}
