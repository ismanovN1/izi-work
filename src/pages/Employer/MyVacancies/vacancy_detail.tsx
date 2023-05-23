import React, { useEffect, useState } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { useSearchParams } from 'react-router-dom';
import PreviewVacancy from 'components/my-vacancies-components/preview-vacancy';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_my_vacancy_by_id_thunk } from 'store/vacancies-store/vacancies-thunk';
import { GET_MY_VACANCY_BY_ID } from 'store/vacancies-store/constans';
import { removeSuccess } from 'store/common-store/common-slice';
import { GridLoader } from 'react-spinners';
import MyVacaciesUpdate from './update';
import BackButton from 'components/ui/BackButton';

// helpers

const VacancyDetail = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // Selectors
  const { loadings, errors, successes } = useAppSelector((s) => s.common);

  // States
  const [vacancy_id, setVacancy_id] = useState<string | null>(null);
  const [vacancy, setVacancy] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const vId = searchParams.get('vacancy_id');
    if (vId) {
      setVacancy_id(vId);
    } else {
      setVacancy_id(undefined);
    }
  }, [location]);

  useEffect(() => {
    if (vacancy_id) {
      dispatch(get_my_vacancy_by_id_thunk(vacancy_id, setVacancy));
    }
  }, [vacancy_id]);

  if (!vacancy_id) return null;

  if (loadings[GET_MY_VACANCY_BY_ID])
    return (
      <View class_name="mt-60 full-w center">
        <GridLoader color="#36d7b7" />
      </View>
    );

  if (errors[GET_MY_VACANCY_BY_ID])
    return (
      <View class_name="mt-60 full-w">
        <Text red>{errors[GET_MY_VACANCY_BY_ID]}</Text>
      </View>
    );

  return vacancy ? (
    <View class_name="mt-60 detail-info-container">
      <BackButton class_name="mv-10">Назад</BackButton>
      <PreviewVacancy
        setEditMode={setEditMode}
        vacancy={{
          _id: vacancy._id,
          photo: vacancy.picture,
          status: vacancy.status,
          salary: {
            from: vacancy.salary_from,
            to: vacancy.salary_to,
            period: vacancy.salary_period,
          },
          category: { _id: vacancy.category_id, childId: vacancy.sub_category_id, name: vacancy.category_name },
          about: {
            descriptions: vacancy.descriptions,
            requirements: vacancy.requirements,
            circumstances: vacancy.circumstances,
          },
          schedule: { shedule: vacancy.shedule },
          address: { name: vacancy.address, coords: [vacancy.lat, vacancy.lon] },
          favorite: vacancy.favorite,
          responses: vacancy.responses,
          views: vacancy.views,
        }}
      />
      <MyVacaciesUpdate
        vacancy={editMode ? vacancy : null}
        onClose={() => {
          setEditMode(false);
        }}
      />
    </View>
  ) : null;
};

export default VacancyDetail;
