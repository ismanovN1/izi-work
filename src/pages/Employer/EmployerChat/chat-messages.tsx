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
import { useNavigate } from 'react-router-dom';

export const ChatMessages: React.FC<any> = () => {
  const navigate = useNavigate();

  const { loadings } = useAppSelector((s) => s.common);
  const { user } = useAppSelector((s) => s.auth);
  const { messages, current_chat } = useAppSelector((s) => s.chat);

  const current_messages = useMemo(() => messages.slice(0, messages.length - 1), [messages]);

  const FirstMessage = useCallback(() => {
    const message = messages[messages.length - 1];
    const vacancy = current_chat?.vacancy_id || {};
    const MessageComponent = user._id === message._id ? MyMessage : MeMessage;
    return (
      <MessageComponent
        for_employer
        updated={moment(message?.created_at).format('HH:mm')}
        custom_element={
          <View
            maxWidth={312}
            class_name="pointer"
            onClick={() => {
              if (vacancy.status && vacancy._id) {
                if (vacancy.status === 'ARCHIVED') {
                  navigate(`/my-vacancies/archiv?vacancy_id=${vacancy._id}`);
                } else {
                  navigate(`/my-vacancies/${vacancy.status.toLowerCase()}?vacancy_id=${vacancy._id}`);
                }
              }
            }}
          >
            <View class_name="f-shrink-0 d-flex">
              <Image src={vacancy?.picture || ''} width={110} height={80} class_name="br-6 mr-18" />
              <View class_name="fdc mt-8">
                <Text DescriptionM>{vacancy?.category_name}</Text>
                <Text DescriptionB class_name="mt-4" red>
                  {formatSalary(vacancy?.salary_from, vacancy?.salary_to)}
                </Text>
              </View>
            </View>
            <Text Description class_name="mt-20">
              {message?.message}
            </Text>
          </View>
        }
        status={message?.unread ? 'unread' : 'readed'}
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
      {messages.length ? <FirstMessage /> : null}
    </View>
  );
};
