const favicon = require("./extensions/favicon.png");
const logo = require("./extensions/uv_logo.png");

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
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to Univalle!",
        "Auth.form.welcome.subtitle": "Log in to your Admin app",
      },
      es: {
        "Auth.form.welcome.title": "Bienvenido",
        "Auth.form.welcome.subtitle": "Ruta de la Empleabilidad",
        "app.components.LeftMenu.navbrand.title": "Dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Empleabilidad",
      },
    }
  },
  bootstrap(app) {
    console.log(app);
  },
};
