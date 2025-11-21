"use client";

import RideRequest from "@/app/components/RideRequest";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LoginIcon from "@mui/icons-material/Login";
import RideIcon from "@mui/icons-material/Directions";

function RidePage() {
  const [ride, setRide] = useState(new RideRequest());
  const router = useRouter();

  async function reload(fn: any) {
    if (fn) {
      await fn();
    }
    const cloneData = clone(ride);
    setRide(cloneData);
  }

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
            RotaSys - Solicitar Corrida
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Progresso
              </Typography>
              <LinearProgress variant="determinate" value={0} sx={{ height: 8, borderRadius: 4 }} />
            </Box>

            {!ride.accountId && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Faça login para solicitar uma corrida
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={ride.email}
                    onChange={(e) => {
                      reload(() => (ride.email = e.target.value));
                    }}
                    inputProps={{ title: "Email" }}
                  />
                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={ride.password}
                    onChange={(e) => {
                      reload(() => (ride.password = e.target.value));
                    }}
                    inputProps={{ title: "Password" }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<LoginIcon />}
                  onClick={() =>
                    reload(() => {
                      ride.login();
                      ride.updateId();
                    })
                  }
                >
                  Login
                </Button>
              </Box>
            )}

            {ride.accountId && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                  <RideIcon />
                  Informações da Corrida
                </Typography>

                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Origem
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Latitude"
                      value={-27.584905257808835}
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Longitude"
                      value={-48.545022195325124}
                      disabled
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Destino
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Latitude"
                      value={-27.496887588317275}
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Longitude"
                      value={-48.522234807851476}
                      disabled
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="ID do Motorista"
                    value={ride.driverId}
                    disabled
                    helperText="O motorista será atribuído automaticamente"
                  />
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<RideIcon />}
                  onClick={() =>
                    reload(() => {
                      ride.requestRide();
                    })
                  }
                >
                  Solicitar Corrida
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
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

export default RidePage;
