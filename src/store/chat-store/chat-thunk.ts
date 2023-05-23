import { setError, startLoadings, stopLoadings, removeError, setSuccess } from 'store/common-store/common-slice';
import { api } from 'api';
import { getErrorMessage } from 'helpers/common';
import { AppDispatch } from 'store';
import {
  addMessage,
  addOldMessages,
  resetCountUnreadMessages,
  setChatList,
  setCountUnreadMessages,
  setCurrentChat,
  setMessages,
  setMessagesCount,
} from './chat-slice';
import { CREATE_MESSAGE, GET_MESSAGES, GET_CHAT, GET_MY_CHATS } from './constants';

export const get_chat_thunk = (params: any, onSuccess?: (chatId: string) => void) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_CHAT));

  try {
    const res = await api.employer.chat.get_chat(params);
    if (res.status === 200 && res.data?._id) {
      onSuccess?.(res.data?._id);
      dispatch(setCurrentChat(res.data));
    }
  } catch (error) {
    dispatch(setError({ [GET_CHAT]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_CHAT));
  }
};

export const get_my_chats_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_MY_CHATS));

  try {
    const res = await api.employer.chat.get_my_chats();
    if (res.status === 200) {
      dispatch(setChatList(res.data));
      (async () => {
        dispatch(
          setCountUnreadMessages(
            res.data?.reduce((acc, item) => {
              if (item.unread_count_e) return { ...acc, [item._id]: item.unread_count_e };

              return acc;
            }, {}),
          ),
        );
      })();
    }
  } catch (error) {
    dispatch(setError({ [GET_MY_CHATS]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_MY_CHATS));
  }
};

export const get_messages_thunk = (params: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_MESSAGES));

  try {
    const res = await api.employer.chat.get_messages(params);
    if (res.status === 200) {
      dispatch(setMessages([...res.data].reverse()));
      dispatch(resetCountUnreadMessages(params?.chat_id));
    }
  } catch (error) {
    dispatch(setError({ [GET_MESSAGES]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_MESSAGES));
  }
};

export const create_message_thunk = (data: any, onSuccess: () => void) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(CREATE_MESSAGE));

  try {
    const res = await api.employer.chat.create_message(data);
    if (res.status === 200) {
      dispatch(addMessage(res.data));
      onSuccess?.();
    }
  } catch (error) {
    dispatch(setError({ [CREATE_MESSAGE]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(CREATE_MESSAGE));
  }
};
