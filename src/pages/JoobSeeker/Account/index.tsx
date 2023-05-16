import React, { useEffect } from 'react';

import View from 'components/custom-components/View';
import AccountCard from 'components/account-components/account-card';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

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
  const { loadings } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (!isAuth) {
      navigate('/waiter/auth');
    } else {
      dispatch(get_my_resume_thunk());
    }
  }, []);

  return (
    <View width="100%" height="clac(100vh - 65px)" class_name="ph-20u pt-20 pb-80 fdc ovf-y-auto">
      <AccountCard />

      <Text SubtitleBlack class_name="mt-22 mb-12">
        Мои объявления
      </Text>
      <Button
        loading={loadings[GET_MY_RESUME]}
        leftIcon={resume ? <ResumeIcon /> : <CreateResumeIcon />}
        onClick={() => navigate(`/waiter/${resume ? 'resume' : 'resume/create-edit'}`)}
      >
        {resume ? 'Моё резюме' : 'Создать резюме'}
      </Button>
      <Button
        leftIcon={<MyResponseIcon />}
        class_name="mv-20"
        bg={'green'}
        onClick={() => navigate('/waiter/vacancies?mode=MY_RESPONSES')}
      >
        Мои отклики
      </Button>
      <Button leftIcon={<FavoriteIcon />} bg={'red'} onClick={() => navigate('/waiter/vacancies?mode=FAVORITES')}>
        Избранное
      </Button>

      <Button leftIcon={<CodingIcon />} class_name="mt-47" type="outline">
        Написать разработчикам
      </Button>
    </View>
  );
};

export default Account;
