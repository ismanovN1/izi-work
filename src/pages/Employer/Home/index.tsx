import React, { useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

// Helpers & Utils

// Images & Icons
import banner from 'assets/images/desctop-banner.png';
import map_image from 'assets/images/map.png';
import chat_image from 'assets/images/chat.png';
import { useNavigate } from 'react-router-dom';

import './index.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setIsAuth, setUser } from 'store/auth-store/auth-slice';
import { setResume } from 'store/resume-store/resume-slice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (user && !user.is_employer) {
      const conf = window.confirm('Вы не можете продолжать как соискатель хотите выйти из своей учетной записи?');
      if (conf) {
        dispatch(setUser(undefined));
        dispatch(setResume(undefined));
        dispatch(setIsAuth(false));
        localStorage.removeItem('@token');
        localStorage.removeItem('@user_data');
        navigate('/');
      } else {
        window.open('https://izi-work.kz');
      }
    }
  }, []);

  return (
    <View class_name="full-width relative fdc aic ovf-x-hidden home-landing">
      <View width="100%">
        <View class_name="banner ovf-hidden center" width="100%">
          <Image src={banner} width={1920} height={'auto'} fit="cover" />
        </View>
        <View class_name="absolute pt-93 d-flex jcc fast-hire" left={0} top={0} right={0}>
          <View class_name="fdc" maxWidth={1100} width="100%">
            <Text class_name="mb-20" H1 white>
              {'Найми персонал \nв течении 24 часов'}
            </Text>
            <View width={354}>
              <Text SubtitleL white>
                IZIWORK - это самый быстрый способ нанять сотрудника в вашу компанию. Сделай это прямо сейчас!
              </Text>
            </View>
            <Button
              color={'blue'}
              bg="white"
              width={275}
              class_name="button_white_shadow mt-54"
              onClick={() => navigate('personals')}
            >
              Нанять
            </Button>
          </View>
        </View>
      </View>
      <View class_name="landing-body d-flex fdc pt-82 full-width pb-90 f-wrap" maxWidth={1120} width="100%">
        <View class_name="space-b f-wrap full-width  mb-100u">
          <View class_name="part">
            <Image src={map_image} width="100%" height="auto" />
          </View>
          <View class_name="d-flex fdc part">
            <Text class_name="mb-20" H1>
              {'Находи сотрудников рядом \nс офисом'}
            </Text>
            <Text SubtitleL class_name="mt-12 mb-4">
              Когда сотрудник не тратит много времени что бы добраться до работы — это удобно всем!
            </Text>
            <Button width={275} class_name="button_white_shadow mt-54">
              Найти сейчас
            </Button>
          </View>
        </View>

        <View class_name="f-wrap space-b full-width mt-100u">
          <View width="50%" class_name="part d-flex fdc">
            <Text class_name="mb-20" H1>
              {'Присоединяйся и общайся \nна платформе'}
            </Text>
            <Text SubtitleL class_name="mt-12 mb-4">
              Знакомьтесь, задавайте вопросы и общайтесь со своими кандидатами внутри платформы – это экономит ваше
              время!
            </Text>
            <Button width={275} class_name="button_white_shadow mt-54">
              Присоедениться
            </Button>
          </View>
          <View class_name="part">
            <Image src={chat_image} width="100%" height="auto" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
