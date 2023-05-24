import React, { useEffect, useMemo, useRef } from 'react';
import View from 'components/custom-components/View';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from 'assets/icons/logo.svg';
import PersonIcon from 'assets/icons/avatar_logo.svg';
import LocationIcon from 'assets/icons/location_icon_blue.svg';
import { useAppDispatch, useAppSelector, useScrollToTop } from 'hooks';
import Image from 'components/custom-components/Image';
import { isMobile } from 'react-device-detect';
import { get_my_resume_thunk } from 'store/resume-store/resume-thunk';
import { get_my_favorite_vacancies_thunk } from 'store/vacancies-store/vacancies-thunk';
import Text from 'components/custom-components/Text';

const JoobSeekerRootPage = () => {
  const navRef = useRef(null);

  const dispatch = useAppDispatch();

  const { unread_messages } = useAppSelector((state) => state.chat);

  const { user, isAuth } = useAppSelector((state) => state.auth);

  useScrollToTop();

  const unread_count = useMemo(
    () => Object.values(unread_messages).reduce((a: number, b) => a + b, 0),
    [unread_messages],
  );

  useEffect(() => {
    if (isAuth) {
      dispatch(get_my_resume_thunk());
      dispatch(get_my_favorite_vacancies_thunk());
    }
  }, [isAuth]);

  return (
    <View width="100%">
      <div className="center nav_bar_container">
        <View class_name="space-b ph-20u full-width" maxWidth={752}>
          <NavLink to="">
            <Logo />
          </NavLink>
          <View class_name="d-flex aic">
            <NavLink to="search-map" className="pointer mr-20">
              <LocationIcon />
            </NavLink>
            <NavLink to={user ? 'account' : 'auth'} className="pointer relative">
              {user?.photo ? <Image class_name="br-15 w-30 h-30" src={user.photo} /> : <PersonIcon />}
              {unread_count ? (
                <Text white class_name="notification_count w-16 h-16 br-8 bg-red t-align-center" Small>
                  {unread_count}
                </Text>
              ) : null}
            </NavLink>
          </View>
        </View>
      </div>
      <View height={isMobile ? 65 : 70} />
      <View class_name="full-width hide-scrollbar bg-bright_grey d-flex ais jcc">
        <View class_name="full-width bg-white" height="max-content" minHeight="calc(100vh - 70px)" maxWidth={752}>
          <Outlet />
        </View>
      </View>
    </View>
  );
};

export default JoobSeekerRootPage;
