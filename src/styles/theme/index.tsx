import { ThemeProvider } from "@mui/material";
import lightThemeOptions from "./lightThemeOptions";

interface Props {
  children: React.ReactNode;
}

const MyThemeProvider: React.FunctionComponent<Props> = ({ children }) => {
  return <ThemeProvider theme={lightThemeOptions}>{children}</ThemeProvider>;
};

export default MyThemeProvider;
