import React, { useState, useMemo, useEffect } from 'react';

import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Textarea from 'components/custom-components/Textarea';
import { VacancyI } from 'types/common';

type propsType = {
  value?: VacancyI['about'];
  onChange?: (val: VacancyI['about'] | undefined) => void;
};

const VacancyDescription: React.FC<propsType> = ({ onChange, value }) => {
  const [val, setVal] = useState<VacancyI['about'] | undefined>();

  useEffect(() => {
    const id = setTimeout(() => {
      setVal(value);
    }, 100);
    return () => clearTimeout(id);
  }, [value]);

  const onChangeHandler = (field: Partial<VacancyI['about']>) => {
    setVal((prev) => ({ ...prev, ...field }));
    onChange?.({ ...val, ...field });
  };

  return (
    <View class_name="full-width fdc ais flex-1 mt-22 relative">
      <Text SubtitleM class_name="mb-15">
        Описание
      </Text>
      <Textarea
        height={136}
        rows={5}
        maxLength={500}
        placeholder="Опишите вакансию для кандидата"
        value={val?.descriptions}
        onChange={(e) => onChangeHandler({ descriptions: e.target.value })}
      />

      <Text SubtitleM class_name="mt-4 mb-15">
        Требования
      </Text>
      <Textarea
        height={104}
        rows={3}
        maxLength={200}
        placeholder="Пропишите требования для кандидата"
        value={val?.requirements}
        onChange={(e) => onChangeHandler({ requirements: e.target.value })}
      />

      <Text SubtitleM class_name="mt-4 mb-15">
        Условия
      </Text>
      <Textarea
        height={104}
        rows={3}
        maxLength={200}
        placeholder="Опишите условия для кандидата"
        value={val?.circumstances}
        onChange={(e) => onChangeHandler({ circumstances: e.target.value })}
      />
      <View class_name="pointer absolute" bottom={-12}>
        <Text class_name="pointer" Small blue>
          ⓘ Правила размещения вакансии
        </Text>
      </View>
    </View>
  );
};

export default VacancyDescription;
