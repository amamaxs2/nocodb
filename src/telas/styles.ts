import styled from "styled-components";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";

export const ContainerStyled = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 2vw 10vw;
  height: 40vh;
  gap: 2vh;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const Projeto = styled(FormControl)`
  width: 10vw;
`

export const Ambiente = styled(FormControl)`
  width: 15vw;
`

export const Title = styled.h1`
  gap: 1vw;
  display: flex;
  align-items: center;
  
  svg {
    color: black;
    font-size: 2rem;
  }

`