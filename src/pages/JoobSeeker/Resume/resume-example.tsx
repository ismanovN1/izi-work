import React from 'react';

// Components
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Resume from 'components/resume-components/resume';

import photo from 'assets/images/example-person.png';

const ResumeExample = () => {
  return (
    <View class_name="full-width fdc aic mt-30">
      <Text BodyB blue class_name="t-align-center  mb-10 ph-20u">
        Благодаря такому заполнению резюме, люди находят работу в среднем в течении 20 часов.
      </Text>
      <svg width="31" height="17" viewBox="0 0 31 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.919521 0.48826C1.49415 -0.145769 2.44373 -0.164805 3.04046 0.445742L15.5 13.1937L27.9595 0.44574C28.5563 -0.164806 29.5058 -0.14577 30.0805 0.488259C30.6551 1.12229 30.6372 2.13121 30.0405 2.74176L16.5405 16.5543C15.9596 17.1486 15.0404 17.1486 14.4595 16.5543L0.959538 2.74176C0.362806 2.13122 0.344889 1.12229 0.919521 0.48826Z"
          fill="#038CA9"
        />
      </svg>
      <View class_name="full-width mt-27">
        <Resume
          resume={{
            _id: '1',
            photo,
            category: { _id: '1', childId: '3', name: 'Официант' },
            salary: { from: 80000, to: 100000, period: 'PER_MONTH' },
            about: `Ответственный и пунктуальный. Не боюсь сложной работы. Легко обучаемый. Без вредных привычек.

              Образование:
              КазУМОиМЯ имени Абылай хана
              Международные отношения`,
            experience: `Июль 2019 - март 2022
              Кафе “Алина”
              Официант
              
              Март 2022 - по настоящее время 
              Бар “Пинта”
              Главный официант`,
            address: { name: 'Гагарина 90/185', coords: [43.241594642823834, 76.8948618288566] },
          }}
          user={{ name: 'Жаманов \nЖанибек' }}
        />
      </View>
    </View>
  );
};

export default ResumeExample;
