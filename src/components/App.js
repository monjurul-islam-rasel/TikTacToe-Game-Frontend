import React from 'react';
import Board from './Board';
import Result from './Result';
import styled from 'styled-components';
import ActionLog from './Log';
import './App.css';

const App = ({ className }) => {
  return (
    <div className={className} >
      <Result />
      <Board />
      <ActionLog />
    </div>
  );
}

export default styled(App)`
  font-family: Sansation;
  margin: 0 auto;
  width: 300px;
`;
