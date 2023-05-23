import React, { useLayoutEffect } from 'react';

import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import UploadFileArea from 'components/custom-components/UploadFileArea';
import CameraIcon from 'assets/icons/camera.svg';

import './account-components-styles.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setIsAuth, setUser } from 'store/auth-store/auth-slice';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { setResume } from 'store/resume-store/resume-slice';

const AccountCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (!user) {
      redirect('/waiter/auth');
    }
  }, []);

  return (
    <View class_name="account-card">
      <View class_name="info-area">
        <Text blue SubtitleM>
          Личный кабинет
        </Text>
        <View class_name="d-flex aic mt-15">
          <View class_name="avatar">
            <UploadFileArea width={122} height={122} onChange={(photo) => dispatch(setUser({ ...user, photo }))}>
              <View class_name="center">{<CameraIcon />}</View>
            </UploadFileArea>
          </View>
          <Text SubtitleBlack>{user.name?.replace(' ', '\n')}</Text>
        </View>
      </View>
      <View class_name="buttons-area ">
        <NavLink to="/profile" className="flex-1 center pointer">
          <Text SubtitleM blue>
            Мои данные
          </Text>
        </NavLink>
        <View class_name="wall" />
        <View
          class_name="flex-1 center pointer"
          onClick={() => {
            dispatch(setUser(undefined));
            dispatch(setResume(undefined));
            dispatch(setIsAuth(false));
            localStorage.removeItem('@token');
            localStorage.removeItem('@user_data');
            navigate('/');
          }}
        >
          <Text SubtitleM red>
            Выход
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AccountCard;
