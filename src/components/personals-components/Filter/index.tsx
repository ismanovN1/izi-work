import React, { useRef, useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import Select from 'components/custom-components/Select';
import Input from 'components/custom-components/Input';
import Button from 'components/custom-components/Button';

// Data
import { cities } from 'data/cities';

// Images & Icons
import ModalCloseIcon from 'assets/icons/modal-close.svg';
import LocationIcon from 'assets/icons/location.svg';
import placemarkI from 'assets/icons/placemark.png';
import placemarkC from 'assets/icons/placemark-c.png';

// Styles
import './index.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFilterParams } from 'store/resume-store/resume-slice';

type propsType = {
  visible?: boolean;
  onClose?: () => void;
};
let tId: any;
const Filter: React.FC<propsType> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<any>(null);

  const { categories } = useAppSelector((state) => state.common);
  const { filter_params, resumes } = useAppSelector((state) => state.resume);

  const [myPosition, setMyPosition] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState<any>();
  const [category, setCategoty] = useState<any>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      if (coords) {
        setMyPosition([coords.latitude, coords.longitude]);
        setCurrentPosition([coords.latitude, coords.longitude]);
      }
    });
  }, []);

  useEffect(() => {
    if (visible) {
      const cc = categories.find((item) => item._id === filter_params.category_id);
      if (cc) {
        setCategoty({ _id: cc._id, name: cc.name });
      } else setCategoty(undefined);

      if (filter_params.lat) setCurrentPosition([filter_params.lat, filter_params.lon]);
    }
  }, [visible]);

  const onChangeField = (field: any) => {
    clearTimeout(tId);
    setTimeout(() => {
      dispatch(setFilterParams((prev) => ({ ...prev, ...field })));
    }, 1000);
  };

  if (!visible) return null;
  return (
    <View class_name="filter-modal">
      <View maxWidth={1100}>
        <View class_name="full-width space-b  mt-44 mb-20">
          <Text H2 white>
            Фильтр
          </Text>
          <View class_name="pointer" onClick={onClose}>
            <ModalCloseIcon />
          </View>
        </View>

        <View class_name="d-flex ais full-width" height={818}>
          <View class_name="p-20u" card width={275} height="100%">
            <Text SubtitleB>Поиск сотрудника</Text>
            <Text DescriptionM class_name="mt-25 mb-9">
              Выберите категорию
            </Text>
            <Select
              placeholder="Категории..."
              value={category}
              onChange={(e) => {
                onChangeField({ category_id: e._id });
                setCategoty(e);
              }}
              options={categories.map((item) => ({ _id: item._id, name: item.name }))}
            />
            <Text DescriptionM class_name="mt-20 mb-5">
              Выберите зарплату
            </Text>

            <View class_name="space-b full-width">
              <View width="49%">
                <Text Small grey>
                  От
                </Text>
                <Input
                  value={filter_params.salary_from}
                  onChange={(e) => onChangeField({ salary_from: e.target.value })}
                />
              </View>
              <View width="49%">
                <Text Small grey>
                  До
                </Text>
                <Input value={filter_params.salary_to} onChange={(e) => onChangeField({ salary_to: e.target.value })} />
              </View>
            </View>
            <Text DescriptionM class_name="mt-30 mb-9">
              Выберите город
            </Text>
            <Select
              placeholder="Города..."
              onChange={(e) => {
                const place = cities.find((item) => item.id === e._id);
                if (place) {
                  onChangeField({
                    lat: place.coords[0],
                    lon: place.coords[1],
                    distance: 25000,
                  });
                  mapRef.current?.setCenter(place.coords, 11);
                }
              }}
              options={cities.map((item) => ({ _id: item.id, name: item.name }))}
            />
            <Button
              leftIcon={<LocationIcon />}
              class_name="mt-30"
              onClick={() => {
                if (myPosition) {
                  onChangeField({
                    lat: myPosition[0],
                    lon: myPosition[1],
                    distance: 25000,
                  });
                  mapRef.current?.setCenter(myPosition, 11);
                }
              }}
            >
              Сотрудник рядом
            </Button>
          </View>
          <View class_name="br-8 flex-1 ml-20u ovf-hidden bg-red" height={818}>
            <YMaps>
              <Map
                instanceRef={(ref) => (mapRef.current = ref)}
                width="100%"
                height={'100%'}
                defaultState={{ center: currentPosition || [43.2220146, 76.8512485], zoom: 12 }}
              >
                {myPosition ? (
                  <Placemark
                    geometry={myPosition}
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: placemarkC,
                      iconImageSize: [29, 42.43],
                      iconImageOffset: [-18, -42],
                    }}
                  />
                ) : null}
                {resumes.map((item) => (
                  <Placemark
                    geometry={[...(item.location?.coordinates || [])].reverse()}
                    key={item._id}
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: placemarkI,
                      iconImageSize: [29, 42.43],
                      iconImageOffset: [-18, -42],
                    }}
                  />
                ))}
              </Map>
            </YMaps>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Filter;
