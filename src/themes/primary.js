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
            main: "#F64740",
        },
        secondary: {
            main: "#3A86FF",
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
            fontFamily: primary.typography.primary.accent,
        },
        h3: {
            fontFamily: primary.typography.primary.accent,
        },
        h5: {
            color: primary.palette.text.secondary,
            fontWeight: "bold",
            // fontSize: "clamp(1rem, 2vw, 5rem)",
        },
        h6: {
            fontWeight: "bold",
        },
        subtitle1: {
            color: primary.palette.custom.darkMuted,
        },
        subtitle2: {
            color: primary.palette.custom.darkMuted,
        },
    },
});

export { primary };
