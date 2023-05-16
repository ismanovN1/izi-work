import React, { useState, useMemo, useEffect } from 'react';

import Input from 'components/custom-components/Input';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Radio from 'components/custom-components/Radio';
import { VacancyI } from 'types/common';

type propsType = {
  value?: VacancyI['salary'];
  onChange?: (val: VacancyI['salary'] | undefined) => void;
};

const Salary: React.FC<propsType> = ({ onChange, value }) => {
  const [val, setVal] = useState<VacancyI['salary'] | undefined>();

  useEffect(() => {
    setVal(value);
  }, [value]);

  const onChangeHandler = (field: Partial<VacancyI['salary']>) => {
    setVal((prev) => ({ ...prev, ...field }));
    onChange?.({ ...val, ...field });
  };

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      <Text Description color="#868F90B2">
        Введите предлагаемый оклад
      </Text>
      <View class_name="full-width d-flex aie mt-27  f-wrap">
        <View class_name="fdc mr-10 mb-20">
          <Text SubtitleM>От</Text>
          <Input
            width={220}
            class_name="mt-15"
            placeholder="0"
            onChange={(e) => {
              const result = Number(e.target.value.replace(/\D/g, ''));
              if (result) onChangeHandler({ from: result || undefined });
              if (!e.target.value) onChangeHandler({ from: 0 });
            }}
            value={String(val?.from?.toLocaleString('ru') || '')}
          />
        </View>

        <View class_name="fdc mr-10 mb-20">
          <Text SubtitleM>До</Text>
          <Input
            width={220}
            class_name="mt-15"
            placeholder="0"
            onChange={(e) => {
              const result = Number(e.target.value.replace(/\D/g, ''));
              if (result) onChangeHandler({ to: Number(result) || undefined });
              if (!e.target.value) onChangeHandler({ to: 0 });
            }}
            value={String(val?.to ? val.to.toLocaleString('ru') : '')}
          />
        </View>
        <Text BodyM class_name="mb-20">
          ₸
        </Text>
      </View>
      <View class_name="d-flex">
        <Radio
          class_name="mr-16"
          checked={val?.period === 'PER_MONTH'}
          onChange={(e) => onChangeHandler({ period: e ? 'PER_MONTH' : undefined })}
        >
          <Text class_name="ml-10" DescriptionM grey>
            в месяц
          </Text>
        </Radio>
        <Radio
          class_name="mr-16"
          checked={val?.period === 'PER_DAY'}
          onChange={(e) => onChangeHandler({ period: e ? 'PER_DAY' : undefined })}
        >
          <Text class_name="ml-10" DescriptionM grey>
            в день
          </Text>
        </Radio>
        <Radio
          class_name="mr-16"
          checked={val?.period === 'PER_HOUR'}
          onChange={(e) => onChangeHandler({ period: e ? 'PER_HOUR' : undefined })}
        >
          <Text class_name="ml-10" DescriptionM grey>
            в час
          </Text>
        </Radio>
      </View>
    </View>
  );
};

export default Salary;
