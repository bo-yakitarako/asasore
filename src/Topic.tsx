import { Box, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { topicAtom } from './store';

const FONT_SIZE = 84;

export const Topic = () => {
  const topic = useAtomValue(topicAtom);
  return (
    <Box sx={{ width: 'fit-content', cursor: 'pointer' }}>
      <Typography sx={{ fontSize: FONT_SIZE, fontWeight: 'bold' }}>{topic}</Typography>
    </Box>
  );
};
