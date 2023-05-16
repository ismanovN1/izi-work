import React, { useMemo } from 'react';

import { checkObjValue } from 'helpers/common';
import './index.scss';

type PropsT = {
  card?: boolean;
  bg?: string;
  children?: React.ReactNode;
  class_name?: string;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  style?: any;
};

const View: React.FC<PropsT & React.HTMLAttributes<HTMLDivElement>> = ({
  class_name = '',
  bg,
  width,
  height,
  style,
  children,
  card,
  top,
  right,
  bottom,
  left,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  ...restProps
}) => {
  const style_memo = useMemo(
    () =>
      checkObjValue({
        width,
        backgroundColor: bg,
        height,
        minWidth,
        minHeight,
        maxHeight,
        maxWidth,
        top,
        right,
        bottom,
        left,
      }),
    [width, height, top, minWidth, maxHeight, maxWidth, minHeight, right, bg, bottom, left],
  );

  const class_name_memo = useMemo(() => `${card ? 'card' : ''} ${class_name}`, [card, class_name]);

  return (
    <div {...restProps} className={class_name_memo} style={{ ...style_memo, ...style }}>
      {children}
    </div>
  );
};

export default React.memo(View);
