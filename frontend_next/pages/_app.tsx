import type { AppProps } from "next/app";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B35", // Orange-red from movitech logo (m, o)
      light: "#FF8C5A",
      dark: "#E55A2B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6A1B9A", // Purple from movitech logo (t, e, c, h)
      light: "#9C4EDD",
      dark: "#4A148C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFF5F5", // Light pink/peach background from movitech
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C2C2C",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #FF6B35 0%, #6A1B9A 100%)", // Gradient matching movitech logo
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: "linear-gradient(90deg, #FF6B35 0%, #6A1B9A 100%)",
          "&:hover": {
            background: "linear-gradient(90deg, #E55A2B 0%, #4A148C 100%)",
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

