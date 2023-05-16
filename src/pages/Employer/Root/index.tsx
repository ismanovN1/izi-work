import React, { useMemo } from 'react';
import View from 'components/custom-components/View';
import NavBar from 'components/ui/NavBar';
import { Outlet, useMatch } from 'react-router-dom';
import { screen_height, uw } from 'helpers/common';
import Footer from 'components/home-components/Footer';
import { useAppSelector } from 'hooks';
import { isMobile } from 'react-device-detect';

const Root = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const home = useMatch('/employer');
  const personalsScreen = useMatch('/employer/personals/');
  const personalsInfoScreen = useMatch('/employer/personals/:id');

  const showFooter = useMemo(
    () => home || personalsInfoScreen || personalsScreen,
    [home, personalsInfoScreen, personalsScreen],
  );

  return (
    <View width="100%">
      <NavBar />
      <View height={isMobile ? 65 : 70} />
      <View minHeight={'100vh'} minWidth="100vw" class_name={`full-width  bg-white`}>
        <Outlet />
        {!showFooter ? null : <Footer />}
      </View>
    </View>
  );
};

export default Root;
