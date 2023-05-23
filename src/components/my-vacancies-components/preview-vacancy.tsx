import React, { useMemo, useEffect } from 'react';

// Components
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

// Helpers
import { formatSalary, get_def_images, screen_height } from 'helpers/common';

// Images & Icons
import Pen from 'assets/icons/pen.svg';
import EyeIcon from 'assets/icons/eye.svg';
import HandIcon from 'assets/icons/hand.svg';
import WhiteHandIcon from 'assets/icons/white-hand.svg';
import FavoriteIcon from 'assets/icons/favorite.svg';
import placemark from 'assets/icons/placemark.png';

// Others
import { VacancyI } from 'types/common';
import Button from 'components/custom-components/Button';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_my_vacancies_thunk, update_vacancy_thunk } from 'store/vacancies-store/vacancies-thunk';
import { UPDATE_VACANCY } from 'store/vacancies-store/constans';
import { useNavigate } from 'react-router-dom';
import { removeError, removeSuccess } from 'store/common-store/common-slice';
import './preview-vacancy.scss';

type propsType = {
  vacancy: Partial<VacancyI>;
  setEditMode?: (val: boolean) => void;
};

const PreviewVacancy: React.FC<propsType> = ({ vacancy, setEditMode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categories, loadings, errors, successes } = useAppSelector((state) => state.common);

  useEffect(() => {
    return () => {
      dispatch(removeError(UPDATE_VACANCY));
    };
  }, []);

  useEffect(() => {
    if (successes[UPDATE_VACANCY]) {
      dispatch(get_my_vacancies_thunk());
      dispatch(removeSuccess(UPDATE_VACANCY));
      navigate('/my-vacancies/active');
    }
  }, [successes[UPDATE_VACANCY]]);

  const closeVacancy = () => {
    dispatch(removeError(UPDATE_VACANCY));
    dispatch(update_vacancy_thunk({ status: 'CLOSED' }, vacancy._id));
  };

  const RenderRow: React.FC<{ title: string; children: string; mb?: number; mt?: number }> = ({
    title,
    mb,
    mt,
    children,
  }) => {
    return (
      <View class_name={`fdc ${mb ? 'mb-' + mb.toString() : ''} ${mt ? 'mt-' + mt.toString() : ''}`}>
        <Text DescriptionM>{title}</Text>
        <Text Description class_name="mt-4">
          {children}
        </Text>
      </View>
    );
  };

  const RenderStatisticsRow: React.FC<{ name: string; icon: React.ReactNode; count: number; border?: boolean }> = ({
    name,
    icon,
    count,
    border,
  }) => {
    return (
      <>
        <View class_name="space-b full-width h-60">
          {icon}
          <Text Description class_name="f-grow-1 ml-10">
            {name}
          </Text>
          <Text Description>{count}</Text>
        </View>
        {border ? <View class_name="bg-light-grey h-1 full-width" /> : null}
      </>
    );
  };

  const category = useMemo(() => categories.find((item) => item._id === vacancy.category?._id), [vacancy]);

  return (
    <>
      {errors[UPDATE_VACANCY] && <Text red>{errors[UPDATE_VACANCY]}</Text>}
      <View card minHeight={screen_height * 0.82} class_name="d-flex  p-20 preview-vacancy">
        <View width={510} class_name="mr-20 ">
          <Image
            src={vacancy?.photo || get_def_images(vacancy.category._id)}
            width={510}
            height={230}
            fit="cover"
            class_name="br-8 mb-20"
          />
          <View class_name="d-flex jcsb full-width f-wrap">
            <View width={235} class_name="info-block">
              <RenderRow title="Зарплата" mb={24}>
                {formatSalary(vacancy.salary?.from, vacancy.salary?.to)}
              </RenderRow>
              <RenderRow title={category?.children.find((item) => item._id === vacancy.category?.childId).name} mb={24}>
                {category?.name}
              </RenderRow>
              <RenderRow title="График работы:" mb={24}>{`${
                vacancy.schedule.shedule === 'FULL_TIME' ? 'П' : 'Не п'
              }олный рабочий день`}</RenderRow>
              <Text DescriptionM>Местонахождение:</Text>
              <View width={235} height={155} class_name="br-10 mt-8 ovf-hidden map-box">
                <YMaps>
                  <Map
                    defaultState={{ center: vacancy.address?.coords || [43.2220146, 76.8512485], zoom: 11 }}
                    height={155}
                  >
                    {vacancy?.address?.coords && (
                      <Placemark
                        geometry={vacancy.address.coords}
                        options={{
                          iconLayout: 'default#image',
                          iconImageHref: placemark,
                          iconImageSize: [29, 42.43],
                          iconImageOffset: [-18, -42],
                        }}
                      />
                    )}
                  </Map>
                </YMaps>
              </View>
            </View>
            <View width={235} class_name="info-block">
              <RenderRow title="Описание работодателя:" mb={24}>
                {vacancy.about.descriptions}
              </RenderRow>
              <RenderRow title="Требования:" mb={24}>
                {vacancy.about.requirements}
              </RenderRow>
              <RenderRow title="Условия:" mb={24}>
                {vacancy.about.circumstances}
              </RenderRow>
              {vacancy._id ? (
                <View class_name="d-flex pointer jce aic mb-20" onClick={() => setEditMode?.(true)}>
                  <Pen />
                  <Text class_name="ml-8" Subtitle blue>
                    Редактировать
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View width={255} class_name="fdc ais">
          <View class_name="full-wdth br-8 p-10 fdc ais" bg="#D5DEDE4D">
            <Text SubtitleB>Статистика вакансии</Text>
            <RenderStatisticsRow icon={<HandIcon />} name="Отклики" count={vacancy.responses} border />
            <RenderStatisticsRow icon={<FavoriteIcon />} name="В избранном" count={vacancy.favorite} border />
            <RenderStatisticsRow icon={<EyeIcon />} name="Просмотры" count={vacancy.views} />
          </View>
          {vacancy.responses ? (
            <Button
              leftIcon={<WhiteHandIcon />}
              class_name="mt-20"
              onClick={() => {
                navigate(`/my-vacancies/responses?vacancy_id=${vacancy._id}`);
              }}
            >
              Просмотр отклика
            </Button>
          ) : null}
          {vacancy.status === 'ACTIVE' ? (
            <Button bg="red" class_name="mt-10" onClick={closeVacancy} loading={loadings[UPDATE_VACANCY]}>
              Закрыть вакансию
            </Button>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default PreviewVacancy;
