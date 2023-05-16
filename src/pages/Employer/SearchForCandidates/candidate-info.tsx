import React, { useState, useEffect } from 'react';

// Components
import Image from 'components/custom-components/Image';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';

// Images & Icons
import FavoriteIcon from 'assets/icons/favorite.svg';
import FavoriteGreyIcon from 'assets/icons/favorite-grey-large.svg';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_resume_by_id_thunk } from 'store/resume-store/resume-thunk';
import { GET_RESUME_BY_ID } from 'store/resume-store/constans';
import { removeSuccess } from 'store/common-store/common-slice';
import { MoonLoader } from 'react-spinners';
import { formatSalary, parseSalaryPeriod } from 'helpers/common';
import { add_remove_my_favorite_resume_thunk } from 'store/action-store/action-thunk';

type propsType = {
  candidate_id: string;
};

const CandidateInfo: React.FC<propsType> = ({ candidate_id }) => {
  const dispatch = useAppDispatch();

  const { successes, errors, loadings, categories } = useAppSelector((s) => s.common);
  const { favorite_resumes } = useAppSelector((s) => s.resume);

  const [candidate, setCandidate] = useState<any>();

  useEffect(() => {
    if (successes[GET_RESUME_BY_ID]) {
      setCandidate(successes[GET_RESUME_BY_ID]);
      dispatch(removeSuccess(GET_RESUME_BY_ID));
    }
  }, [successes[GET_RESUME_BY_ID]]);

  useEffect(() => {
    if (candidate_id) {
      dispatch(get_resume_by_id_thunk(candidate_id));
    }
  }, [candidate_id]);

  if (loadings[GET_RESUME_BY_ID])
    return (
      <View class_name="full-w d-flex jcc">
        <MoonLoader color="#038CA9" />
      </View>
    );

  if (errors[GET_RESUME_BY_ID])
    return (
      <View class_name="full-w pl-10">
        <Text red>{errors[GET_RESUME_BY_ID]}</Text>
      </View>
    );

  if (!candidate) return null;

  const is_favorite = favorite_resumes.includes(candidate_id);

  return (
    <View card width={530} class_name="relative p-20 fdc ass">
      <View
        class_name="absolute pointer"
        top={10}
        right={10}
        onClick={() => {
          dispatch(add_remove_my_favorite_resume_thunk({ resume_id: candidate_id, is_favorite: !is_favorite }));
        }}
      >
        {is_favorite ? <FavoriteIcon /> : <FavoriteGreyIcon />}
      </View>
      <View class_name="d-flex">
        <Image src={candidate.picture} width={140} height={140} class_name="br-8" />
        <View class_name="ml-20 pt-10 fdc">
          <Text BodyBlack>{candidate.name || '-'}</Text>
          <Text Body class_name="mt-35 mb-3">
            {candidate.category_name}
          </Text>
          <Text Body>({categories.find((item) => item._id === candidate.category_id)?.name})</Text>
        </View>
      </View>

      <View class_name="fdc mt-30 mb-22">
        <Text BodyBlack>Желаемая зарплата</Text>
        <Text class_name="mt-15" Body red>
          {formatSalary(candidate.salary_from, candidate.salary_to)} {parseSalaryPeriod(candidate.salary_period)}
        </Text>
      </View>

      <View class_name="fdc mb-40">
        <Text BodyBlack>О себе</Text>
        <Text class_name="mt-15" Description>
          {candidate.about_me}
        </Text>
      </View>
      <View class_name="fdc">
        <Text BodyBlack>Опыт работы</Text>
        <Text class_name="mt-15" Description>
          {candidate.experience}
        </Text>
      </View>
    </View>
  );
};

export default CandidateInfo;
