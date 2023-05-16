import { checkObjValue } from 'helpers/common';
import React, { useMemo } from 'react';

const typography = {
  H1: true,
  H2: true,
  H3: true,
  BodyBlack: true,
  BodyB: true,
  BodyM: true,
  Body: true,
  SubtitleBlack: true,
  SubtitleB: true,
  SubtitleM: true,
  Subtitle: true,
  SubtitleL: true,
  Button: true,
  DescriptionBlack: true,
  DescriptionB: true,
  DescriptionM: true,
  Description: true,
  DescriptionL: true,
  SmallB: true,
  SmallM: true,
  Small: true,
  SmallL: true,
  Smallest: true,
  SmallestM: true,
  SmallestL: true,
  ExtraSmallM: true,
};
const colors = {
  blue: true,
  black: true,
  bright_grey: true,
  ghost: true,
  grey: true,
  inactive: true,
  red: true,
  white: true,
};

const obj = { ...colors, ...typography };

type TextT = {
  [Property in keyof typeof obj]?: boolean;
};

type PropsT = {
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  class_name?: string;
  style?: any;
  color?: string;
};

const Text: React.FC<PropsT & TextT> = ({
  disabled,
  color,
  class_name = '',
  onClick,
  style,
  children,
  ...restProps
}) => {
  const onClickHandler = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  const textStyle = useMemo(
    () =>
      Object.keys(restProps).reduce((acc, currentVal) => {
        const clr = colors[currentVal as keyof typeof colors];
        if (clr) {
          return acc + `color-${currentVal} `;
        }

        const font = typography[currentVal as keyof typeof typography];
        if (font) {
          return acc + currentVal + ' ';
        }

        return acc;
      }, ''),
    [restProps],
  );

  return (
    <span className={textStyle + class_name} onClick={onClickHandler} style={{ ...style, ...checkObjValue({ color }) }}>
      {children}
    </span>
  );
};

export default React.memo(Text);
