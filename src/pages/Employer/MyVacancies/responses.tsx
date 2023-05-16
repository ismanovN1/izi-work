import React, { useEffect, useState, useMemo } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import VacancyItem from 'components/my-vacancies-components/vacancy-item';
import CandidateItem from 'components/my-vacancies-components/candidate-item';
import { getCategoryImageById } from 'data/personals-data';
import CandidateCard from 'components/my-vacancies-components/candidate-card';
import { useAppDispatch, useAppSelector } from 'hooks';
import { formatSalary } from 'helpers/common';
import { get_responds_by_vacancy_id_thunk } from 'store/action-store/action-thunk';
import { GET_RESPONDS_BY_VACANCY_ID } from 'store/action-store/constants';
import { removeSuccess } from 'store/common-store/common-slice';
import { MoonLoader } from 'react-spinners';

// helpers

const Responses = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { my_vacancies } = useAppSelector((s) => s.vacancies);
  const { loadings, successes, errors } = useAppSelector((s) => s.common);

  // States
  const [vacancy_id, setVacancy_id] = useState<string | null>(null);
  const [candidate_id, setCandidate_id] = useState<string | null>(null);
  const [waiters, setWaiters] = useState<any>([]);

  useEffect(() => {
    const vId = searchParams.get('vacancy_id');
    const cId = searchParams.get('candidate_id');
    if (vId) {
      setVacancy_id(vId);
      setCandidate_id(cId);
    } else {
      setVacancy_id(undefined);
      setCandidate_id(undefined);
    }
  }, [setSearchParams]);

  useEffect(() => {
    if (successes[GET_RESPONDS_BY_VACANCY_ID]) {
      setWaiters(successes[GET_RESPONDS_BY_VACANCY_ID]);
      dispatch(removeSuccess(GET_RESPONDS_BY_VACANCY_ID));
    }
  }, [successes[GET_RESPONDS_BY_VACANCY_ID]]);

  useEffect(() => {
    if (vacancy_id) {
      dispatch(get_responds_by_vacancy_id_thunk({ vacancy_id }));
    }
  }, [vacancy_id]);

  const current_respond = useMemo(
    () => (candidate_id ? waiters?.find((item) => item._id === candidate_id) : null),
    [candidate_id],
  );

  return (
    <View class_name="full-width full-height d-flex responds">
      <View width={275} class_name="select-vacancy  fdc ais ml-10">
        <View class_name="h-50 pt-22 ph-20">
          <Text SubtitleB>Выберите вакансию</Text>
        </View>
        <View class_name="fdc ovf-y-auto ph-10 pt-10">
          {my_vacancies.length ? (
            my_vacancies.map((item) => (
              <VacancyItem
                key={item._id}
                title={item.category_name}
                salary={formatSalary(item.salary_from, item.salary_to)}
                statistics={{ views: item.views, responses: item.responses, favorites: item.favorite }}
                active={!vacancy_id || vacancy_id == item._id}
                onClick={() => {
                  setSearchParams(`vacancy_id=${item._id}`);
                }}
                src={item.picture}
              />
            ))
          ) : (
            <Text>Пустой</Text>
          )}
          {loadings[GET_RESPONDS_BY_VACANCY_ID] ? (
            <View class_name="mv-10 jcc full-w">
              <MoonLoader color="#038CA9" />
            </View>
          ) : null}
          {errors[GET_RESPONDS_BY_VACANCY_ID] ? (
            <Text red class_name="mv-10 ">
              {errors[GET_RESPONDS_BY_VACANCY_ID]}
            </Text>
          ) : null}
        </View>
      </View>
      {!vacancy_id ? null : (
        <View width={275} class_name="fdc ais ml-10">
          <View class_name="h-50 pt-22 ph-20">
            <Text SubtitleB>Выберите вакансию</Text>
          </View>
          <View class_name="fdc ovf-y-auto ph-10 pt-10">
            {waiters.map((item) => (
              <CandidateItem
                key={item._id}
                name={item.waiter_id?.name}
                resume_id={item.resume_id?._id}
                address={item.resume_id?.address}
                job={item.resume_id?.category_name}
                active={!candidate_id || candidate_id == item._id}
                src={item.resume_id?.picture}
                onClick={() => {
                  setSearchParams((prev) => {
                    return `vacancy_id=${prev.get('vacancy_id')}&candidate_id=${item._id}`;
                  });
                }}
              />
            ))}
          </View>
        </View>
      )}
      {current_respond ? <CandidateCard data={current_respond} /> : null}
    </View>
  );
};

export default Responses;
