import "./App.css";
import * as S from "./styles.ts";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { Autocomplete, TextField, OutlinedInput } from "@mui/material";

const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

function App() {
  const [projeto, setProjeto] = React.useState("");
  const [ambiente, setAmbiente] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const names = ["Api", "Portal", "Integrador"];

  const suggestions = inputValue.includes("@")
    ? []
    : emailDomains.map((domain) => `${inputValue}@${domain}`);

  const handleChange = (event: SelectChangeEvent) => {
    setProjeto(event.target.value as string);
    setAmbiente(event.target.value as string);
  };

  return (
    <div className="App">
      <header className="App-header">
        <S.Title>
          <AccountCircleIcon />
          Saltsystems
        </S.Title>
        <S.ContainerStyled maxWidth="sm">
          <S.Projeto size="medium">
            <InputLabel id="demo-simple-select-label">Projeto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projeto}
              label="Projeto"
              onChange={handleChange}
            >
              <MenuItem value={10}>Nubank</MenuItem>
              <MenuItem value={20}>Itau PJ</MenuItem>
              <MenuItem value={30}>Itau PF</MenuItem>
            </Select>
          </S.Projeto>

          <S.Ambiente size="medium">
            <InputLabel>Multiple Select</InputLabel>
            <Select
              multiple
              value={ambiente}
              onChange={(e) => setAmbiente(e.target.value)}
              input={<OutlinedInput label="Multiple Select" />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </S.Ambiente>

          <TextField id="descricao" label="Descrição" size="medium" fullWidth />

          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            size="medium"
            fullWidth
          >
            <DemoContainer components={["TimePicker"]}>
              <TimePicker label="Tempo estimado" ampm={false} />
            </DemoContainer>
          </LocalizationProvider>

          <Autocomplete
            freeSolo
            options={suggestions}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => (
              <TextField {...params} label="Autorizador" fullWidth />
            )}
          />

          <Button variant="contained" size="medium">
            Adicionar tarefa
          </Button>
        </S.ContainerStyled>
      </header>
    </div>
  );
}

export default App;
