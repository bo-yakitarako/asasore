import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const FONT_SIZE = 40;

export const AnswerTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '780px',
        mt: '32px',
        scrollbarWidth: 'none',
      }}
    >
      <Table stickyHeader sx={{}}>
        <TableHead>
          <TableRow sx={{ overflow: 'hidden' }}>
            <TableCell sx={{ fontSize: FONT_SIZE, p: 4 }}>番号</TableCell>
            <TableCell sx={{ fontSize: FONT_SIZE, p: 4 }}>名前</TableCell>
            <TableCell sx={{ fontSize: FONT_SIZE, p: 4 }}>回答</TableCell>
            <TableCell align="right" sx={{ fontSize: FONT_SIZE, p: 4 }}>
              投票数
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontSize: FONT_SIZE, p: 3 }}>1</TableCell>
            <TableCell sx={{ fontSize: FONT_SIZE, p: 3 }}>しんにじえも</TableCell>
            <TableCell sx={{ fontSize: FONT_SIZE, p: 3 }}></TableCell>
            <TableCell align="right" sx={{ fontSize: FONT_SIZE, p: 3 }}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
