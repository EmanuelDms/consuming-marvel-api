import { CssBaseline, Stack } from "@mui/material";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Stack
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <CssBaseline />
      <Component {...pageProps} />
    </Stack>
  );
}

export default MyApp;
