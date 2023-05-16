import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from 'router';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'styles/main.scss';
import { useAppDispatch } from 'hooks';
import { get_categories_thunk } from 'store/common-store/common-thunk';
import { instance } from 'api/init';
import { setIsAuth, setUser } from 'store/auth-store/auth-slice';
import View from 'components/custom-components/View';
import { RingLoader } from 'react-spinners';
import SocketWrapper from './SocketWrapper';

const App = () => {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('@token');
      const user_data = localStorage.getItem('@user_data');
      if (token && user_data) {
        instance.defaults.headers.common.Authorization = token;
        dispatch(setIsAuth(true));
        dispatch(setUser(JSON.parse(user_data)));
      }
      dispatch(get_categories_thunk());
      setLoaded(true);
    })();
  }, []);

  if (!loaded)
    return (
      <View class_name="full-w center" height="100vh">
        <RingLoader color="#36d7b7" />
      </View>
    );

  return (
    <SocketWrapper>
      <RouterProvider router={router} />
    </SocketWrapper>
  );
};
export default App;
