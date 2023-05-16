/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState, useCallback } from 'react';

import MaskedInput from 'react-text-mask';

// Helpers & Utils
import { checkObjValue } from 'helpers/common';

//Images & Icons
import EyeIcon from 'assets/icons/show-off.svg';

// Styles
import './index.scss';
import View from '../View';

type propsType = {
  width?: string | number;
  height?: string | number;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  class_name?: string;
  style?: any;
  type?: any;
  mask?: Array<any>;
  guide?: boolean;
  modelClean?: boolean;
};

const Input = React.forwardRef<
  propsType & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  any
>(({ width, height, rightIcon, leftIcon, style, class_name = '', type, ...restProps }, ref) => {
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (showPass) {
      setTimeout(() => {
        setShowPass(false);
      }, 3000);
    }
  }, [showPass]);

  const style_memo = useMemo(() => checkObjValue({ width, height }), [width, height]);

  const class_name_memo = useMemo(() => `input-container ${class_name}`, [class_name]);

  return (
    <View class_name={class_name_memo} style={style_memo}>
      {leftIcon ? <View class_name="left-icon">{leftIcon}</View> : null}
      {restProps.mask ? (
        <MaskedInput ref={ref} {...restProps} className="Subtitle" type={showPass ? 'text' : type} />
      ) : (
        <input ref={ref} {...restProps} className="Subtitle" type={showPass ? 'text' : type} />
      )}
      {type === 'password' && !showPass ? (
        <View class_name="pl-10 pointer" onClick={() => setShowPass(true)}>
          <EyeIcon />
        </View>
      ) : null}
      {rightIcon ? <View class_name="right-icon">{rightIcon}</View> : null}
    </View>
  );
});

export default React.memo(Input);
