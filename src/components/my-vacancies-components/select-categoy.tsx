import React, { useState, useMemo, useEffect } from 'react';

import Input from 'components/custom-components/Input';
import Select from 'components/custom-components/Select';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';

import { search_icon_png } from 'assets/icons/personals-icons';
import Image from 'components/custom-components/Image';
import { VacancyI } from 'types/common';
import { useAppSelector } from 'hooks';

type propsType = {
  value?: VacancyI['category'];
  onChange?: (val: VacancyI['category'] | undefined) => void;
};

const SelectCategory: React.FC<propsType> = ({ onChange, value }) => {
  const { categories } = useAppSelector((state) => state.common);

  const [val, setVal] = useState<VacancyI['category'] | undefined>();

  const category = useMemo(() => categories.find((item) => item._id === val?._id), [categories, val]);

  useEffect(() => {
    setVal(value);
  }, [value]);

  useEffect(() => {
    setVal(value);
  }, []);

  return (
    <View class_name="full-width fdc ais flex-1 mt-26">
      {val?._id && val.childId && category ? (
        <>
          <View class_name="d-flex aic">
            <View class_name="category-item  d-flex aic" width={370}>
              <Image src={category.icon} width={30} height={30} />
              <View class_name="fdc ml-10">
                <Text SubtitleM>{category.children.find((item) => item._id === val.childId)?.name}</Text>
                <Text Small grey>
                  {category.name}
                </Text>
              </View>
            </View>

            <Text
              class_name="pointer ml-10"
              Subtitle
              grey
              onClick={() => {
                setVal(undefined);
                onChange?.(undefined);
              }}
            >
              Изменить
            </Text>
          </View>
        </>
      ) : (
        <>
          <Input leftIcon={<Image src={search_icon_png} width={20} />} placeholder="Поиск" />
          <Text class_name="mt-20 mb-14" SubtitleM>
            Выберите категорию
          </Text>
          <View height={425} class_name="ovf-y-scroll scroll_bar_usual pr-10">
            {categories.map((item) => (
              <Select
                key={item._id}
                title={item.name}
                options_name="услуг"
                options={item.children || []}
                class_name="mb-10"
                onChange={(child) => {
                  setVal({ _id: item._id, childId: child._id, name: child.name });
                  onChange?.({ _id: item._id, childId: child._id, name: child.name });
                }}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default SelectCategory;
