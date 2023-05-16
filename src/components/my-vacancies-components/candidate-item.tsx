import React from 'react';

import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import MiniCard from 'components/ui/MiniCard';

import FavoriteIcon from 'assets/icons/favorite-grey-large.svg';
import BlueFavoriteIcon from 'assets/icons/favorite.svg';
import { useAppDispatch, useAppSelector } from 'hooks';
import { add_remove_my_favorite_resume_thunk } from 'store/action-store/action-thunk';

type propsType = {
  src: any;
  onClick?: () => void;
  address?: string;
  name: string;
  active?: boolean;
  resume_id?: string;
  job?: string;
};

const CandidateItem: React.FC<propsType> = ({ name, resume_id, address, active, job, ...restProps }) => {
  const dispatch = useAppDispatch();
  const { favorite_resumes } = useAppSelector((s) => s.resume);
  const is_favorite = favorite_resumes.includes(resume_id);
  return (
    <MiniCard {...restProps} class_name={`${active ? '' : 'opc-05'} mb-10 f-shrink-0`}>
      <View class_name="fdc jcsb pt-15 pb-15 full-width full-height relative">
        <View
          class_name="absolute pointer zi-2"
          top={10}
          right={10}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(add_remove_my_favorite_resume_thunk({ resume_id, is_favorite: !is_favorite }));
          }}
        >
          {is_favorite ? <BlueFavoriteIcon /> : <FavoriteIcon />}
        </View>
        <Text SmallM>{name}</Text>
        <Text Small grey>
          {address}
        </Text>
        <Text SmallM>{job}</Text>
      </View>
    </MiniCard>
  );
};

export default React.memo(CandidateItem);
