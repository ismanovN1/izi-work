import React from 'react';

// Components
import View from 'components/custom-components/View';

// Helpers & Utils
import { uw } from 'helpers/common';

// Images & Icons

// Styles
import './index.scss';
import Text from 'components/custom-components/Text';

type propsType = {
  active?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
};

const CategoryItem: React.FC<
  propsType & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ active, icon, children, onClick }) => {
  return (
    <View class_name={`center category-item${active ? '-active' : ''} mr-10 mb-10`} onClick={onClick}>
      <View class_name="mr-10">{icon}</View>
      <Text Small class_name="white-space-nowrap">
        {children}
      </Text>
    </View>
  );
};

export default CategoryItem;
