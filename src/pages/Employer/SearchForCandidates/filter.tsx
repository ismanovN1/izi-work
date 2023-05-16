import Button from 'components/custom-components/Button';
import Input from 'components/custom-components/Input';
import Select from 'components/custom-components/Select';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import { cities } from 'data/cities';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';

import LocationIcon from 'assets/icons/location.svg';
import { setFilterParams } from 'store/resume-store/resume-slice';

let tId: any;

const Filter: React.FC<any> = ({ go_to, mode, show_nearby }) => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((s) => s.common);
  const { filter_params } = useAppSelector((s) => s.resume);

  const [category, setCategory] = useState<any>();

  const onChangeField = (field: any) => {
    clearTimeout(tId);
    setTimeout(() => {
      dispatch(setFilterParams((prev) => ({ ...prev, ...field })));
    }, 1000);
  };

  useEffect(() => {
    const cc = categories.find((item) => item._id === filter_params.category_id);
    if (cc) {
      setCategory({ _id: cc._id, name: cc.name });
    } else setCategory(undefined);
  }, []);

  return (
    <View class_name="p-20 mt-60" card width={275}>
      <Text SubtitleB>Поиск сотрудника</Text>
      <Text DescriptionM class_name="mt-25 mb-9">
        Выберите категорию
      </Text>
      <Select
        placeholder="Категории..."
        value={category}
        onChange={(e) => {
          onChangeField({ category_id: e._id });
          setCategory(e);
        }}
        options={categories.map((item) => ({ _id: item._id, name: item.name }))}
      />
      <Text DescriptionM class_name="mt-20 mb-5">
        Выберите зарплату
      </Text>

      <View class_name="space-b full-width">
        <View width="49%">
          <Text Small grey>
            От
          </Text>
          <Input
            defaultValue={filter_params.salary_from}
            onChange={(e) => onChangeField({ salary_from: e.target.value })}
          />
        </View>
        <View width="49%">
          <Text Small grey>
            До
          </Text>
          <Input
            defaultValue={filter_params.salary_to}
            onChange={(e) => onChangeField({ salary_to: e.target.value })}
          />
        </View>
      </View>
      <Text DescriptionM class_name="mt-30 mb-9">
        Выберите город
      </Text>
      <Select
        placeholder="Города..."
        onChange={(e) => {
          const place = cities.find((item) => item.id === e._id);
          if (place) {
            onChangeField({
              lat: place.coords[0],
              lon: place.coords[1],
              distance: 25000,
            });
            go_to(place.coords, 11);
          }
        }}
        options={cities.map((item) => ({ _id: item.id, name: item.name }))}
      />
      <Button leftIcon={<LocationIcon />} class_name="mt-30" onClick={() => show_nearby(onChangeField)}>
        {mode === 'LIST' ? 'Показать рядом' : 'Сотрудник рядом'}
      </Button>
    </View>
  );
};

export default React.memo(Filter);
