
import * as S from "./styles.ts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Autocomplete, TextField } from "@mui/material";

const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

function Formulario() {
  const [projeto, setProjeto] = useState("");
  const [ambiente, setAmbiente] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [projetosDisponiveis, setProjetosDisponiveis] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [novaTarefa, setNovaTarefa] = useState({
    projeto: "",
    descricao: "",
    autorizador: "",
  });

  useEffect(() => {
    async function getProjetos() {
      const { data } = await axios.get(
        "https://integrador.in.saltsystems.com.br/webhook/2530e223-b90d-4e3e-b5b7-54a19db4d0b4"
      );
      console.log("Dados recebidos:", data);

      if (data.length > 0 && Array.isArray(data[0].list)) {
        const info = data[0].list;

        setProjetosDisponiveis(info); // Agora armazenamos os objetos completos

        console.log("Projetos extraídos:", info);
        setLoading(false);
      }
    }

    getProjetos();
  }, []);

  const suggestions = inputValue.includes("@")
    ? []
    : emailDomains.map((domain) => `${inputValue}@${domain}`);

  const handleChange = (event: SelectChangeEvent) => {
    setProjeto(event.target.value as string);
    setAmbiente(event.target.value as string);
  };

  const adicionarTarefa = async () => {
    try {
      const response = await axios.post(
        "https://gestor.saltsystems.com.br/api/v1/db/data/noco/p0umcrp64xsstvs/msz4ah8kjjqcyrq/views/vw578sbtbcmq6yfp",
        {
          projeto: novaTarefa.projeto,
          descricao: novaTarefa.descricao,
          autorizador: novaTarefa.autorizador,
        },
        {
          headers: {
            "xc-auth":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5kYUBzYWx0c3lzdGVtcy5jb20uYnIiLCJpZCI6InVzdWlubnRucnhiNXpsdGoiLCJyb2xlcyI6Im9yZy1sZXZlbC1jcmVhdG9yIiwidG9rZW5fdmVyc2lvbiI6IjgwNmIwOGU5YjNiY2QxMWMwZGYxNGNlN2Q2ZjEyNzdmY2RjMTM3MjBlZDE5NzEzNDBhMzVhYjY1YTdlNmMyYjEzYjUyZTlhNTBkYjk1YzJlIiwiaWF0IjoxNzQzMDE3MjM1LCJleHAiOjE3NDMwNTMyMzV9.z7NyZSBgZb6wdaNmk6gJlM_WVUtqBuJJ5o8A1LE-GN0",
          },
        }
      );

      console.log("Tarefa adicionada com sucesso:", response.data);

      // Atualizar a lista de tarefas automaticamente
      setProjetosDisponiveis((prev) => [...prev, novaTarefa]);

      // Limpar os campos após adicionar
      setNovaTarefa({ projeto: "", descricao: "", autorizador: "" });
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <S.Title>
          <AccountCircleIcon />
          Saltsystems
        </S.Title>

        <S.ContainerStyled maxWidth="sm">
          <S.Projeto size="short">
            <InputLabel id="demo-simple-select-label">Projeto</InputLabel>
            <Select
              labelId="projeto-select-label"
              id="projeto-select"
              value={novaTarefa.projeto}
              label="Projeto"
              onChange={(event) =>
                setNovaTarefa({ ...novaTarefa, projeto: event.target.value })
              }
              fullWidth
            >
              {projetosDisponiveis.map((projeto) => (
                <MenuItem key={projeto.Id} value={projeto.Nome}>
                  {projeto.Nome}
                </MenuItem>
              ))}
            </Select>
          </S.Projeto>

          <TextField
            id="descricao"
            label="Descrição"
            size="medium"
            fullWidth
            value={novaTarefa.descricao}
            onChange={(event) =>
              setNovaTarefa({ ...novaTarefa, descricao: event.target.value })
            }
          />

          <Autocomplete
            freeSolo
            options={suggestions}
            inputValue={novaTarefa.autorizador}
            onInputChange={(_, newInputValue) =>
              setNovaTarefa({ ...novaTarefa, autorizador: newInputValue })
            }
            renderInput={(params) => (
              <TextField {...params} label="Autorizador" fullWidth />
            )}
          />

          <Button variant="contained" size="medium" onClick={adicionarTarefa}>
            Adicionar tarefa
          </Button>
        </S.ContainerStyled>
      </header>
    </div>
  );
}

export default Formulario;
