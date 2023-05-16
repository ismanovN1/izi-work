import React, { useEffect, useState, useMemo } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import VacancyItem from 'components/my-vacancies-components/vacancy-item';
import CandidateItem from 'components/my-vacancies-components/candidate-item';
import { getCategoryImageById } from 'data/personals-data';
import CandidateCard from 'components/my-vacancies-components/candidate-card';
import PreviewVacancy from 'components/my-vacancies-components/preview-vacancy';
import { useAppSelector } from 'hooks';
import { formatSalary } from 'helpers/common';
import VacancyDetail from './vacancy_detail';

// helpers

const Vacancies: React.FC<{ status: 'ACTIVE' | 'CLOSED' | 'ARCHIVED' }> = ({ status }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const vacancies = useAppSelector((s) => s.vacancies);

  const my_vacancies = vacancies[`my_${status.toLowerCase()}_vacancies`];

  // States
  const [vacancy_id, setVacancy_id] = useState<string | null>(null);

  useEffect(() => {
    const vId = searchParams.get('vacancy_id');
    if (vId) {
      setVacancy_id(vId);
    } else {
      setVacancy_id(undefined);
    }
  }, [setSearchParams]);

  return (
    <View class_name="full-width full-height d-flex">
      <View width={275} class_name="fdc ais ml-10">
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
        </View>
      </View>
      <VacancyDetail />
    </View>
  );
};

export default Vacancies;
