/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useRef, useEffect } from 'react';

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
import { formatSalary, parseSalaryPeriod } from 'helpers/common';

const SearchJobInTheCard = () => {
  const navigate = useNavigate();

  const mapRef = useRef(null);
  const ymaps = useRef(null);
  const placemarkRef = useRef<any>(null);

  const [current_coordinates, set_current_coordinates] = useState<any>();

  const { resume } = useAppSelector((state) => state.resume);
  const { vacancies_nearby } = useAppSelector((state) => state.vacancies);

  useEffect(() => {
    set_current_coordinates(resume?.address?.coords || [43.2220146, 76.8512485]);
  }, [resume]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      if (coords) {
        set_current_coordinates([coords.latitude, coords.longitude]);
        setMark([coords.latitude, coords.longitude]);
      }
    });
  }, []);

  const createPlacemark = (coords: any): any => {
    if (!ymaps.current) return null;
    return new ymaps.current.Placemark(
      coords,
      {
        iconCaption: 'loading..',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: placemarkI,
        iconImageSize: [29, 42.43],
        iconImageOffset: [-18, -42],
      },
    );
  };

  const setMark = (coords: any) => {
    if (placemarkRef.current) {
      placemarkRef.current.geometry?.setCoordinates(coords);
    } else {
      placemarkRef.current = createPlacemark(coords);
      mapRef.current.geoObjects.add(placemarkRef.current);
    }
  };

  const onMapClick = (e) => {
    const coords = e.get('coords');
    setMark(coords);
    set_current_coordinates(coords);
  };

  return (
    <View class_name="full-width fdc ais" height={'calc(100vh - 65px)'}>
      {resume?.address && (
        <View class_name="fill-width bg-red ph-20u d-flex jcsb pv-12">
          <Text class_name="f-grow-1 mr-20" white Subtitle>
            {resume?.address.name}
          </Text>
          <View class_name="pointer" onClick={() => navigate('/resume/create-edit')}>
            <PenIcon />
          </View>
        </View>
      )}
      <CSlider coords={current_coordinates} />
      <View width="100%" class_name="f-grow-1">
        <YMaps>
          <Map
            defaultState={{ center: [43.2220146, 76.8512485], zoom: 12 }}
            width={'100%'}
            height={'100%'}
            instanceRef={(ref) => (mapRef.current = ref)}
            onClick={onMapClick}
            onLoad={(ympasInstance) => {
              ymaps.current = ympasInstance;
              setMark(current_coordinates || [43.2220146, 76.8512485]);
            }}
            modules={[
              'templateLayoutFactory',
              'layout.ImageWithContent',
              'Placemark',
              'geoObject.addon.hint',
              'geocode',
            ]}
          >
            {vacancies_nearby?.map((item) => (
              <Placemark
                key={item._id}
                onClick={() => navigate(`/vacancies/${item._id}`)}
                properties={{
                  hintContent: `<b>${item.category_name || '-'}</b><br/><span>${formatSalary(
                    item.salary_from,
                    item.salary_to,
                  )}</span>`,
                }}
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
