import React from 'react';

// Components
import View from 'components/custom-components/View';

// Helpers & Utils
import { formatSalary, uw } from 'helpers/common';

// Images & Icons

// Styles
import './index.scss';
import Text from 'components/custom-components/Text';
import { isMobile } from 'react-device-detect';

type propsType = {
  person?: any;
  index?: number;
  class_name?: string;
  onClick?: () => void;
};

const PersonalCard: React.FC<propsType> = ({ person, onClick, index = 3, class_name }) => {
  return (
    <View
      class_name={`personal-card ${isMobile ? '' : (index + 1) % 4 === 0 ? '' : 'mr-10'} ${class_name}`}
      onClick={onClick}
    >
      <div className="img">
        <img src={person.picture || 'https://cdn-icons-png.flaticon.com/512/174/174369.png'} alt="person" />
      </div>
      <View class_name=" d-flex fdc mt-20u mb-25u">
        <Text DescriptionBlack>{person.name || '-'}</Text>
        <View class_name="mt-6 mb-10">
          <Text Description grey>
            {person.address}
          </Text>
        </View>
        <Text Description>{person.category_name}</Text>
      </View>
      <Text DescriptionB red>
        {formatSalary(person.salary_from, person.salary_to)}
      </Text>
    </View>
  );
};

export default PersonalCard;
