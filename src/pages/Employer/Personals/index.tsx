import React, { useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

// Helpers & Utils
import { checkObjValue, screen_height } from 'helpers/common';
import PersonalCard from 'components/personals-components/PersonalCard';
import { personals } from 'data/personals-data';
import { useNavigate } from 'react-router-dom';
import Filter from 'components/personals-components/Filter';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_resumes_thunk } from 'store/resume-store/resume-thunk';
import FilterBar from './filter-bar';
import { setFilterParams } from 'store/resume-store/resume-slice';

// Images & Icons

const Personals = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { filter_params, total_resumes, resumes } = useAppSelector((state) => state.resume);

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(get_resumes_thunk(checkObjValue(filter_params)));
  }, [filter_params]);

  return (
    <View class_name="relative d-flex jcc pt-45" minHeight={screen_height - 286}>
      <View maxWidth={1100} width="100%" class_name="personals">
        <FilterBar setShowFilter={setShowFilter} />
        <Text H2>Ищут работу</Text>
        <View class_name="d-flex fdc aic full-width pb-70">
          <View class_name="d-flex f-wrap mt-18 mb-60 full-w">
            {resumes.map((item, index) => (
              <PersonalCard
                key={item._id}
                index={index}
                person={item}
                onClick={() => navigate(`/employer/personals/${item._id}`)}
              />
            ))}
          </View>
          {total_resumes > (filter_params.size || 20) * filter_params.page && (
            <Button
              width={265}
              onClick={() => {
                dispatch(setFilterParams((prev: any) => ({ ...prev, page: Number(prev.page || 0) + 1 })));
              }}
            >
              Загрузить ещё
            </Button>
          )}
        </View>
      </View>
      <Filter
        visible={showFilter}
        onClose={() => {
          setShowFilter(false);
        }}
      />
    </View>
  );
};

export default Personals;
