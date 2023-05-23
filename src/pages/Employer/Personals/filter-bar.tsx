import React, { useRef } from 'react';

import Button from 'components/custom-components/Button';
import Image from 'components/custom-components/Image';
import View from 'components/custom-components/View';
import Input from 'components/custom-components/Input';

import { filter_icon_png } from 'assets/icons/personals-icons';
import SearchIcon from 'assets/icons/search.svg';
import CategoryItem from 'components/personals-components/CategoryItem';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFilterParams } from 'store/resume-store/resume-slice';
import { isMobile } from 'react-device-detect';
import './index.scss';

type propsType = { setShowFilter: (val: boolean) => void };

const FilterBar: React.FC<propsType> = ({ setShowFilter }) => {
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((s) => s.common);
  const { filter_params } = useAppSelector((s) => s.resume);
  return (
    <>
      <View class_name="personals-filter-bar space-b full-width flex-wrap">
        <Button
          width={265}
          type="outline"
          leftIcon={<Image width={20.7} src={filter_icon_png} />}
          onClick={() => setShowFilter(true)}
        >
          Фильтр
        </Button>
        <Input
          defaultValue={filter_params.search}
          ref={inputRef}
          leftIcon={<SearchIcon />}
          placeholder="Введите ключевое слово для поиска"
          class_name="mh-20 flex-1"
        />
        <Button
          width={265}
          leftIcon={<SearchIcon />}
          onClick={() => {
            dispatch(
              setFilterParams((prev) => ({
                ...prev,
                search: inputRef.current?.value || undefined,
                page: 1,
              })),
            );
          }}
        >
          Поиск
        </Button>
      </View>
      <View class_name={`d-flex pt-30 pb-30 ${isMobile ? 'ovf-x-auto' : 'f-wrap'} hide-scrollbar full-width`}>
        {categories.map((item) => (
          <CategoryItem
            icon={<Image src={item.icon} width="auto" class_name="h-30" fit="cover" height="30px" />}
            key={item._id}
            active={filter_params.category_id === item._id}
            onClick={() => {
              dispatch(
                setFilterParams((prev) => ({
                  ...prev,
                  category_id: filter_params.category_id !== item._id ? item._id : undefined,
                  page: 1,
                })),
              );
            }}
          >
            {item.name}
          </CategoryItem>
        ))}
      </View>
    </>
  );
};

export default React.memo(FilterBar);
