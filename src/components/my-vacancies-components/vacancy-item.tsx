import React from 'react';

import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import MiniCard from 'components/ui/MiniCard';

import HandIcon from 'assets/icons/hand-grey.svg';
import EyeIcon from 'assets/icons/eye-grey.svg';
import FavoriteIcon from 'assets/icons/favorite-grey.svg';

type propsType = {
  src: any;
  onClick?: () => void;
  salary?: string;
  title: string;
  active?: boolean;
  statistics: {
    responses: number;
    views: number;
    favorites: number;
  };
};

const VacancyItem: React.FC<propsType> = ({ salary, title, active, statistics, ...restProps }) => {
  return (
    <MiniCard {...restProps} class_name={`${active ? '' : 'opc-05'} mb-10`}>
      <View class_name="fdc jcsb pt-15 full-width full-height">
        <Text SmallB>{title}</Text>
        <Text SmallM>{salary}</Text>
        <View class_name="d-flex aic">
          <View class_name="center">
            <View>
              <EyeIcon />
            </View>
            <Text class_name="ml-3 mr-5 w-35" ExtraSmallM grey>
              {statistics.views}
            </Text>
          </View>
          <View class_name="center">
            <View>
              <HandIcon />
            </View>
            <Text class_name="ml-3 mr-5 w-35" ExtraSmallM grey>
              {statistics.responses}
            </Text>
          </View>
          <View class_name="d-flex aic">
            <View>
              <FavoriteIcon />
            </View>
            <Text class_name="ml-3 mr-5 w-35" ExtraSmallM grey>
              {statistics.favorites}
            </Text>
          </View>
        </View>
      </View>
    </MiniCard>
  );
};

export default VacancyItem;
