import * as S from "./styles.ts";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";
import LogoSalt from "../../imagens/logoSalt.png";


const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [hostsInfo, setHostsInfo] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAutorizadores() {
      try {
        const { data } = await axios.get(
          "https://integrador.in.saltsystems.com.br/webhook/603b0e75-efb1-4748-9bd7-6440c3590bfc"
        );

        if (data.length > 0 && Array.isArray(data[0].list)) {
          const listaHosts = data[0].list.map((item: any) => ({
            host: item.host,
            pass: item.pass,
          }));

          setHostsInfo(listaHosts);
        }
      } catch (error) {
        console.error("Erro ao buscar autorizadores:", error);
      }
    }

    getAutorizadores();
  }, []);

  const handleLogin = () => {
    const emailLower = email.toLowerCase();
    const dominio = emailLower.split("@")[1];

    const registroHost = hostsInfo.find((item) =>
      dominio.endsWith(item.host.toLowerCase())
    );

    if (registroHost) {
      if (senha === registroHost.pass) {
        
        localStorage.setItem("auth", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("host", dominio);

        navigate("/dashboard");
      } else {
        alert("Senha incorreta!");
      }
    } else {
      alert("Usuário não autorizado!");
    }
  };

  return (
    <S.LoginWrapper>
      <S.ContainerLogin maxWidth="sm">
        <img style={{ width: "200px"}} src={LogoSalt} alt="Logo Saltsystems" />
        <S.Formulario>
          <Typography
            variant="h4" fontWeight="750"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            LOGIN
          </Typography>

          <S.Campo
            label="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <S.Campo
            label="Senha" value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <S.Botao
            variant="contained"
            onClick={handleLogin}
          >
            Entrar
          </S.Botao>
        </S.Formulario>
      </S.ContainerLogin>
    </S.LoginWrapper>
  );
};

export default Login;
