import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import React, { useMemo } from 'react';
import { VacancyI } from 'types/common';
import PenIcon from 'assets/icons/pen-dark-grey.svg';
import Image from 'components/custom-components/Image';
import { getCategoryImageById } from 'data/personals-data';
import { useAppSelector } from 'hooks';

type propsType = {
  fields?: Partial<VacancyI>;
  goBack?: (step?: number) => void;
};

const Finally: React.FC<propsType> = ({ goBack, fields }) => {
  const { categories } = useAppSelector((state) => state.common);

  const RenderRow: React.FC<{ children: React.ReactNode; step: number }> = ({ children, step }) => {
    return (
      <View class_name="br-8 mb-10 pv-14 ph-20 relative fdc" bg="#D5DEDE4D">
        {children}
        <View class_name="pointer absolute zi-9" right={10} top={10} onClick={() => goBack?.(step)}>
          <PenIcon />
        </View>
      </View>
    );
  };

  const category = useMemo(() => categories.find((item) => item._id === fields.category?._id), [fields]);

  return (
    <View class_name="full-width fdc ais flex-1 mt-12" maxHeight={574}>
      <Text Description color="#868F90B2" class_name="mb-15">
        Перед тем как опубликовать вакансию, проверьте корректность данных
      </Text>
      <View class_name="fdc ais ovf-y-auto scroll_bar_usual" maxHeight={574}>
        <RenderRow step={7}>
          <Text SubtitleM>Фото</Text>
          <Image
            src={fields.photo || getCategoryImageById(fields.category._id)}
            width="100%"
            height={220}
            fit="cover"
            class_name="mt-7 br-4"
          />
        </RenderRow>

        <RenderRow step={1}>
          <Text SubtitleM class_name="mb-4">
            {category?.children.find((item) => item._id === fields.category?.childId).name}
          </Text>
          <Text DescriptionL>{category?.name}</Text>
        </RenderRow>

        <RenderRow step={3}>
          <Text SubtitleM>Описание работодателя:</Text>
          <Text SubtitleL class_name="mb-35 mt-4">
            {fields.about?.descriptions}
          </Text>

          <Text SubtitleM>Условия:</Text>
          <Text SubtitleL class_name="mb-35 mt-4">
            {fields.about?.circumstances}
          </Text>

          <Text SubtitleM>Требования:</Text>
          <Text SubtitleL class_name="mb-35 mt-4">
            {fields.about?.requirements}
          </Text>
        </RenderRow>
      </View>
      <Text
        class_name="t-align-right full-width mt-20 pointer text-decoration-underline"
        Subtitle
        blue
        onClick={() => goBack?.(6)}
      >
        Редактировать тест
      </Text>
    </View>
  );
};

export default Finally;
