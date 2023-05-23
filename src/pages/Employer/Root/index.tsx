import React, { useMemo, useEffect } from 'react';
import View from 'components/custom-components/View';
import NavBar from 'components/ui/NavBar';
import { Outlet, useMatch } from 'react-router-dom';
import { screen_height, uw } from 'helpers/common';
import Footer from 'components/home-components/Footer';
import { useAppDispatch, useAppSelector } from 'hooks';
import { isMobile } from 'react-device-detect';
import { get_my_vacancies_thunk } from 'store/vacancies-store/vacancies-thunk';
import { get_my_favorite_resumes_ids_thunk } from 'store/action-store/action-thunk';

const Root = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const home = useMatch('/');
  const dispatch = useAppDispatch();
  const personalsScreen = useMatch('/personals/');
  const personalsInfoScreen = useMatch('/personals/:id');

  useEffect(() => {
    if (isAuth) {
      dispatch(get_my_vacancies_thunk());
      dispatch(get_my_favorite_resumes_ids_thunk());
    }
  }, [isAuth]);

  const showFooter = useMemo(
    () => home || personalsInfoScreen || personalsScreen,
    [home, personalsInfoScreen, personalsScreen],
  );

  return (
    <View width="100%">
      <NavBar />
      <View class_name="navbar-stand" />
      <View minHeight={'calc(100vh - 70px)'} minWidth="100vw" class_name={`full-width  bg-white`}>
        <Outlet />
        {!showFooter ? null : <Footer />}
      </View>
    </View>
  );
};

export default Root;
