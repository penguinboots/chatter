import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Branding } from "./Branding";
import { MobileHamburger } from "./MobileHamburger";
import { Navigation } from "./Navigation";
import { SettingsHamburger } from "./SettingsHamburger";

const pages: string[] = ["Profile", "Messages"];
const settings = ["Logout"];

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding variant="desktop" />
          <MobileHamburger pages={pages} />
          <Branding variant="mobile" />
          <Navigation pages={pages} />
          <SettingsHamburger settings={settings} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
