import View from 'components/custom-components/View';
import { screen_height } from 'helpers/common';
import { useAppSelector } from 'hooks';
import React from 'react';
import { Map, YMaps, Placemark } from 'react-yandex-maps';

import placemarkI from 'assets/icons/placemark.png';
import placemarkC from 'assets/icons/placemark-c.png';

const MapForCandidates = ({ currentPosition, myPosition, setSearchParams }: any, mapRef) => {
  const { resumes, filter_params } = useAppSelector((s) => s.resume);
  return (
    <View class_name="br-8 f-shrink-1 ovf-hidden bg-light-grey" height={screen_height - 180} width={808}>
      <YMaps>
        <Map
          instanceRef={(ref) => (mapRef.current = ref)}
          width="100%"
          height={'100%'}
          defaultState={{ center: currentPosition || [43.2220146, 76.8512485], zoom: 12 }}
          modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
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
              onClick={() => {
                setSearchParams(`candidate_id=${item._id}`);
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref: placemarkI,
                iconImageSize: [20, 28],
                iconImageOffset: [-12, -28],
              }}
              properties={{
                hintContent: `<b>${item.name || '-'}</b><br/><span>${item.category_name}</span>`,
                balloonContent: '<div class="card mb-12 p-10 br-4"></div>',
              }}
            />
          ))}
        </Map>
      </YMaps>
    </View>
  );
};

export default React.memo(React.forwardRef(MapForCandidates));
