import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [autorizadores, setAutorizadores] = useState<string[]>([]);
  const navigate = useNavigate();

  // Carrega os autorizadores do banco ao iniciar a página
  useEffect(() => {
    async function getAutorizadores() {
      try {
        const { data } = await axios.get(
          "https://integrador.in.saltsystems.com.br/webhook/fba33a2e-9696-4195-bc1e-37bb95971d55"
        );

        if (data.length > 0 && Array.isArray(data[0].list)) {
          const listaAutorizadores = data[0].list.map((item: any) => item.autorizador);
          setAutorizadores(listaAutorizadores);

          console.log(data)
          console.log(listaAutorizadores)
        }
      } catch (error) {
        console.error("Erro ao buscar autorizadores:", error);
      }
    }

    getAutorizadores();
  }, []);

  const handleLogin = () => {
    if (autorizadores.includes(email)) {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Usuário não autorizado!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField 
        label="Email" 
        fullWidth 
        margin="normal"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Entrar
      </Button>
    </Container>
  );
};

export default Login;
