import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { membersAtom, votesAtom } from './store';

type Schema = { topic: string };

const FONT_SIZE = 84;
const DEFAULT_TOPIC = 'ここにお題が出るぜぇ？';

export const Topic = () => {
  const setMembers = useSetAtom(membersAtom);
  const setVotes = useSetAtom(votesAtom);
  const [isEdit, setIsEdit] = useState(false);
  const [topic, setTopic] = useState(DEFAULT_TOPIC);
  const { register, handleSubmit } = useForm<Schema>({
    mode: 'onSubmit',
    defaultValues: { topic: DEFAULT_TOPIC },
  });

  if (!isEdit) {
    return (
      <Box sx={{ width: 'fit-content', cursor: 'pointer' }} onClick={() => setIsEdit(true)}>
        <Typography sx={{ fontSize: FONT_SIZE, fontWeight: 'bold' }}>{topic}</Typography>
      </Box>
    );
  }

  const onSubmit = (data: Schema) => {
    setTopic(data.topic);
    setIsEdit(false);
    setMembers([]);
    setVotes([]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 1 }}>
      <StyledTextField {...register('topic')} size="small" variant="standard" />
      <Button type="submit" variant="outlined" sx={{ fontSize: 48 }}>
        更新
      </Button>
    </Box>
  );
};

const StyledTextField = styled(TextField)(() => ({
  width: '1440px',
  '& .MuiInputBase-input': {
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
  },
  '& .MuiInputLabel-root': {
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
  },
  '& .MuiFormHelperText-root': {
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
  },
}));
