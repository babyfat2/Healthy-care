// src/socket.ts
import { io } from 'socket.io-client';

// 🔧 Điều chỉnh URL server cho đúng
const socket = io('import.meta.env.VITE_DOMAIN', {
  transports: ['websocket'], // hoặc thêm 'polling' nếu cần
  autoConnect: true,
});

export default socket;
