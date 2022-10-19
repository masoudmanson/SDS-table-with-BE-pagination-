import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "czifui";

const queryClient = new QueryClient();

import App from "./main";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <EmotionThemeProvider theme={defaultTheme}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  rootElement
);
