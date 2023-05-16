import React, { useEffect, useState } from 'react';

import View from '../View';
import enabledIcon from 'assets/icons/enabled.svg';
import './index.scss';

type propsType = {
  enabled?: boolean;
  onChange?: (val: boolean) => void;
  class_name?: string;
};

const Switch: React.FC<propsType> = ({ enabled, onChange, class_name }) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (value !== enabled) setValue(enabled);
  }, [enabled]);

  return (
    <View
      class_name={`switch-custom ${value ? 'jce bg-green' : ''} ${class_name}`}
      onClick={() => {
        onChange?.(!value);
        setValue((prev) => !prev);
      }}
    >
      <View class_name="puck" />
    </View>
  );
};

export default Switch;
