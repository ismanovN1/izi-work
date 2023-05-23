import React, { useEffect, useState } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { Outlet, useNavigate, useMatches, NavLink, useMatch } from 'react-router-dom';

// helpers
import { screen_height } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_my_vacancies_thunk } from 'store/vacancies-store/vacancies-thunk';
import { get_my_favorite_resumes_ids_thunk } from 'store/action-store/action-thunk';
import './index.scss';

const MyVacancies = () => {
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

  useEffect(() => {
    if (main) setActiveLink(null);
  }, [main]);

  const RenderTab: React.FC<{ children: React.ReactNode; count?: number; link: string }> = ({
    children,
    link,
    count,
    ...restProps
  }) => {
    return (
      <NavLink
        to={link}
        className={({ isActive }) => {
          if (isActive) setActiveLink(link);
          return `full-width h-52 bg-${isActive ? 'blue' : 'ghost'} color-${
            isActive ? 'white' : 'black'
          } br-8 space-b mb-10 ph-10 pointer`;
        }}
        {...restProps}
      >
        <Text Subtitle>{children}</Text>
        <Text Subtitle color={activeLink === link ? '#fff' : '#868F90'}>
          {count || ''}
        </Text>
      </NavLink>
    );
  };
  return (
    <View class_name="full-width d-flex aifs my-vacancies">
      <View width={125} class_name="f-shrink-1 d-none-on-mobile" />
      <View
        card
        width={275}
        height={screen_height - 180}
        class_name={`vacancies-navaigation f-shrink-0 p-10 mt-60 ${main ? '' : 'd-none-on-mobile'}`}
      >
        <RenderTab link="create">Разместить работу</RenderTab>
        <RenderTab link="responses">Отклики на вакансии</RenderTab>
        <RenderTab link="active?type=3" count={my_active_vacancies.length}>
          Активные вакансии
        </RenderTab>
        <RenderTab link="closed" count={my_closed_vacancies.length}>
          Закрытые вакансии
        </RenderTab>
        <RenderTab link="archive" count={my_archived_vacancies.length}>
          Вакансии в архиве
        </RenderTab>
      </View>
      <View height={screen_height - 120} width="100%">
        <Outlet />
      </View>
      <View width={125} class_name="f-shrink-1 d-none-on-mobile" />
    </View>
  );
};

export default MyVacancies;
