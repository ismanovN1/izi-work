import React, { useEffect, useState } from 'react';

import View from '../View';
import CheckedIcon from 'assets/icons/checked.svg';

type propsType = {
  checked?: boolean;
  onChange?: (val: boolean) => void;
  class_name?: string;
  children?: React.ReactNode;
};

const Radio: React.FC<propsType> = ({ checked, onChange, children, class_name }) => {
  return (
    <View class_name={`pointer d-flex aic ${class_name || ''}`}>
      <View
        class_name="pointer"
        width={25}
        height={25}
        onClick={() => {
          onChange?.(!checked);
        }}
      >
        {!checked ? (
          <View class_name="bc-light-grey br-8 box-sizing-border-box" width={25} height={25} />
        ) : (
          <CheckedIcon />
        )}
      </View>
      {children}
    </View>
  );
};

export default Radio;
