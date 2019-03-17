import {
  X,
  O
} from '../symbols/symbols';
import {
  resultForSymbol
} from '../logic/logic';
import * as _ from 'lodash';
import {
  bake_cookie,
  read_cookie
} from 'sfcookies';
import axios from 'axios';

export const initialState = {
  game_id: Math.random(),
  board: {
    0: ['', '', ''],
    1: ['', '', ''],
    2: ['', '', '']
  },
  won: undefined,
  wonLine: undefined,
  draw: false,
  turn: O,
  log: []
};

const fetchAPI = (action, data) => {
  axios.post('http://localhost/tiktactoe_backend/',
      JSON.stringify({
        action: action,
        data: data
      }))
    .then(
      (res) => {
        console.log(res);
      })
}

export const gameReducer = (state, action) => {

  const tiktoctoe = read_cookie('tiktoctoe');

  if (tiktoctoe.hasOwnProperty('board')) {
    state = tiktoctoe;
  } else {
    fetchAPI(action, state);
  }

  switch (action.type) {
    case 'ADD_SYMBOL':
      const {
        symbol,
        row,
        position
      } = action;
      const newState = _.cloneDeep(state);
      newState.board[row][position] = symbol;
      const xResult = resultForSymbol(X, newState.board);
      const oResult = resultForSymbol(O, newState.board);
      newState.log = [...newState.log, action];

      if (xResult.won) {
        newState.won = X;
        newState.wonLine = xResult.line;
      }

      if (oResult.won) {
        newState.won = O;
        newState.wonLine = oResult.line;
      }

      if (!newState.won) {
        newState.turn = newState.turn === O ? X : O;
      }

      const boardIsFull = [
          ...newState.board[0],
          ...newState.board[1],
          ...newState.board[2]
        ]
        .filter(symbol => symbol !== '')
        .length === 9;

      if (boardIsFull && !newState.won) {
        newState.draw = true;
      }

      fetchAPI(action, newState);

      bake_cookie('tiktoctoe', newState);

      return newState;

    case 'START_AGAIN':
      initialState.game_id = Math.random();
      bake_cookie('tiktoctoe', initialState);
      fetchAPI(action, initialState);
      return initialState;

    default:
      return state;
  }
};