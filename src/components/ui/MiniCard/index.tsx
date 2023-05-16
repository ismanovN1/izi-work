import React from 'react';
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';

import './index.scss';

type propsType = {
  class_name?: string;
  src: any;
  children?: React.ReactNode;
  onClick?: () => void;
};

const MiniCard: React.FC<propsType> = ({ children, class_name, onClick, src }) => {
  return (
    <View class_name={'mini-card ' + class_name} onClick={onClick}>
      <Image class_name="img" src={src} fit="cover" />
      <View class_name="info-block">{children}</View>
    </View>
  );
};

export default MiniCard;
