import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Topic } from './Topic';
import { AnswerTable } from './AnswerTable';

const theme = createTheme({
  palette: { mode: 'dark' },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: '32px' }}>
        <Topic />
        <AnswerTable />
      </Box>
    </ThemeProvider>
  );
};
