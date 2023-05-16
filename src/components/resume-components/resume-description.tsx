/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState, useMemo, useEffect } from 'react';

import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Textarea from 'components/custom-components/Textarea';
import { ResumeI } from 'types/common';

type propsType = {
  value?: ResumeI['about'];
  onChange?: (val: ResumeI['about'] | undefined) => void;
  title?: string;
};

const VacancyDescription: React.FC<propsType> = ({ onChange, value, title }) => {
  const [val, setVal] = useState('');

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <View class_name="full-width fdc ais flex-1 mt-22 relative">
      <Text SubtitleM class_name="mb-15">
        {title}
      </Text>
      <Textarea
        height={296}
        rows={12}
        maxLength={700}
        placeholder="Опишите вакансию для кандидата"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </View>
  );
};

export default VacancyDescription;
