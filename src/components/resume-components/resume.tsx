import React from 'react';
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import Text from 'components/custom-components/Text';
import { formatSalary } from 'helpers/common';
import { ResumeI } from 'types/common';
import { UserI } from 'store/auth-store/auth-slice';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import placemark from 'assets/icons/placemark.png';
import Button from 'components/custom-components/Button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks';

type propsType = {
  resume: Partial<ResumeI>;
  user?: Partial<UserI>;
};

const Resume: React.FC<propsType> = ({ resume, user }) => {
  const navigate = useNavigate();

  const { categories } = useAppSelector((s) => s.common);

  if (!resume) return null;
  return (
    <View width="100%" class_name="pb-80">
      <View class_name="fdc ais ph-20u pt-25">
        <View class_name="d-flex ais">
          <Image
            src={
              resume?.photo || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            width={140}
            height={140}
            class_name="br-10 mr-20u"
          />
          <View class_name="fdc jcsb pv-20">
            <Text BodyBlack>{user?.name}</Text>
            <View class_name="fdc">
              <Text Body>{resume?.category?.name}</Text>
              <Text Body>({categories.find((item) => item._id === resume?.category?._id)?.name})</Text>
            </View>
          </View>
        </View>
        <Text class_name="mt-30 mb-15" BodyBlack>
          Желаемая зарплата
        </Text>
        <Text Body red>
          {formatSalary(resume?.salary?.from, resume?.salary?.to)}{' '}
          {((period) => {
            switch (period) {
              case 'PER_MONTH':
                return 'в месяц';
              case 'PER_DAY':
                return 'в день';
              default:
                return '';
            }
          })(resume?.salary?.period)}
        </Text>

        <Text class_name="mt-22 mb-15" BodyBlack>
          О себе
        </Text>
        <Text Description>{resume?.about}</Text>

        <Text class_name="mt-22 mb-15" BodyBlack>
          Опыт работы
        </Text>
        <Text Description>{resume?.experience}</Text>

        <Text class_name="mt-22 mb-15" BodyBlack>
          Место положение
        </Text>
      </View>
      <View width="100%" height={270}>
        <YMaps>
          <Map defaultState={{ center: [43.2220146, 76.8512485], zoom: 12 }} width={'100%'} height={'100%'}>
            <Placemark
              geometry={resume?.address.coords}
              options={{
                iconLayout: 'default#image',
                iconImageHref: placemark,
                iconImageSize: [29, 42.43],
                iconImageOffset: [-18, -42],
              }}
            />
          </Map>
        </YMaps>
      </View>
      <View class_name="full-width ph-20u mt-32">
        {user.email ? <Button onClick={() => navigate('create-edit')}>Редактировать резюме</Button> : null}
      </View>
    </View>
  );
};

export default Resume;
