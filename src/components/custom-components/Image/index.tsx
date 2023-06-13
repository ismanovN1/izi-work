/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useMemo } from 'react';

// Helpers & Utils
import { checkObjValue } from 'helpers/common';

// Styles
import './index.scss';
import { useState } from 'react';
import { ClockLoader } from 'react-spinners';
import no_image from 'assets/icons/no-image.jpg';

type propsType = {
  width?: string | number;
  height?: string | number;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | 'initial' | 'unset';
  class_name?: string;
  src: any;
  alt?: string;
  style?: any;
};

const Image: React.FC<propsType & React.ImgHTMLAttributes<HTMLImageElement>> = ({
  width,
  height,
  src,
  alt,
  fit = 'cover',
  style,
  class_name = '',
  ...restProps
}) => {
  const style_memo = useMemo(() => checkObjValue({ width, height }), [width, height]);
  const [status, setStatus] = useState('PENDING');

  const class_name_memo = useMemo(() => `fit-${fit} ${class_name}`, [class_name, fit]);

  if (status === 'ERROR')
    return (
      <img src={no_image} alt={alt} className={class_name_memo} style={{ ...style_memo, ...style }} {...restProps} />
    );

  return (
    <img
      src={!src?.name ? src : URL.createObjectURL(src)}
      alt={alt}
      onError={() => setStatus('ERROR')}
      className={class_name_memo}
      style={{ ...style_memo, ...style }}
      {...restProps}
    />
  );
};

export default Image;
