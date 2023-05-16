import React from 'react';
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';

import './index.scss';
import Text from 'components/custom-components/Text';
import Radio from 'components/custom-components/Radio';

type propsType = {
  class_name?: string;
  src: any;
  children?: React.ReactNode;
  onClick?: () => void;
  title?: string;
  description?: string;
  salary?: string;
  created?: string;
  showActions?: boolean;
  actions?: {
    is_called?: boolean;
    is_responded?: boolean;
    is_wrote?: boolean;
  };
};

const VacancyCard: React.FC<propsType> = ({
  title,
  showActions,
  actions,
  description,
  salary,
  created,
  class_name,
  onClick,
  src,
}) => {
  return (
    <View class_name="vacancy-card-container">
      <View class_name={'vacancy-card ' + class_name} onClick={onClick}>
        <Image class_name="img" fit="cover" src={src} />
        <View class_name="info-block">
          <Text SubtitleM>{title}</Text>
          <Text grey DescriptionL class_name="description h-60 mt-9 mb-5">
            {description}
          </Text>
          <Text SubtitleM red>
            {salary}
          </Text>
          <Text SmallestL grey class_name={'mt-11 t-align-right'}>
            {created}
          </Text>
        </View>
      </View>
      {showActions ? (
        <View class_name="actions">
          <Text class_name="title" Small>
            Действия
          </Text>
          <Radio class_name="mr-10" checked={!!actions?.is_called}>
            <Text class_name="ml-10" Small color="#868F90">
              звонок
            </Text>
          </Radio>
          <Radio class_name="mr-10" checked={!!actions?.is_wrote}>
            <Text class_name="ml-10" Small color="#868F90">
              чат
            </Text>
          </Radio>
          <Radio class_name="mr-10" checked={!!actions?.is_responded}>
            <Text class_name="ml-10" Small color="#868F90">
              отклик
            </Text>
          </Radio>
        </View>
      ) : null}
    </View>
  );
};

export default VacancyCard;
