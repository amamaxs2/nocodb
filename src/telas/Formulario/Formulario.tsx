import * as S from "./styles.ts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LogoSalt from "../../imagens/logoSalt.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Formulario() {
  const [projetosFiltrados, setProjetosFiltrados] = useState<any[]>([]);
  const [autorizadoresDisponiveis, setAutorizadoresDisponiveis] = useState<
    string[]
  >([]);
  const [chamados, setChamados] = useState<any[]>([]);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [novaTarefa, setNovaTarefa] = useState({
    projeto: "",
    descricao: "",
    autorizador: "",
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  async function fetchAll() {
    try {
      // 1. Buscar os projetos primeiro
      const { data: projetosData } = await axios.get(
        "https://integrador.in.saltsystems.com.br/webhook/603b0e75-efb1-4748-9bd7-6440c3590bfc"
      );

      if (projetosData.length > 0 && Array.isArray(projetosData[0].list)) {
        const lista = projetosData[0].list;
        const hostUsuario = localStorage.getItem("host")?.trim().toLowerCase();

        const projetoDoUsuario = lista.find(
          (item) => item.host?.trim().toLowerCase() === hostUsuario
        );

        let projetosArray: any[] = [];
        let autorizadoresArray: string[] = [];

        if (projetoDoUsuario) {
          projetosArray = projetoDoUsuario.projetos
            .split(",")
            .map((nome: string, index: number) => ({
              Id: `${projetoDoUsuario.Id}-${index}`,
              Nome: nome.trim(),
              Host: projetoDoUsuario.host,
            }));

          setProjetosFiltrados(projetosArray);

          if (projetoDoUsuario.autorizadores) {
            autorizadoresArray = projetoDoUsuario.autorizadores
              .split(",")
              .map((email: string) => email.trim());

            setAutorizadoresDisponiveis(autorizadoresArray);
          }
        }

        // 2. Agora buscar os chamados
        const response = await axios.get(
          "https://gestor.saltsystems.com.br/api/v1/db/data/noco/p0umcrp64xsstvs/mbwqtchennwmuyf/views/vwz7fwmbxpfo2owt",
          {
            headers: {
              "xc-auth":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5kYUBzYWx0c3lzdGVtcy5jb20uYnIiLCJpZCI6InVzdWlubnRucnhiNXpsdGoiLCJyb2xlcyI6Im9yZy1sZXZlbC1jcmVhdG9yIiwidG9rZW5fdmVyc2lvbiI6IjgwNmIwOGU5YjNiY2QxMWMwZGYxNGNlN2Q2ZjEyNzdmY2RjMTM3MjBlZDE5NzEzNDBhMzVhYjY1YTdlNmMyYjEzYjUyZTlhNTBkYjk1YzJlIiwiaWF0IjoxNzQ0NzE1MjI2LCJleHAiOjE3NDQ3NTEyMjZ9.ySm5yDkMX4qeWAFV5QyFq_2g_fLDhWvJaUX0mJkFeiA",
            },
          }
        );

        const todosChamados = response.data.list || [];

        // 2. Agora buscar as atividades
        const response2 = await axios.get(
          "https://gestor.saltsystems.com.br/api/v1/db/data/noco/p0umcrp64xsstvs/msz4ah8kjjqcyrq/views/vw578sbtbcmq6yfp",
          {
            headers: {
              "xc-auth":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5kYUBzYWx0c3lzdGVtcy5jb20uYnIiLCJpZCI6InVzdWlubnRucnhiNXpsdGoiLCJyb2xlcyI6Im9yZy1sZXZlbC1jcmVhdG9yIiwidG9rZW5fdmVyc2lvbiI6IjgwNmIwOGU5YjNiY2QxMWMwZGYxNGNlN2Q2ZjEyNzdmY2RjMTM3MjBlZDE5NzEzNDBhMzVhYjY1YTdlNmMyYjEzYjUyZTlhNTBkYjk1YzJlIiwiaWF0IjoxNzQ0NzE1MjI2LCJleHAiOjE3NDQ3NTEyMjZ9.ySm5yDkMX4qeWAFV5QyFq_2g_fLDhWvJaUX0mJkFeiA",
            },
          }
        );

        const todasAtividades = response2.data.list || [];

        console.log("📦 Atividades:", todasAtividades);

        // 3. Filtrar chamados com base nos projetos do usuário
        const nomesProjetosUsuario = projetosArray.map((p) =>
          p.Nome.toLowerCase()
        );

        const chamadosFiltrados = todosChamados.filter((chamado: any) =>
          nomesProjetosUsuario.includes(chamado.projeto?.toLowerCase())
        );
        const atividadesFiltradas = todasAtividades.filter((atividade: any) =>
          nomesProjetosUsuario.includes(atividade.projeto?.toLowerCase())
        );

        setChamados(chamadosFiltrados);
        setAtividades(atividadesFiltradas);

        console.log("📦 Chamados filtrados:", chamadosFiltrados);
        console.log("📦 Atividades filtrados:", atividadesFiltradas);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const adicionarTarefa = async () => {
    try {
      const response = await axios.post(
        "https://gestor.saltsystems.com.br/api/v1/db/data/noco/p0umcrp64xsstvs/mbwqtchennwmuyf/views/vwz7fwmbxpfo2owt",
        {
          projeto: novaTarefa.projeto,
          descricao: novaTarefa.descricao,
          autorizador: novaTarefa.autorizador,
        },
        {
          headers: {
            "xc-auth":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5kYUBzYWx0c3lzdGVtcy5jb20uYnIiLCJpZCI6InVzdWlubnRucnhiNXpsdGoiLCJyb2xlcyI6Im9yZy1sZXZlbC1jcmVhdG9yIiwidG9rZW5fdmVyc2lvbiI6IjgwNmIwOGU5YjNiY2QxMWMwZGYxNGNlN2Q2ZjEyNzdmY2RjMTM3MjBlZDE5NzEzNDBhMzVhYjY1YTdlNmMyYjEzYjUyZTlhNTBkYjk1YzJlIiwiaWF0IjoxNzQ0NzE1MjI2LCJleHAiOjE3NDQ3NTEyMjZ9.ySm5yDkMX4qeWAFV5QyFq_2g_fLDhWvJaUX0mJkFeiA",
          },
        }
      );

      console.log("Tarefa adicionada com sucesso:", response.data);

      await fetchAll();

      setNovaTarefa({ projeto: "", descricao: "", autorizador: "" });
      alert("✅ Tarefa adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
    }
  };

  const isFormularioValido =
    novaTarefa.projeto.trim() !== "" &&
    novaTarefa.descricao.trim() !== "" &&
    novaTarefa.autorizador.trim() !== "";

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <S.App>
      <header className="App-header">
        <S.Title src={LogoSalt} alt="Logo Saltsystems" />

        <S.ContainerStyled maxWidth="sm">
          <S.Projeto>
            <InputLabel>Projeto</InputLabel>
            <Select
              label="Projeto"
              fullWidth
              value={novaTarefa.projeto}
              onChange={(event) =>
                setNovaTarefa({ ...novaTarefa, projeto: event.target.value })
              }
            >
              {projetosFiltrados.map((projeto) => (
                <MenuItem key={projeto.Id} value={projeto.Nome}>
                  {projeto.Nome}
                </MenuItem>
              ))}
            </Select>
          </S.Projeto>

          <TextField
            label="Descrição"
            size="medium"
            fullWidth
            value={novaTarefa.descricao}
            onChange={(event) =>
              setNovaTarefa({ ...novaTarefa, descricao: event.target.value })
            }
          />

          <S.Autorizador size="medium">
            <InputLabel>Autorizador</InputLabel>
            <Select
              value={novaTarefa.autorizador}
              label="Projeto"
              onChange={(event) =>
                setNovaTarefa({
                  ...novaTarefa,
                  autorizador: event.target.value,
                })
              }
              fullWidth
            >
              {autorizadoresDisponiveis.map((autorizador, index) => (
                <MenuItem key={index} value={autorizador}>
                  {autorizador}
                </MenuItem>
              ))}
            </Select>
          </S.Autorizador>

          <S.Botao
            variant="contained"
            onClick={adicionarTarefa}
            disabled={!isFormularioValido}
          >
            Adicionar tarefa
          </S.Botao>
        </S.ContainerStyled>
      </header>

      {/* limpado ate aqio */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Chamadas" {...a11yProps(0)} />
          <Tab label="Atividades" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <TableContainer component={Paper} sx={{ width: 900 }}>
            <Table sx={{ width: 900 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Projeto</StyledTableCell>
                  <StyledTableCell align="left">Descrição</StyledTableCell>
                  <StyledTableCell align="left">Autorizador</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chamados.map((chamado, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "100px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.projeto}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "200px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.descricao}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.autorizador}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "100px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.status}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper} sx={{ width: 900 }}>
            <Table sx={{ width: 900 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Projeto</StyledTableCell>
                  <StyledTableCell align="left">Descrição</StyledTableCell>
                  <StyledTableCell align="left">Autorizador</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {atividades.map((chamado, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "100px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.projeto}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "200px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.descricao}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.autorizador}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{
                        maxWidth: "100px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {chamado.status}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </S.App>
  );
}

export default Formulario;
