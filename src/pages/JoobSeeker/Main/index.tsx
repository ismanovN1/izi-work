import React, { useCallback, useEffect } from 'react';
import View from 'components/custom-components/View';
import { Carousel } from 'react-responsive-carousel';

import comunication_image from 'assets/images/comunication.png';
import job_map_image from 'assets/images/job-map.png';
import seeker_image from 'assets/images/seeker.png';
import { search_icon_png } from 'assets/icons/personals-icons';
import { uw } from 'helpers/common';
import Text from 'components/custom-components/Text';
import Input from 'components/custom-components/Input';
import Image from 'components/custom-components/Image';
import Button from 'components/custom-components/Button';
import CategoryItem from 'components/personals-components/CategoryItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFilter } from 'store/vacancies-store/vacancies-slice';
import { setCompanyData } from 'store/company-store/company-slice';
import { setIsAuth, setUser } from 'store/auth-store/auth-slice';
import { instance } from 'api/init';

const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (user && user.is_employer) {
      const conf = window.confirm('Вы не можете продолжать как работодатель хотите выйти из своей учетной записи?');
      if (conf) {
        dispatch(setCompanyData());
        dispatch(setIsAuth(false));
        dispatch(setUser(undefined));
        localStorage.removeItem('@user_data');
        localStorage.removeItem('@token');
        instance.defaults.headers.common.Authorization = '';
        navigate('/');
      } else {
        window.open('https://employer.izi-work.kz');
      }
    }
  }, []);

  const Categories = useCallback(
    () => (
      <View class_name={`d-flex pv-16 ${isMobile ? 'ovf-x-auto' : 'f-wrap'} hide-scrollbar ph-20u pb-70 full-width`}>
        {categories.map((item) => (
          <CategoryItem
            icon={<Image src={item.icon} class_name="h-30" width="auto" fit="cover" height="30px" />}
            key={item._id}
            onClick={() => {
              dispatch(setFilter({ category_id: item._id }));
              navigate('vacancies');
            }}
          >
            {item.name}
          </CategoryItem>
        ))}
      </View>
    ),
    [categories],
  );
  return (
    <View width="100%">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        selectedItem={1}
        infiniteLoop
        emulateTouch
        renderIndicator={(clicHandler, isSelected, index) => {
          return (
            <View
              class_name={`w-10 h-10 mh-5 br-5 bc-${isSelected ? 'blue' : 'light-grey'} bw-${isSelected ? 1 : 0} bg-${
                isSelected ? 'blue' : 'white'
              }`}
              onMouseDown={clicHandler}
            />
          );
        }}
      >
        <div>
          <View class_name="mb-30 relative">
            <img src={comunication_image} alt="" />
            <View class_name="absolute" left={uw(20)} top={uw(30)}>
              <Text H1 white class_name="t-align-left lh-34">
                {'Общайтесь \nс соискателем!'}
              </Text>
            </View>
          </View>
        </div>
        <div>
          <View class_name="mb-30 relative">
            <img src={seeker_image} alt="" />
            <View class_name="absolute" left={uw(20)} top={uw(30)}>
              <Text H1 white class_name="t-align-left lh-34">
                {'Найди работу \nбыстро!'}
              </Text>
            </View>
          </View>
        </div>
        <div>
          <View class_name="mb-30 relative">
            <img src={job_map_image} alt="" />
            <View class_name="absolute" left={uw(20)} top={uw(30)}>
              <Text H1 white class_name="t-align-left lh-34">
                {'Ищите работу \nрядом!'}
              </Text>
            </View>
          </View>
        </div>
      </Carousel>

      <View class_name="full-width ph-20u pt-30">
        <Input
          leftIcon={<Image src={search_icon_png} width={20} />}
          placeholder="Поиск работы"
          class_name="full-width flex-1 mb-20"
        />

        <NavLink to="vacancies">
          <Button>Выбрать работу</Button>
        </NavLink>

        {!user && (
          <>
            <Text class_name="t-align-center white-space-pre-line full-width mt-30 mb-16" SubtitleB red>
              {'Нужна работа? \nПройди регистрацию чтобы начать'}
            </Text>
            <NavLink to="registr">
              <Button bg="red">Регистрация</Button>
            </NavLink>
          </>
        )}
      </View>
      <View class_name="full-width pt-30">
        <Text BodyBlack class_name="ph-20u">
          Работа по категориям
        </Text>
        <Categories />
      </View>
    </View>
  );
};

export default Main;
