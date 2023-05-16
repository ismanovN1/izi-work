import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import React, { useCallback, useEffect, useState } from 'react';
import { VacancyI } from 'types/common';
import RenderQuestions from './render-question';

type propsType = {
  value?: VacancyI['questions'];
  onChange?: (val: VacancyI['questions'] | undefined) => void;
};

const Questions: React.FC<propsType> = ({ onChange, value }) => {
  const [val, setVal] = useState<VacancyI['questions'] | undefined>();

  useEffect(() => {
    const id = setTimeout(() => {
      setVal(value);
    }, 100);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      <Text Description color="#868F90B2" class_name="mb-15">
        Задайте интересующие вас вопросы, это поможет вам с выбором сотрудника.
      </Text>
      <RenderQuestions
        title="Вопрос 1"
        value={val?.[0] || undefined}
        onChange={(e) => {
          setVal((prev) => [e || undefined, prev?.[1]]);
          onChange?.([e || undefined, val?.[1]]);
        }}
      />
      <RenderQuestions
        title="Вопрос 2"
        value={val?.[1]}
        onChange={(e) => {
          setVal((prev) => [prev?.[0], e]);
          onChange?.([val?.[0], e]);
        }}
      />
    </View>
  );
};

export default Questions;
