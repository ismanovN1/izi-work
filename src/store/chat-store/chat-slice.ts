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
  last_message: any;
  waiter_id: string;
  vacancy_id: any;
  resume_id: any;
  unread_count_e: number;
};

export interface ChatStateI {
  messages_count: number;
  unread_messages: { [keyof: string]: number };
  messages: Array<message_type>;
  current_chat?: chat_type;
  chat_list: Array<chat_type>;
}

const initialState: ChatStateI = {
  messages: [],
  messages_count: 0,
  chat_list: [],
  unread_messages: {},
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<any>) => {
      state.chat_list = action.payload;
    },
    setCountUnreadMessages: (state, action: PayloadAction<any>) => {
      state.unread_messages = action.payload;
    },
    incCountUnreadMessages: (state, { payload }: PayloadAction<string>) => {
      state.unread_messages[payload] = (state.unread_messages[payload] || 0) + 1;
      for (let index = 0; index < state.chat_list.length; index++) {
        if (state.chat_list[index]?._id === payload) {
          state.chat_list[index].unread_count_e = Number(state.chat_list[index].unread_count_e || 0) + 1;
          break;
        }
      }
    },
    resetCountUnreadMessages: (state, { payload }: PayloadAction<string>) => {
      state.unread_messages[payload] = 0;
      for (let index = 0; index < state.chat_list.length; index++) {
        if (state.chat_list[index]?._id === payload) {
          state.chat_list[index].unread_count_e = 0;
          break;
        }
      }
    },
    setMessagesCount: (state, action: PayloadAction<any>) => {
      state.messages_count = action.payload;
    },
    mark_as_read: (state) => {
      state.messages = state.messages.map((item) => {
        if (item.unread) return { ...item, unread: false };
        return item;
      });
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

export const {
  setChatList,
  setCurrentChat,
  addMessage,
  setMessages,
  addOldMessages,
  setMessagesCount,
  incCountUnreadMessages,
  setCountUnreadMessages,
  resetCountUnreadMessages,
  mark_as_read,
} = chatSlice.actions;

export default chatSlice.reducer;
