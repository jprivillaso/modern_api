import styled from 'styled-components';

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-template-areas:
    "header header header header header header"
    "sidebar body body body body body"
    "sidebar body body body body body"
    "sidebar body body body body body"
    "sidebar body body body body body"
    "sidebar footer footer footer footer footer"
  ;
`;