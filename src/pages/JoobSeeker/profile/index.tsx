import React, { useState, useCallback } from 'react';

import View from 'components/custom-components/View';
import { useAppSelector } from 'hooks';
import Text from 'components/custom-components/Text';
import Pen from 'assets/icons/pen.svg';
import ChangePass from './change-pass';
import ChangeInfo from './change-info';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [mode, setMode] = useState<'MY_INFO' | 'CHANGE_INFO' | 'CHANGE_PASS'>('MY_INFO');

  const RenderInfo = useCallback(
    ({ title, children }) => {
      return (
        <View class_name="mb-19 fdc">
          <Text class_name="mb-8" color="#868F90B2" Description>
            {title}
          </Text>
          <Text SubtitleM>{children}</Text>
        </View>
      );
    },
    [user],
  );

  if (mode === 'CHANGE_PASS') return <ChangePass setMode={setMode} />;
  if (mode === 'CHANGE_INFO') return <ChangeInfo setMode={setMode} />;

  return (
    <View width="100%" minHeight="calc(100vh - 65px)" class_name="ovf-hidden ph-20u">
      <View class_name="mv-20 space-b">
        <Text BodyBlack>Мои данные</Text>
        <View class_name="pointer" onClick={() => setMode('CHANGE_INFO')}>
          <Pen />
        </View>
      </View>
      <RenderInfo title="Имя">{user.name}</RenderInfo>
      <RenderInfo title="E-mail">{user.email}</RenderInfo>
      <RenderInfo title="Телефон">{user.phone ? `+${user.phone}` : ''}</RenderInfo>
      <Text class_name="text-decoration-underline pointer" blue Description onClick={() => setMode('CHANGE_PASS')}>
        Изменить пароль
      </Text>
    </View>
  );
};

export default Profile;
