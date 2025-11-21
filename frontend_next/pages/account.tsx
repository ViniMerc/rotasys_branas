"use client";

import { useState } from "react";
import SignupWizard from "../app/components/SignupWizard";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function AccountPage() {
  const [wizard, setWizard] = useState(new SignupWizard());
  const router = useRouter();

  function reload(fn: any) {
    if (fn) fn();
    setWizard(clone(wizard));
  }

  const steps = ["Tipo de Conta", "Dados Pessoais", "Senha"];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push("/")}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <DirectionsCarIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RotaSys - Cadastro
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {!wizard.successMessage && (
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Stepper activeStep={wizard.step - 1} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Progresso
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={wizard.calculateProgress()}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {wizard.calculateProgress()}%
                </Typography>
              </Box>

              {wizard.errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {wizard.errorMessage}
                </Alert>
              )}

              {wizard.step === 1 && (
                <Box>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ mb: 2, fontSize: "1.1rem" }}>
                      Selecione o tipo de conta
                    </FormLabel>
                    <RadioGroup
                      value={
                        wizard.isPassenger
                          ? "passenger"
                          : wizard.isDriver
                          ? "driver"
                          : ""
                      }
                      onChange={(e) =>
                        reload(() => {
                          wizard.isPassenger = e.target.value === "passenger";
                          wizard.isDriver = e.target.value === "driver";
                          if (!wizard.isDriver) wizard.carPlate = "";
                        })
                      }
                    >
                      <FormControlLabel
                        value="passenger"
                        control={<Radio />}
                        label="Passageiro"
                      />
                      <FormControlLabel
                        value="driver"
                        control={<Radio />}
                        label="Motorista"
                      />
                    </RadioGroup>
                  </FormControl>

                  {wizard.isDriver && (
                    <TextField
                      fullWidth
                      label="Placa do carro"
                      value={wizard.carPlate}
                      onChange={(e) =>
                        reload(() => (wizard.carPlate = e.target.value))
                      }
                      sx={{ mt: 3 }}
                      inputProps={{ title: "carPlate" }}
                    />
                  )}

                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        reload(() => {
                          wizard.populateDriver();
                        })
                      }
                    >
                      Motorista Padrão
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        reload(() => {
                          wizard.populatePassenger();
                        })
                      }
                    >
                      Passageiro Padrão
                    </Button>
                  </Box>
                </Box>
              )}

              {wizard.step === 2 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Nome"
                    value={wizard.name}
                    onChange={(e) => reload(() => (wizard.name = e.target.value))}
                    inputProps={{ title: "Nome" }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={wizard.email}
                    onChange={(e) => reload(() => (wizard.email = e.target.value))}
                    inputProps={{ title: "Email" }}
                  />
                  <TextField
                    fullWidth
                    label="CPF"
                    value={wizard.cpf}
                    onChange={(e) => reload(() => (wizard.cpf = e.target.value))}
                    inputProps={{ title: "Cpf" }}
                  />
                </Box>
              )}

              {wizard.step === 3 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={wizard.password}
                    onChange={(e) =>
                      reload(() => (wizard.password = e.target.value))
                    }
                    inputProps={{ title: "Senha" }}
                  />
                  <TextField
                    fullWidth
                    label="Confirmação de senha"
                    type="password"
                    value={wizard.confirmPassword}
                    onChange={(e) =>
                      reload(() => (wizard.confirmPassword = e.target.value))
                    }
                    inputProps={{ title: "Confirmar" }}
                  />
                </Box>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={() => reload(() => wizard.back())}
                  disabled={wizard.step === 1}
                >
                  Anterior
                </Button>
                {wizard.step !== 3 && (
                  <Button
                    variant="contained"
                    onClick={() => reload(() => wizard.next())}
                  >
                    Próximo
                  </Button>
                )}
                {wizard.step === 3 && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      reload(() => {
                        wizard.confirm();
                        wizard.sendMessage();
                      })
                    }
                  >
                    Confirmar
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        )}

        {wizard.successMessage && (
          <Card elevation={3}>
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
              <Typography variant="h4" gutterBottom color="success.main">
                {wizard.successMessage}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  reload(() => {
                    wizard.restart();
                  })
                }
                sx={{ mt: 3 }}
              >
                Recomeçar
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}

function clone(obj: any) {
  var copy = new obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

export default AccountPage;
