import { useReactiveVar } from "@apollo/client";
import { Snackbar as MUISnackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { snackVar } from "../../constants/snack";

export default function Snackbar() {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <MUISnackbar
          open={!!snack}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snack.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </MUISnackbar>
      )}
    </>
  );
}
