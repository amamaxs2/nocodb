import styled from "styled-components";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export const App = styled.div`
  display: flex;
  padding: 50px;
  gap: 3vw;

  @media (max-width: 1270px) {
    flex-direction: column;
  }
`;

export const Title = styled.img`
  display: flex;
  justify-content: center;
  width: 300px;
`

export const ContainerStyled = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 2vw 10vw;
  gap: 2vh;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const Projeto = styled(FormControl)`
  width: 15vw;
`

export const Autorizador = styled(FormControl)`
  width: 30vw;
`

export const Botao = styled(Button)`
  background-color: rgb(104, 92, 166);
  height: 55px;
  margin-top: 20px;
  width: 100%;
  
  &:hover {
    background-color: #CD35C0;
  }
`

export const TasksTable = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vw;
  gap: 2vh;
  margin: 0;
  border: 1px solid gray;
  border-radius: 5px;
`;
