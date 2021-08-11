import styled from 'styled-components';

export const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  align-content: center;
  background-color: lightblue;
`;

export const Nav = styled.nav`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const ListItem = styled.li`
  width: 100px;
  background-color: #CCCCCC;
  height: 30px;
  border-radius: 5px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  align-content: center;
  margin: 0px 20px;

  &:hover {
    opacity: 0.7;
    background-color: #DDDDDD;
    cursor: pointer;
  }
`;