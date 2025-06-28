import { useEffect } from 'react';
import type { OneCommeEvent } from '../onecomme';

const ws = new WebSocket('ws://127.0.0.1:11180/sub?p=comments,deleted,clear');
ws.onopen = (event) => {
  console.log('open', event);
};

export const useWebSocket = () => {
  useEffect(() => {
    ws.onmessage = (event) => {
      const { data, type } = JSON.parse(event.data) as OneCommeEvent;
      console.log(data, type);
      switch (type) {
        case 'connected':
          console.log('connected', data.comments);
          break;
        case 'comments':
          console.log('comments', data.comments);
          break;
      }
    };
  }, []);
};
