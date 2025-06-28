import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { membersAtom, votesAtom } from './store';

const FONT_SIZE = 40;

export const AnswerTable = () => {
  const members = useAtomValue(membersAtom);
  const votes = useAtomValue(votesAtom);
  const voteCounts = members.map(
    ({ memberId }) => votes.filter(({ targetMemberId }) => memberId === targetMemberId).length,
  );
  const maxVoteCount = Math.max(...voteCounts);
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: '32px',
        height: '780px',
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
        <TableBody sx={{ overflow: 'auto', height: '100%', width: '100%' }}>
          {members.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ fontSize: '96px', height: '690px', textAlign: 'center' }}
              >
                みんなの回答をお待ちするぜぇ？
              </TableCell>
            </TableRow>
          ) : (
            <>
              {members.map(({ memberId, name, answer }, index) => (
                <TableRow key={memberId}>
                  <ColoredTableCell
                    ismax={
                      maxVoteCount > 0 && voteCounts[index] === maxVoteCount ? 'true' : 'false'
                    }
                    sx={{ fontSize: FONT_SIZE, p: 3 }}
                  >
                    {index + 1}
                  </ColoredTableCell>
                  <ColoredTableCell
                    ismax={
                      maxVoteCount > 0 && voteCounts[index] === maxVoteCount ? 'true' : 'false'
                    }
                    sx={{ fontSize: FONT_SIZE, p: 3 }}
                  >
                    {name}
                  </ColoredTableCell>
                  <ColoredTableCell
                    ismax={
                      maxVoteCount > 0 && voteCounts[index] === maxVoteCount ? 'true' : 'false'
                    }
                    sx={{ fontSize: FONT_SIZE, p: 3 }}
                  >
                    {answer}
                  </ColoredTableCell>
                  <ColoredTableCell
                    align="right"
                    ismax={
                      maxVoteCount > 0 && voteCounts[index] === maxVoteCount ? 'true' : 'false'
                    }
                    sx={{ fontSize: FONT_SIZE, p: 3 }}
                  >
                    {voteCounts[index]}
                  </ColoredTableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ColoredTableCell = styled(TableCell)<{ ismax: 'true' | 'false' }>(({ theme, ismax }) => ({
  color: ismax === 'true' ? theme.palette.success.main : undefined,
}));
