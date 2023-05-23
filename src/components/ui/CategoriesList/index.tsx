import React from 'react';
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';

import { isMobile } from 'react-device-detect';
import { useAppDispatch, useAppSelector } from 'hooks';
import CategoryItem from 'components/personals-components/CategoryItem';
import { setFilter } from 'store/vacancies-store/vacancies-slice';

type propsType = {};

const CategoriesList: React.FC<propsType> = () => {
  const dispatch = useAppDispatch();

  const { filter_params } = useAppSelector((s) => s.vacancies);
  const { categories } = useAppSelector((s) => s.common);

  return (
    <View class_name={`d-flex pv-16 ${isMobile ? 'ovf-x-auto' : 'f-wrap'} hide-scrollbar ph-20u full-width`}>
      {categories.map((item) => (
        <CategoryItem
          icon={<Image src={item.icon} width="auto" class_name="h-30" fit="cover" height="30px" />}
          key={item._id}
          active={item._id === filter_params.category_id}
          onClick={() => {
            dispatch(setFilter((prev) => ({ ...prev, category_id: item._id, page: 1 })));
            console.log(filter_params);
          }}
        >
          {item.name}
        </CategoryItem>
      ))}
    </View>
  );
};

export default React.memo(CategoriesList);
