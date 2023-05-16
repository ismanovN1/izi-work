import Button from 'components/custom-components/Button';
import Input from 'components/custom-components/Input';
import Radio from 'components/custom-components/Radio';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import { useAppSelector } from 'hooks';
import React, { useState } from 'react';
import { RESPOND } from 'store/action-store/constants';
import { VacancyI } from 'types/common';

type ask_type = {
  question: string;
  ask: string;
};

export const Survey: React.FC<{ survey: VacancyI['questions']; submit: (val: any) => void }> = ({ survey, submit }) => {
  const { loadings, errors } = useAppSelector((s) => s.common);
  const [response, setResponse] = useState<ask_type[]>([]);

  const onChangeHandler = (val: ask_type, index: number) => {
    setResponse((prev) => {
      const newVal = prev.slice();
      newVal[index] = val;
      return newVal;
    });
  };

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      {survey?.map((item, index) => (
        <View key={index} class_name="mt-12 fdc ais">
          <View class_name="full-width bg-light-grey h-1 mb-26" />
          <View class_name="fdc ph-20u">
            <Text SubtitleM class_name="mb-12">
              {item.question}
            </Text>
            {item.options.map((option, i) => (
              <Radio
                key={i}
                class_name="mb-20"
                checked={response[index]?.ask === option}
                onChange={(val) => {
                  onChangeHandler(val ? { question: item.question, ask: option } : undefined, index);
                }}
              >
                <Text class_name="color-grey Description ml-11">{option}</Text>
              </Radio>
            ))}
          </View>
        </View>
      ))}
      {errors[RESPOND] ? <Text red>{errors[RESPOND]}</Text> : null}

      <View class_name="d-flex jce full-width mt-10">
        <Button
          loading={loadings[RESPOND]}
          disabled={!response.filter((item) => !!item).length}
          width={165}
          onClick={() => submit(response)}
        >
          Ответить
        </Button>
      </View>
    </View>
  );
};
