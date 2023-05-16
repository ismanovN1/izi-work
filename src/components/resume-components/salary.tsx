import React, { useState, useMemo, useEffect } from 'react';

import Input from 'components/custom-components/Input';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Radio from 'components/custom-components/Radio';
import { ResumeI } from 'types/common';

type propsType = {
  value?: ResumeI['salary'];
  onChange?: (val: ResumeI['salary'] | undefined) => void;
};

const Salary: React.FC<propsType> = ({ onChange, value }) => {
  const [val, setVal] = useState<ResumeI['salary'] | undefined>();

  useEffect(() => {
    setVal(value);
  }, [value]);

  const onChangeHandler = (field: Partial<ResumeI['salary']>) => {
    setVal((prev) => ({ ...prev, ...field }));
    onChange?.({ ...val, ...field });
  };

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      <Text Description color="#868F90B2">
        Введите предлагаемый оклад
      </Text>
      <View class_name="full-width d-flex aic mt-27 mb-20">
        <Text DescriptionM class_name="mr-6" grey>
          От
        </Text>
        <Input
          value={val?.from || ''}
          onChange={(e) => {
            const result = Number(e.target.value);
            if (!isNaN(result)) onChangeHandler({ from: result || undefined });
            if (!e.target.value) onChangeHandler({ from: 0 });
          }}
          placeholder="0 ₸"
          type="numeric"
          class_name="f-grow-1"
        />
        <Text DescriptionM class_name="mh-10 white-space-nowrap" grey>
          - До
        </Text>
        <Input
          value={val?.to || ''}
          onChange={(e) => {
            const result = Number(e.target.value);
            if (!isNaN(result)) onChangeHandler({ to: result || undefined });
            if (!e.target.value) onChangeHandler({ to: 0 });
          }}
          placeholder="0 ₸"
          type="numeric"
          class_name="f-grow-1"
        />
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
      </View>
    </View>
  );
};

export default Salary;
