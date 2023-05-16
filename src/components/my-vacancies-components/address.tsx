/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useMemo, useEffect, useRef } from 'react';

import Input from 'components/custom-components/Input';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Radio from 'components/custom-components/Radio';
import { VacancyI } from 'types/common';
import Select from 'components/custom-components/Select';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import Image from 'components/custom-components/Image';
import placemark from 'assets/icons/placemark.png';

type propsType = {
  value?: VacancyI['address'];
  onChange?: (val: VacancyI['address'] | undefined) => void;
};

let tId: any;

const Address: React.FC<propsType> = ({ onChange, value }) => {
  const ymaps = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const [val, setVal] = useState<VacancyI['address'] | undefined>();
  const [options, setOptions] = useState<any>([]);
  const [lastAddresses, setLastAddresses] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setLastAddresses(JSON.parse(localStorage.getItem('lets') || '[]'));
    })();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setVal(value);
      console.log(value.coords);

      if (value.coords)
        setTimeout(() => {
          mapRef.current?.setCenter(value.coords, 12);
          setMark(value.coords);
        }, 500);
    }, 100);
    return () => clearTimeout(id);
  }, [value]);

  const onChangeHandler = (field: Partial<VacancyI['address']>) => {
    setVal((prev) => ({ ...prev, ...field }));
    onChange?.({ ...val, ...field });
  };

  const createPlacemark = (coords: any): any => {
    if (!ymaps.current) return null;
    return new ymaps.current.Placemark(
      coords,
      {
        iconCaption: 'loading..',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: placemark,
        iconImageSize: [29, 42.43],
        iconImageOffset: [-18, -42],
        draggable: true,
      },
    );
  };

  const getAddress = (coords) => {
    // placemarkRef.current?.properties.set('iconCaption', 'loading..');
    ymaps.current.geocode(coords).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);

      // const newAddress = [
      //   firstGeoObject.getLocalities().length
      //     ? firstGeoObject.getLocalities()
      //     : firstGeoObject.getAdministrativeAreas(),
      //   firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
      // ]
      //   .filter(Boolean)
      //   .join(', ');
      onChangeHandler({ name: firstGeoObject.getAddressLine(), coords });

      // placemarkRef.current.properties.set({
      //   iconCaption: newAddress,
      //   balloonContent: firstGeoObject.getAddressLine(),
      // });
    });
  };

  const searchAddress = (search) => {
    console.log(search);

    // clearTimeout(tId);
    tId = setTimeout(() => {
      ymaps.current.geocode(search).then((res) => {
        const places: any[] = [];

        for (let i = 0; i < 5; i++) {
          const object = res.geoObjects.get(i);

          if (object) {
            places.push({ _id: i, name: object.getAddressLine(), coords: object.geometry?.getCoordinates() });
          } else break;
        }
        setOptions(places);
      });
    }, 1000);
  };

  const setMark = (coords: any) => {
    if (placemarkRef.current) {
      placemarkRef.current.geometry.setCoordinates(coords);
    } else {
      placemarkRef.current = createPlacemark(coords);
      mapRef.current.geoObjects.add(placemarkRef.current);
      placemarkRef.current.events.add('dragend', function () {
        getAddress(placemarkRef.current.geometry.getCoordinates());
      });
    }
  };

  const onMapClick = (e) => {
    const coords = e.get('coords');
    setMark(coords);

    getAddress(coords);
  };

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      <Text Description color="#868F90B2" class_name="mb-25">
        Выберите ранее использовавшееся местоположение или добавьте новое
      </Text>
      {lastAddresses.map((item: any, index) => {
        return (
          <Radio key={index}>
            <Text class_name="ml-10" Subtitle>
              {item.name}
            </Text>
          </Radio>
        );
      })}
      <Text class_name="mt-40 mb-15" SubtitleM>
        Выберите новое месторасположение
      </Text>
      <Select
        search
        options={options}
        onChange={(e: any) => {
          onChangeHandler(e);
          if (e.coords) {
            mapRef.current?.setCenter(e.coords, 12);
            setMark(e.coords);
          }
        }}
        inputArgs={{
          placeholder: 'Введите название или выберите',
          value: val?.name,
          onChange: (e) => {
            searchAddress(e.target.value);
          },
        }}
      />
      <Text class_name="mt-35 mb-12" SubtitleM>
        Укажите адрес на карте
      </Text>
      <View width="100%" height={250} class_name="br-10 pointer">
        <YMaps query={{ apikey: '0d85c950-dec2-47d5-903c-2c64cc4c973c' }}>
          <Map
            modules={['Placemark', 'geocode', 'geoObject.addon.balloon']}
            instanceRef={(ref) => (mapRef.current = ref)}
            onLoad={(ympasInstance) => (ymaps.current = ympasInstance)}
            onClick={onMapClick}
            width="100%"
            height={'100%'}
            defaultState={{ center: [43.2220146, 76.8512485], zoom: 12 }}
          ></Map>
        </YMaps>
      </View>
    </View>
  );
};

export default Address;
