import React, { useEffect, useState } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { Outlet, useMatch } from 'react-router-dom';

// helpers
import { screen_height } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_my_vacancies_thunk } from 'store/vacancies-store/vacancies-thunk';
import { get_my_favorite_resumes_ids_thunk } from 'store/action-store/action-thunk';
import ChatList from './chat_list';

const EmployerChat = () => {
  const main = useMatch('/my-vacancies');
  const dispatch = useAppDispatch();

  // Selectors

  const { my_archived_vacancies, my_active_vacancies, my_closed_vacancies } = useAppSelector((s) => s.vacancies);

  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    dispatch(get_my_vacancies_thunk());
    dispatch(get_my_favorite_resumes_ids_thunk());
  }, []);

  useEffect(() => {
    if (main) setActiveLink(null);
  }, [main]);

  return (
    <View class_name="full-width d-flex aifs ">
      <View width={125} class_name="f-shrink-1" />
      <View card width={275} height={screen_height - 180} class_name="f-shrink-0 p-10 mt-60">
        <ChatList />
      </View>
      <View height={screen_height - 180} width="100%" class_name="mt-60">
        <Outlet />
      </View>
      <View width={125} class_name="f-shrink-1" />
    </View>
  );
};

export default EmployerChat;
