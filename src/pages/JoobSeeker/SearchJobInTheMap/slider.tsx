import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import { useAppDispatch } from 'hooks';
import Slider from 'rc-slider';
import React, { useState, useEffect } from 'react';
import { get_vacancies_nearby_thunk } from 'store/vacancies-store/vacancies-thunk';

const sliderStyle = {
  trackStyle: {
    marginTop: 7,
    backgroundColor: '#D5DEDE',
    height: 1,
  },
  railStyle: {
    marginTop: 7,
    backgroundColor: '#D5DEDE',
    height: 1,
  },
  handleStyle: {
    backgroundColor: '#fff',
    height: 25,
    width: 25,
    borderWidth: 5,
    borderRadius: '50%',
    borderColor: '#FF5050',
  },
  activeDotStyle: {
    borderColor: '#FF5050',
  },
};
let tId: any;
export const CSlider = ({ coords }: any) => {
  const dispatch = useAppDispatch();
  const [radius, setRadius] = useState(12);

  const getVacancies = () => {
    clearTimeout(tId);
    tId = setTimeout(() => {
      dispatch(
        get_vacancies_nearby_thunk({
          lat: coords[0],
          lon: coords[1],
          distance: radius * 1000,
        }),
      );
    }, 1000);
  };

  useEffect(() => {
    if (radius && coords) {
      getVacancies();
    }
  }, [radius, coords]);

  return (
    <View class_name="fill-width bg-white ph-20u fdc ais pt-10 pb-20">
      <View class_name="space-b mb-10">
        <Text SubtitleM>Искать в радиусе</Text>
        <Text SubtitleM>{radius} км</Text>
      </View>
      <Slider
        defaultValue={3}
        keyboard={false}
        min={0}
        max={25}
        value={radius}
        onChange={(e) => setRadius(Number(e))}
        {...sliderStyle}
      />
    </View>
  );
};
