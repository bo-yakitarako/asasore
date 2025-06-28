import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Topic } from './Topic';
import { AnswerTable } from './AnswerTable';
import { useWebSocket } from './hooks/useWebSocket';

const theme = createTheme({
  palette: { mode: 'dark' },
});

export const App = () => {
  useWebSocket();
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
