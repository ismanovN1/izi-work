import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type message_type = {
  _id: string;
  user_id: string;
  chat_id: string;
  created_at: string;
  unread: boolean;
  message: string;
};

type chat_type = {
  _id: string;
  employer_id: string;
  waiter_id: string;
  vacancy_id: any;
  resume_id: any;
};

export interface ChatStateI {
  messages_count: number;
  messages: Array<message_type>;
  current_chat?: chat_type;
  chat_list: Array<chat_type>;
}

const initialState: ChatStateI = {
  messages: [],
  messages_count: 0,
  chat_list: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<any>) => {
      state.chat_list = action.payload;
    },
    setMessagesCount: (state, action: PayloadAction<any>) => {
      state.messages_count = action.payload;
    },
    setCurrentChat: (state, action: PayloadAction<any>) => {
      state.current_chat = action.payload;
    },
    setMessages: (state, action: PayloadAction<any>) => {
      state.messages = action.payload;
    },
    addOldMessages: (state, action: PayloadAction<any>) => {
      state.messages = [...state.messages, ...action.payload];
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages = [action.payload, ...state.messages];
    },
  },
});

export const { setChatList, setCurrentChat, addMessage, setMessages, addOldMessages, setMessagesCount } =
  chatSlice.actions;

export default chatSlice.reducer;
