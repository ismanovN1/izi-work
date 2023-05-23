import React, { ReactNode, useMemo } from 'react';

import { checkObjValue } from 'helpers/common';
import { ColorT } from 'types/common';
import './index.scss';
import Text from '../Text';
import { FadeLoader } from 'react-spinners';
import View from '../View';

type PropsT = {
  type?: 'priamry' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  bg?: ColorT;
  color?: ColorT;
  children?: React.ReactNode;
  onKeyDown?: (keyCode: any) => void;
  class_name?: string;
  width?: string | number;
  height?: string | number;
  style?: any;
  leftIcon?: ReactNode;
};

const Button: React.FC<PropsT> = ({
  disabled,
  class_name = '',
  type = 'primary',
  onClick,
  width,
  height,
  style,
  loading,
  onKeyDown,
  bg,
  leftIcon,
  color,
  children,
}) => {
  const onClickHandler = () => {
    if (!(disabled || loading)) {
      onClick?.();
    }
  };

  const style_memo = useMemo(() => checkObjValue({ width, height }), [width, height]);

  const class_name_memo = useMemo(
    () =>
      `button-${type} relative d-flex jcsb aic ${
        color ? 'color-' + color : type === 'outline' ? 'color-' + (bg || '') : ''
      } ${disabled ? 'button-disabled' : ''} ${
        bg ? (type === 'outline' ? ' bc-' : ' bg-') + bg : ''
      } ${class_name} custom-button`,
    [bg, color, type, class_name, disabled],
  );

  return (
    <div className={class_name_memo} onClick={onClickHandler} onKeyDown={onKeyDown} style={{ ...style_memo, ...style }}>
      {leftIcon ? <div className="left-icon center">{leftIcon}</div> : <div />}
      <div className="center flex-1">
        {typeof children === 'string' ? (
          <Text Button class_name="t-align-center">
            {children}
          </Text>
        ) : (
          children
        )}
      </div>
      {loading ? (
        <View width={32} height={32} class_name="p-15">
          <FadeLoader height={7} margin={-10} width={2} color={color || 'white'} />
        </View>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Button;
