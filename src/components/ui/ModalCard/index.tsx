import React, { useEffect } from 'react';
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';

import ModalCloseIcon from 'assets/icons/modal-close-dark.svg';

import './index.scss';
import { useStopBodyScroll } from 'hooks';

type propsType = {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  visible?: boolean;
};

const ModalCard: React.FC<propsType> = ({ title, onClose, visible, children }) => {
  useStopBodyScroll(visible);

  return (
    <View class_name={`custom-modal ph-20u ${visible ? '' : 'd-none'}`}>
      <View class_name="body-card p-20u">
        <View class_name="full-width space-b ais mb-12">
          <View width="calc(100% - 50px)">
            <Text BodyBlack>{title}</Text>
          </View>
          <View class_name="pointer" onClick={onClose}>
            <ModalCloseIcon />
          </View>
        </View>
        {children}
      </View>
    </View>
  );
};

export default ModalCard;
