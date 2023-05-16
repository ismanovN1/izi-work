import React, { useState, useMemo, useEffect } from 'react';

import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Textarea from 'components/custom-components/Textarea';
import { VacancyI } from 'types/common';
import Radio from 'components/custom-components/Radio';
import Switch from 'components/custom-components/Switch';

type propsType = {
  value?: VacancyI['schedule'];
  onChange?: (val: VacancyI['schedule'] | undefined) => void;
};

const Schedule: React.FC<propsType> = ({ onChange, value }) => {
  const [val, setVal] = useState<VacancyI['schedule'] | undefined>();

  useEffect(() => {
    const id = setTimeout(() => {
      setVal(value);
    }, 100);
    return () => clearTimeout(id);
  }, [value]);

  const onChangeHandler = (field: Partial<VacancyI['schedule']>) => {
    setVal((prev) => ({ ...prev, ...field }));
    onChange?.({ ...val, ...field });
  };

  return (
    <View class_name="full-width fdc ais flex-1 mt-25 relative">
      <Text class_name="mb-25" SubtitleBlack>
        Выберите график работы
      </Text>
      <View>
        <Radio
          class_name="mb-20"
          checked={val?.shedule === 'FULL_TIME'}
          onChange={(e) => onChangeHandler({ shedule: e ? 'FULL_TIME' : undefined })}
        >
          <Text Subtitle class_name="ml-10">
            Полный рабочий день
          </Text>
        </Radio>
        <Radio
          checked={val?.shedule === 'PART_TIME'}
          onChange={(e) => onChangeHandler({ shedule: e ? 'PART_TIME' : undefined })}
        >
          <Text Subtitle class_name="ml-10">
            Не полный рабочий день
          </Text>
        </Radio>
      </View>

      <View class_name="mt-36 mb-15 d-flex aic">
        <Text SubtitleM class_name="mr-11">
          Сменный график
        </Text>
      </View>

      <Textarea
        placeholder="Пример (Понедельник -среда, с 08:00 до 17:00)"
        maxLength={60}
        value={val?.shift_work}
        onChange={(e) => onChangeHandler({ shift_work: e.target.value })}
      />

      <View class_name="mt-50 space-b">
        <View class_name="d-flex aic">
          <Text SubtitleM class_name="mr-11">
            Приступить к работе сразу
          </Text>
        </View>
        <Switch
          enabled={val?.get_started_right_away === undefined ? true : val?.get_started_right_away}
          onChange={(e) => onChangeHandler({ get_started_right_away: e })}
        />
      </View>
    </View>
  );
};

export default Schedule;
