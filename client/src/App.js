import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {HomePage, LoginPage, ProfilePage, Welcome} from "./scenes/index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode]);
  const uAuth = useSelector(state => state.token);
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {
              uAuth === null ? (
                <>
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/" element={<Welcome />}/>
                </>
              ) : (
                <>
                  <Route path="/" element={<HomePage />}/>
                  <Route path="/profile/:UserId" element={<ProfilePage />}/>
                </>
            )}
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
