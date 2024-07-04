import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Branding } from "./Branding";
import { MobileHamburger } from "./MobileHamburger";
import { Navigation } from "./Navigation";
import { SettingsHamburger } from "./SettingsHamburger";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";
import { Page } from "../../interfaces/page.interface";

const pages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const unauthenticatedPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
];

const settings = ["Logout"];

function Header() {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding variant="desktop" />
          <MobileHamburger
            pages={authenticated ? pages : unauthenticatedPages}
          />
          <Branding variant="mobile" />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />

          {authenticated && <SettingsHamburger settings={settings} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
