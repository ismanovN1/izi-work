import React, { useState, useRef } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

import PenIcon from 'assets/icons/pen-white.svg';
import placemarkI from 'assets/icons/placemark-i.png';

import 'rc-slider/assets/index.css';
import { useAppSelector } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { CSlider } from './slider';

const SearchJobInTheCard = () => {
  const navigate = useNavigate();

  const mapRef = useRef(null);
  const ymaps = useRef(null);

  const [template, setTemplate] = useState<any>();

  const { resume } = useAppSelector((state) => state.resume);
  const { vacancies_nearby } = useAppSelector((state) => state.vacancies);

  return (
    <View class_name="full-width fdc ais" height={'calc(100vh - 65px)'}>
      {resume?.address && (
        <View class_name="fill-width bg-red ph-20u d-flex jcsb pv-12">
          <Text class_name="f-grow-1 mr-20" white Subtitle>
            {resume?.address.name}
          </Text>
          <View class_name="pointer" onClick={() => navigate('/waiter/resume/create-edit')}>
            <PenIcon />
          </View>
        </View>
      )}
      <CSlider coords={resume?.address?.coords} />
      <View width="100%" class_name="f-grow-1">
        <YMaps>
          <Map
            defaultState={{ center: [43.2220146, 76.8512485], zoom: 12 }}
            width={'100%'}
            height={'100%'}
            instanceRef={(ref) => (mapRef.current = ref)}
            onLoad={(ympasInstance) => {
              ymaps.current = ympasInstance;
              setTemplate(ympasInstance.templateLayoutFactory.createClass);
            }}
            modules={['templateLayoutFactory', 'layout.ImageWithContent']}
          >
            <Placemark
              geometry={resume?.address?.coords || [43.2220146, 76.8512485]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: placemarkI,
                iconImageSize: [29, 42.43],
                iconImageOffset: [-18, -42],
              }}
            />
            {vacancies_nearby?.map((item) => (
              <Placemark
                key={item._id}
                onClick={() => navigate(`/waiter/vacancies/${item._id}`)}
                geometry={[...(item.location?.coordinates || [])].reverse()}
              />
            ))}
          </Map>
        </YMaps>
      </View>
    </View>
  );
};

export default SearchJobInTheCard;
