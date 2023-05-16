import React, { useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';

// Helpers & Utils
import { uw } from 'helpers/common';

// Images & Icons
import Logo from 'assets/icons/logo.svg';
import Remove from 'assets/icons/remove.svg';
import Menu from 'assets/icons/menu.svg';
import HeadphoneIcon from 'assets/icons/headphone.svg';
import JobIcon from 'assets/icons/job.svg';
import ChatIcon from 'assets/icons/chat.svg';
import ExitIcon from 'assets/icons/exit.svg';
import LoupeIcon from 'assets/icons/loupe.svg';
import CheckMarkIcon from 'assets/icons/check-mark.svg';

// Styles
import './index.scss';
import Text from 'components/custom-components/Text';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setCompanyData } from 'store/company-store/company-slice';
import { setIsAuth, setUser } from 'store/auth-store/auth-slice';
import { isMobile } from 'react-device-detect';

const close_menu = () => {
  const menu: any = document.getElementsByClassName('menu-container')[0];
  menu.style.display = 'none';
};

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    close_menu();
  }, [location.href]);

  return (
    <View class_name="nav_bar_container center">
      <View
        maxWidth={isAuth ? '100%' : 1100}
        width="100%"
        class_name={`nav-bar-inner-container space-b ${isAuth && !isMobile ? 'ph-40' : ''}`}
      >
        <NavLink to="/">
          <Logo />
        </NavLink>
        <View class_name="menu-container">
          {isAuth ? (
            <>
              <NavLink to="/employer/serach-candidates" className="mr-20 ph-10 br-8 bg-blue pointer center h-34">
                <LoupeIcon />
                <Text DescriptionB white class_name="ml-7">
                  Поиск кандидатов
                </Text>
              </NavLink>
              <NavLink
                to="/employer/my-vacancies"
                className={({ isActive }) => `mh-30 pointer d-flex aic color-${isActive ? 'blue' : 'black'}`}
              >
                <JobIcon />
                <Text DescriptionB class_name="ml-7 mt-5">
                  Мои вакансии
                </Text>
              </NavLink>
              <NavLink
                to="/employer/chat"
                className={({ isActive }) => `mh-30 pointer d-flex aic color-${isActive ? 'blue' : 'black'}`}
              >
                <ChatIcon />
                <Text DescriptionB class_name="ml-7 mt-5">
                  Чат
                </Text>
              </NavLink>
              <NavLink
                to="/employer/my-company"
                className={({ isActive }) => `mh-30 pointer d-flex aic color-${isActive ? 'blue' : 'black'}`}
              >
                <CheckMarkIcon />
                <Text DescriptionB class_name="ml-7 mt-5">
                  Моя компания
                </Text>
              </NavLink>
              <View width={1} height={70} class_name="bg-light-grey mh-70" />
              <NavLink to="/account/auth" className="ml-7 pointer d-flex aic">
                <HeadphoneIcon />
                <Text DescriptionB black class_name="ml-7 mt-5">
                  Поддержка
                </Text>
              </NavLink>
              <View
                class_name="ml-40 pointer center"
                onClick={() => {
                  dispatch(setCompanyData());
                  dispatch(setIsAuth(false));
                  dispatch(setUser(undefined));
                  localStorage.removeItem('@user_data');
                  localStorage.removeItem('@token');
                  navigate('/');
                  close_menu();
                }}
              >
                <ExitIcon />
                <Text DescriptionB black class_name="ml-7 mt-5">
                  Выход
                </Text>
              </View>
            </>
          ) : (
            <>
              <NavLink to="personals" className="ph-12 pointer">
                <Text DescriptionB black>
                  Нанять за 24 часа
                </Text>
              </NavLink>
              <NavLink to="/account/registr" className="ph-12 pointer">
                <Text DescriptionB black>
                  Создать вакансию
                </Text>
              </NavLink>
              <NavLink to="/account/registr" className="ph-12 pointer">
                <Text DescriptionB black>
                  Регистрация
                </Text>
              </NavLink>
              <NavLink to="/account/auth" className="ph-12 pointer">
                <Text DescriptionB black>
                  Войти
                </Text>
              </NavLink>
            </>
          )}
          <View class_name="close-button" onClick={close_menu}>
            <Remove />
          </View>
        </View>
        <View
          class_name="menu-button"
          onClick={() => {
            const menu: any = document.getElementsByClassName('menu-container')[0];
            menu.style.display = 'flex';
          }}
        >
          <Menu />
        </View>
      </View>
    </View>
  );
};

export default NavBar;
