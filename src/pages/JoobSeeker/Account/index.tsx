import React, { useEffect, useMemo } from 'react';

import View from 'components/custom-components/View';
import AccountCard from 'components/account-components/account-card';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

import ChatIcon from 'assets/icons/chat-icon.svg';
import CreateResumeIcon from 'assets/icons/create-resume-icon.svg';
import MyResponseIcon from 'assets/icons/my-response-icon.svg';
import FavoriteIcon from 'assets/icons/favorite-icon-white.svg';
import ResumeIcon from 'assets/icons/resume.svg';
import CodingIcon from 'assets/icons/coding.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_my_resume_thunk } from 'store/resume-store/resume-thunk';
import { GET_MY_RESUME } from 'store/resume-store/constans';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resume } = useAppSelector((state) => state.resume);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { unread_messages } = useAppSelector((state) => state.chat);
  const { loadings } = useAppSelector((state) => state.common);

  const unread_count = useMemo(
    () => Object.values(unread_messages).reduce((a: number, b) => a + b, 0),
    [unread_messages],
  );

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth');
    } else {
      dispatch(get_my_resume_thunk());
    }
  }, []);

  return (
    <View width="100%" height="clac(100vh - 65px)" class_name="ph-20u pt-20 pb-80 fdc ovf-y-auto">
      <AccountCard />

      <Text SubtitleBlack class_name="mt-22 mb-12"></Text>
      <Button
        loading={loadings[GET_MY_RESUME]}
        leftIcon={resume ? <ResumeIcon /> : <CreateResumeIcon />}
        onClick={() => navigate(`/${resume ? 'resume' : 'resume/create-edit'}`)}
      >
        {resume ? 'Моё резюме' : 'Создать резюме'}
      </Button>
      <Button
        leftIcon={<MyResponseIcon />}
        class_name="mv-20"
        bg={'green'}
        onClick={() => navigate('/vacancies?mode=MY_RESPONSES')}
      >
        Мои отклики
      </Button>
      <Button leftIcon={<ChatIcon />} class_name="mb-20" bg={'grey'} onClick={() => navigate('/chat-list')}>
        Моя переписка
        {unread_count ? (
          <Text white class_name="w-22 h-22 br-11 pt-3 bg-red ml-20 t-align-center" Small>
            {unread_count}
          </Text>
        ) : null}
      </Button>
      <Button leftIcon={<FavoriteIcon />} bg={'red'} onClick={() => navigate('/vacancies?mode=FAVORITES')}>
        Избранное
      </Button>

      <Button leftIcon={<CodingIcon />} class_name="mt-47" type="outline">
        Написать разработчикам
      </Button>
    </View>
  );
};

export default Account;
