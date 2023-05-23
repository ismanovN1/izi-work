import React from 'react';
import View from 'components/custom-components/View';

import BackArrowIcon from 'assets/icons/back-arrow.svg';
import Text from 'components/custom-components/Text';
import { useNavigate } from 'react-router-dom';

type propsType = {
  children?: any;
  class_name?: string;
};

const BackButton: React.FC<propsType> = ({ children, class_name }) => {
  const navigate = useNavigate();
  return (
    <View class_name={`go-back-button ${class_name}`} onClick={() => navigate(-1)}>
      <BackArrowIcon />
      <Text BodyB class_name="ml-10" color="#ABB1B2">
        {children}
      </Text>
    </View>
  );
};

export default React.memo(BackButton);
