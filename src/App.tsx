import React from "react";
import Boards from "./components/Boards";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Board from "./components/[board]";

const Wrapper = styled.div`
  width: 100vw;
  background-color: #ccc;
  display: flex;
`;

const Nav = styled.div`
  width: 17vw;
  height: 100vh;
  background-color: #fff;
`;
const MainWrapper = styled.div`
  width: 83vw;
`;

function App() {
  return (
    <Wrapper>
      <Nav>
        <Boards />
      </Nav>
      <MainWrapper>
        <Routes>
          <Route path="/:boardName" element={<Board />} />
        </Routes>
      </MainWrapper>
    </Wrapper>
  );
}

export default App;
