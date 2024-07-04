import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum";
import router from "../Routes";

export function Branding({ variant }: { variant: "desktop" | "mobile" }) {
  const typographyStyles = {
    mr: 2,
    display: {
      xs: variant === "mobile" ? "flex" : "none",
      md: variant === "desktop" ? "flex" : "none",
    },
    flexGrow: variant === "mobile" ? 1 : 0,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    variant: variant === "desktop" ? "h6" : "h5",
  };

  const forumIconStyles = {
    display: {
      xs: variant === "mobile" ? "flex" : "none",
      md: variant === "desktop" ? "flex" : "none",
    },
    mr: 1,
  };

  return (
    <>
      <ForumIcon sx={forumIconStyles} />
      <Typography
        sx={typographyStyles}
        component="a"
        onClick={() => (router as any).navigate("/")}
        noWrap
      >
        CHATTER
      </Typography>
    </>
  );
}
