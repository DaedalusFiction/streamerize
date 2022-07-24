import { createTheme } from "@mui/material";
import audiowide from "../fonts/audiowide.ttf";
import robotoMono from "../fonts/robotoMono.ttf";

let primary = createTheme({
    borderRadius: "15px",
    palette: {
        background: {
            default: "#F8F0FB",
        },
        text: {
            primary: "#211A1D",
            // primary: "#82D173",
            secondary: "#8075FF",
            // secondary: "#ABFAA9",
        },
        primary: {
            // main: "#F64740",
            main: "#ed254e",
        },
        secondary: {
            // main: "#3A86FF",
            main: "#0C7C59",
        },
        custom: {
            accent: "#8075FF",
        },
    },
    typography: {
        primary: {
            main: "robotoMono",
            accent: "audiowide",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'audiowide';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('audiowide'), local('audiowide-regular'), url(${audiowide}) format('truetype');
        }
        @font-face {
          font-family: 'robotoMono';
          font-style: normal;
          font-display: swap;
          src: local('robotoMono'), local('robotoMono-regular'), url(${robotoMono}) format('truetype');
        }
      `,
        },
    },
});

primary = createTheme(primary, {
    typography: {
        h1: {
            fontFamily: primary.typography.primary.accent,
            color: primary.palette.text.secondary,
            fontSize: "clamp(2.5rem, 4vw, 5rem)",
        },
        h2: {
            fontFamily: primary.typography.primary.main,
            color: primary.palette.text.secondary,
            fontSize: "1rem",
        },
    },
});

export { primary };
