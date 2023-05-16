import React, { useCallback, useState, useEffect, useMemo } from 'react';
import View from 'components/custom-components/View';
import { formatCreatedAt, formatSalary } from 'helpers/common';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VacancyCard from 'components/ui/VacancyCard';
import { getCategoryImageById } from 'data/personals-data';
import ModalCard from 'components/ui/ModalCard';
import { JobFilter } from './filter';
import FavoriteIcon from 'assets/icons/favorite-icon-white.svg';
import MyResponseIcon from 'assets/icons/my-response-icon.svg';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  get_my_favorite_vacancies_thunk,
  get_my_responds_thunk,
  get_vacancies_thunk,
} from 'store/vacancies-store/vacancies-thunk';
import CategoriesList from 'components/ui/CategoriesList';
import { GET_VACANCIES } from 'store/vacancies-store/constans';
import { filter_type, setFilter } from 'store/vacancies-store/vacancies-slice';

const Job = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loadings } = useAppSelector((s) => s.common);
  const { vacancies, my_responds, favorite_vacancies, filter_params, total_vacancies } = useAppSelector(
    (s) => s.vacancies,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [mode, setMode] = useState('ALL');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setMode(searchParams.get('mode') || 'ALL');
  }, [searchParams]);

  useEffect(() => {
    dispatch(get_vacancies_thunk(filter_params));
  }, [filter_params]);

  useEffect(() => {
    if (mode === 'MY_RESPONSES') dispatch(get_my_responds_thunk());
    else if (mode === 'FAVORITES') dispatch(get_my_favorite_vacancies_thunk());
  }, [mode]);

  const vacancies_for_render = useMemo(() => {
    switch (mode) {
      case 'MY_RESPONSES':
        return my_responds;
      case 'FAVORITES':
        return favorite_vacancies;

      default:
        return vacancies;
    }
  }, [my_responds, vacancies, mode, favorite_vacancies]);

  const RenderButton = useCallback(() => {
    switch (mode) {
      case 'MY_RESPONSES':
        return (
          <Button leftIcon={<FavoriteIcon />} bg={'red'} onClick={() => setSearchParams('mode=FAVORITES')}>
            Избранное
          </Button>
        );
      case 'FAVORITES':
        return (
          <Button
            leftIcon={<MyResponseIcon />}
            class_name="mv-20"
            bg={'green'}
            onClick={() => setSearchParams('mode=MY_RESPONSES')}
          >
            Мои отклики
          </Button>
        );

      default:
        return <Button onClick={() => setShowFilter(true)}>Фильтр поиска</Button>;
    }
  }, [mode, total_vacancies]);

  return (
    <View width="100%">
      {mode === 'ALL' ? (
        <View class_name="full-width pt-20">
          <Text BodyBlack class_name="ph-20u">
            Работа по категориям
          </Text>
          <CategoriesList />
        </View>
      ) : null}
      <View class_name="full-width fdc ph-20u pt-20 pb-100">
        {vacancies_for_render.map((item: any) => {
          const vacancy = mode === 'MY_RESPONSES' ? item.vacancy_id || [] : item;
          const actions =
            mode === 'MY_RESPONSES'
              ? { is_called: item.is_called, is_wrote: !!item.chat_id, is_responded: item.is_responded }
              : {};
          return (
            <VacancyCard
              actions={actions}
              key={vacancy._id}
              showActions={mode === 'MY_RESPONSES'}
              title={vacancy?.category_name}
              description={vacancy.descriptions}
              salary={formatSalary(vacancy.salary_from, vacancy.salary_to)}
              created={formatCreatedAt(vacancy.created_at)}
              src={vacancy.picture || getCategoryImageById(vacancy._id)}
              onClick={() => {
                navigate(vacancy._id);
              }}
            />
          );
        })}
        {mode === 'ALL' && total_vacancies > (filter_params.size || 20) * (filter_params.page || 1) && (
          <Text
            class_name="mt-10 t-align-center pointer pb-100"
            Subtitle
            grey
            onClick={() =>
              !loadings[GET_VACANCIES] &&
              dispatch(setFilter((prev: filter_type) => ({ ...prev, page: (prev?.page || 1) + 1 })))
            }
          >
            {loadings[GET_VACANCIES] ? 'Loading...' : 'Ещё >>'}
          </Text>
        )}
      </View>
      <View class_name="fixed center" bottom={5} left={0} right={0}>
        <View class_name="full-width ph-20u" maxWidth={752}>
          <RenderButton />
        </View>
      </View>
      <ModalCard visible={showFilter} onClose={() => setShowFilter(false)} title="Фильтр поиска">
        <JobFilter closeFilterModal={() => setShowFilter(false)} />
      </ModalCard>
    </View>
  );
};

export default Job;
