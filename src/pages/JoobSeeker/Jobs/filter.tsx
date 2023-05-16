import Button from 'components/custom-components/Button';
import Input from 'components/custom-components/Input';
import Radio from 'components/custom-components/Radio';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import { checkObjValue } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useState } from 'react';
import { setFilter } from 'store/vacancies-store/vacancies-slice';

type filterType = {
  salary_from?: number;
  category_id?: string;
  salary_to?: number;
  salary_period?: 'PER_MONTH' | 'PER_HOUR' | 'PER_DAY';
  noExperienceRequired?: boolean;
  part_time?: boolean;
  shiftMethod?: boolean;
  requiredDriverLicense?: boolean;
  availableForMinors?: boolean;
};

export const JobFilter: React.FC<{ closeFilterModal: () => void }> = ({ closeFilterModal }) => {
  const dispatch = useAppDispatch();

  const { filter_params } = useAppSelector((s) => s.vacancies);
  const [val, setVal] = useState<filterType>(checkObjValue(filter_params));
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const onChangeHandler = (fields: Partial<filterType>) => {
    setVal((prev) => ({ ...prev, ...fields }));
    if (!isChanged) setIsChanged(true);
  };

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      <Text Subtitle>Зарплата</Text>
      <View class_name="full-width d-flex aic mt-27 mb-20">
        <Text DescriptionM class_name="mr-6" grey>
          От
        </Text>
        <Input
          value={val.salary_from || ''}
          onChange={(e) => {
            const result = Number(e.target.value);
            if (!isNaN(result)) onChangeHandler({ salary_from: result || undefined });
            if (!e.target.value) onChangeHandler({ salary_from: 0 });
          }}
          type="numeric"
          class_name="f-grow-1"
        />
        <Text DescriptionM class_name="mh-10 white-space-nowrap" grey>
          - До
        </Text>
        <Input
          value={val.salary_to || ''}
          onChange={(e) => {
            const result = Number(e.target.value);
            if (!isNaN(result)) onChangeHandler({ salary_to: result || undefined });
            if (!e.target.value) onChangeHandler({ salary_to: 0 });
          }}
          type="numeric"
          class_name="f-grow-1"
        />
      </View>
      <View class_name="d-flex">
        <Radio
          class_name="mr-16"
          checked={val.salary_period === 'PER_MONTH'}
          onChange={(e) => onChangeHandler({ salary_period: e ? 'PER_MONTH' : undefined })}
        >
          <Text class_name="ml-10" DescriptionM grey>
            в месяц
          </Text>
        </Radio>
        <Radio
          class_name="mr-16"
          checked={val.salary_period === 'PER_DAY'}
          onChange={(e) => onChangeHandler({ salary_period: e ? 'PER_DAY' : undefined })}
        >
          <Text class_name="ml-10" DescriptionM grey>
            в день
          </Text>
        </Radio>
        <Radio
          class_name="mr-16"
          checked={val.salary_period === 'PER_HOUR'}
          onChange={(e) => onChangeHandler({ salary_period: e ? 'PER_HOUR' : undefined })}
        >
          <Text class_name="ml-10" DescriptionM grey>
            в час
          </Text>
        </Radio>
      </View>

      <Text DescriptionM class_name="mt-40 mb-15">
        Дополнительные условия
      </Text>

      <Radio
        class_name="mb-19"
        checked={val.noExperienceRequired}
        onChange={(e) => onChangeHandler({ noExperienceRequired: e })}
      >
        <Text class_name="ml-10" Description grey>
          Опыт не требуется
        </Text>
      </Radio>
      <Radio class_name="mb-19" checked={val.part_time} onChange={(e) => onChangeHandler({ part_time: e })}>
        <Text class_name="ml-10" Description grey>
          Не полный рабочий день
        </Text>
      </Radio>
      <Radio class_name="mb-19" checked={val.shiftMethod} onChange={(e) => onChangeHandler({ shiftMethod: e })}>
        <Text class_name="ml-10" Description grey>
          Вахтовый метод
        </Text>
      </Radio>
      <Radio
        class_name="mb-19"
        checked={val.requiredDriverLicense}
        onChange={(e) => onChangeHandler({ requiredDriverLicense: e })}
      >
        <Text class_name="ml-10" Description grey>
          Наличие водительских прав обязательно
        </Text>
      </Radio>
      <Radio
        class_name="mb-19"
        checked={val.availableForMinors}
        onChange={(e) => onChangeHandler({ availableForMinors: e })}
      >
        <Text class_name="ml-10" Description grey>
          Доступно для несовершеннолетних
        </Text>
      </Radio>

      <View class_name="space-b mt-20 full-width">
        <Button
          type="outline"
          bg="red"
          class_name="f-grow-1 mr-20"
          onClick={() => {
            setVal({});
            setIsChanged(true);
          }}
        >
          Сбросить
        </Button>
        <Button
          class_name="f-grow-1"
          disabled={!isChanged}
          onClick={() => {
            dispatch(
              setFilter({
                ...checkObjValue({
                  salary_from: val.salary_from,
                  salary_to: val.salary_to,
                  salary_period: val.salary_period,
                  part_time: val.part_time,
                  category_id: val.category_id,
                }),
                page: 1,
                size: 20,
              }),
            );
            closeFilterModal();
          }}
        >
          Принять
        </Button>
      </View>
    </View>
  );
};
