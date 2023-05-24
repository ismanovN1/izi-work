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
import { formatSalary } from 'helpers/common';

// Components

// helpers

const WaiterChatList: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Selectors
  const { chat_list } = useAppSelector((s) => s.chat);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(get_my_chats_thunk());
  }, []);

  const chat_list_memo = useMemo(
    () =>
      chat_list.filter((chat) => {
        return chat.last_message;
      }),
    [chat_list],
  );

  const ChatItem: React.FC<any> = ({ item }) => {
    console.log('itemchat', item);

    return (
      <View
        class_name={'vacancy-card '}
        onClick={() => {
          navigate(`/chat/${item._id}`);
        }}
      >
        <Image class_name="img" fit="cover" src={item?.vacancy_id?.picture} />
        <View class_name="info-block">
          <Text SubtitleM>{item?.vacancy_id?.category_name}</Text>
          <Text SubtitleM red class_name="mt-12">
            {formatSalary(item?.vacancy_id?.salary_from, item?.vacancy_id?.salary_to)}
          </Text>
          <Text DescriptionL class_name="mt-9 mb-5">
            {item?.last_message?.message}
          </Text>
          <Text SmallestL grey class_name={'last_message_time mt-5 t-align-right'}>
            {item.last_message?.created_at ? moment(item.last_message?.created_at).format('dd hh:mm') : '-'}
          </Text>
          {item.unread_count_w ? (
            <Text white SmallB class_name="unread_count w-22 h-22 br-11 pt-3 bg-red t-align-center">
              {item.unread_count_w}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View class_name="full-width fdc ph-20u pt-20 pb-100">
      <Input
        leftIcon={<Image src={search_icon_png} width={20} />}
        placeholder="Поиск чата"
        value={search}
        onChange={(t: any) => {
          setSearch(t.target.value);
        }}
      />
      {chat_list_memo
        .filter((item) => {
          return (item?.resume_id?.name || '').toUpperCase().includes(search.toUpperCase());
        })
        .map((item) => {
          return <ChatItem key={item._id} item={item} />;
        })}
    </View>
  );
};

export default WaiterChatList;
