import React, { useEffect, useState, useMemo } from 'react';
import Input from 'components/custom-components/Input';
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import { search_icon_png } from 'assets/icons/personals-icons';
import Text from 'components/custom-components/Text';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_my_chats_thunk } from 'store/chat-store/chat-thunk';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

// Components

// helpers

const ChatList: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Selectors
  const { chat_list } = useAppSelector((s) => s.chat);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(get_my_chats_thunk());
  }, []);

  const ChatItem: React.FC<any> = ({ item }) => {
    const { chatId } = useParams();

    return (
      <View
        bg={chatId === item._id ? '#E6F3F6' : '#F9F9FA'}
        class_name="ph-10 h-52 d-flex aic relative mt-10 br-10 ovf-hidden"
        onClick={() => {
          navigate(item._id);
        }}
      >
        <Image src={item?.resume_id?.picture} class_name="w-40 h-40 br-20 mr-10" />
        <View class_name="fdc">
          <Text Description>{item?.resume_id?.name}</Text>
          <Text ExtraSmallM grey class_name="white-space-nowrap">
            {item?.last_message?.message}
          </Text>
        </View>
        <Text class_name="chat-item-created-date" Small grey>
          {item.created_at ? moment(item.created_at).format('dd hh:mm') : 'sd'}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Input
        leftIcon={<Image src={search_icon_png} width={20} />}
        placeholder="Поиск чата"
        class_name="flex-1"
        value={search}
        onChange={(t: any) => {
          setSearch(t.target.value);
        }}
      />
      {chat_list
        .filter((item) => {
          return (item?.resume_id?.name || '').toUpperCase().includes(search.toUpperCase());
        })
        .map((item) => {
          return <ChatItem key={item._id} item={item} />;
        })}
    </View>
  );
};

export default ChatList;
