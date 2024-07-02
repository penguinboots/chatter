import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Auth from "./components/auth/Auth";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <h1>Chatter UI</h1>
        <Auth />
      </Container>
    </ThemeProvider>
  );
}

export default App;
