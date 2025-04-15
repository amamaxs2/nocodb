import styled from "styled-components";
import Container from "@mui/material/Container";
import { TextField, Button } from "@mui/material";

export const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const ContainerLogin = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 600px;
  gap: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

export const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const Campo = styled(TextField)`
  width: 400px;
`

export const Botao = styled(Button)`
  background-color: rgb(104, 92, 166) !important;
  width: 400px;
  height: 55px;

  &:hover {
    background-color: #CD35C0;
  }
`;
