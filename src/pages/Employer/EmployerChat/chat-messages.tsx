import React, { useMemo, useCallback } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { MyMessage } from 'components/chat-components/my-message';
import { MeMessage } from 'components/chat-components/me-message';

// Helpers & Utils
import moment from 'moment';

// Images & Icons
import Image from 'components/custom-components/Image';

// Styles
import './index.scss';
import { useAppSelector } from 'hooks';
import { formatSalary } from 'helpers/common';
import { CREATE_MESSAGE } from 'store/chat-store/constants';
import { MoonLoader } from 'react-spinners';

export const ChatMessages: React.FC<any> = () => {
  const { loadings } = useAppSelector((s) => s.common);
  const { user } = useAppSelector((s) => s.auth);
  const { messages, current_chat } = useAppSelector((s) => s.chat);
  console.log(current_chat);

  const current_messages = useMemo(
    () => (messages[messages.length - 1]?.user_id !== user._id ? messages.slice(0, messages.length - 1) : messages),
    [messages],
  );

  const FirstMessage = useCallback(() => {
    return (
      <MeMessage
        for_employer
        updated={moment(messages[messages.length - 1]?.created_at).format('HH:mm')}
        custom_element={
          <View maxWidth={312}>
            <View class_name="f-shrink-0 d-flex">
              <Image src={current_chat?.vacancy_id?.picture || ''} width={110} height={80} class_name="br-6 mr-18" />
              <View class_name="fdc mt-8">
                <Text DescriptionM>{current_chat?.vacancy_id?.category_name}</Text>
                <Text DescriptionB class_name="mt-4" red>
                  {formatSalary(current_chat?.vacancy_id?.salary_from, current_chat?.vacancy_id?.salary_to)}
                </Text>
              </View>
            </View>
            <Text Description class_name="mt-20">
              {messages[messages.length - 1]?.message}
            </Text>
          </View>
        }
        status={messages[messages.length - 1]?.unread ? 'unread' : 'readed'}
      />
    );
  }, [current_chat, messages]);
  return (
    <View class_name="chat-body scroll_bar_usual">
      {loadings[CREATE_MESSAGE] ? (
        <View class_name="pv-10 ph-15 full-w d-flex jce">
          <MoonLoader color="#038CA9" size={32} />
        </View>
      ) : null}
      {current_messages?.map((item) =>
        item.user_id === user._id ? (
          <MyMessage
            for_employer
            key={item._id}
            message={item.message}
            updated={moment(item.created_at).format('hh:mm')}
            status={item.unread ? 'unread' : 'readed'}
          />
        ) : (
          <MeMessage
            for_employer
            key={item._id}
            message={item.message}
            updated={moment(item.created_at).format('hh:mm')}
          />
        ),
      )}
      {messages[messages.length - 1]?.user_id !== user._id ? <FirstMessage /> : null}
    </View>
  );
};
