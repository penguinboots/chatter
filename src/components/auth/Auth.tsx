import { Button, Stack, TextField } from "@mui/material";

export default function Auth() {
  return (
    <Stack>
      <TextField type="email" label="Email" />
      <TextField type="password" label="Password" />
      <Button>Login</Button>
    </Stack>
  );
}
