import React, { useMemo, useState } from 'react';

// Helpers & Utils
import { checkObjValue } from 'helpers/common';

//Images & Icons

// Styles
import './index.scss';
import View from '../View';
import Text from '../Text';

type propsType = {
  width?: string | number;
  height?: string | number;
  class_name?: string;
  container_class?: string;
  maxLength?: any;
  rows?: number;
  onChange?: (val: any) => any;
  cols?: number;
  value?: string | undefined;
  style?: any;
  hideCounter?: boolean;
};

const Textarea: React.FC<propsType & React.HTMLAttributes<HTMLTextAreaElement>> = ({
  width,
  height,
  style,
  class_name = '',
  container_class = '',
  hideCounter,
  ...restProps
}) => {
  const [value, setValue] = useState('');
  const style_memo = useMemo(() => checkObjValue({ width, height }), [width, height]);

  const class_name_memo = useMemo(() => `textarea-container ${class_name}`, [class_name]);

  return (
    <View class_name={container_class}>
      <View class_name={class_name_memo} style={style_memo}>
        <textarea
          {...restProps}
          className="Subtitle"
          onChange={(e) => {
            restProps?.onChange?.(e);
            setValue(e.target.value);
          }}
        />
      </View>
      {hideCounter ? null : (
        <Text SmallL class_name="full-width t-align-right" color={'#868F90B2'}>{`${value.length}/${
          restProps?.maxLength || '∞'
        }`}</Text>
      )}
    </View>
  );
};

export default Textarea;
