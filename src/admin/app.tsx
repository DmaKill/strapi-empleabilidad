const favicon = require("./extensions/favicon.png");
const logo = require("./extensions/favicon.png");

export default {
  config: {
    locales: ["es"],
    head: {
      favicon,
    },
    auth: {
      logo,
    },
    menu: {
      logo,
    },
    theme: {
      light: {
        colors: {
          primary100: "#F2F2F2", //
          primary600: "#EB1E00", //
          primary700: "#EB1E00", //
          buttonNeutral0: "#FFFFFF", //
          buttonPrimary500: "#F03636", //
          buttonPrimary600: "#EB1E00", //
        },
      },
      dark: {
        colors: {
          primary100: "#F2F2F2", // fondo botones
          primary600: "#e3604d", //
          primary700: "#EB1E00", //
          buttonNeutral0: "#FFFFFF", // texto para boton principal
          buttonPrimary500: "#F03636", // botones principales bg hover
          buttonPrimary600: "#EB1E00", // botones principales bg
        },
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
