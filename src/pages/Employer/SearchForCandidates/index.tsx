import React, { useEffect, useRef, useState } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';

// helpers
import './index.scss';

import CandidateItem from 'components/my-vacancies-components/candidate-item';
import { useSearchParams } from 'react-router-dom';
import { checkObjValue, screen_height } from 'helpers/common';
import CandidateInfo from './candidate-info';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_resumes_thunk } from 'store/resume-store/resume-thunk';
import Filter from './filter';
import MapForCandidates from './map';
import BackButton from 'components/ui/BackButton';
import Button from 'components/custom-components/Button';

import { filter_icon_png } from 'assets/icons/personals-icons';
import Image from 'components/custom-components/Image';

const SearchCandidates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const mapRef = useRef<any>(null);

  const { resumes, filter_params } = useAppSelector((s) => s.resume);

  const [candidate_id, setCandidate_id] = useState<string | null>(null);
  const [mode, setMode] = useState<'MAP' | 'LIST' | 'FILTER'>('LIST');

  const [myPosition, setMyPosition] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState<any>();

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
    const cId = searchParams.get('candidate_id');
    setCandidate_id(cId);
  }, [setSearchParams]);

  useEffect(() => {
    dispatch(get_resumes_thunk(checkObjValue(filter_params)));
  }, [filter_params]);

  useEffect(() => {
    if (filter_params.lat) setCurrentPosition([filter_params.lat, filter_params.lon]);
  }, []);

  return (
    <View class_name="full-width d-flex ais search-waiters">
      <View width={125} class_name="f-shrink-1" />
      <Filter
        candidate_id={candidate_id}
        go_to={(coords, zoom) => {
          mapRef.current?.setCenter(coords, zoom);
        }}
        mode={mode}
        setMode={setMode}
        show_nearby={(onChangeField) => {
          setMode('MAP');
          setSearchParams('');
          if (myPosition) {
            onChangeField({
              lat: myPosition[0],
              lon: myPosition[1],
              distance: 25000,
            });
            mapRef.current?.setCenter(myPosition, 11);
          }
        }}
      />
      <View
        width={275}
        class_name={`fdc ais ml-10 ${mode !== 'LIST' ? 'd-none' : ''} ${candidate_id ? 'd-none-on-mobile' : ''}`}
      >
        <View class_name="h-50 pt-22 ph-20 list-header">
          <Button
            type="outline"
            class_name="d-none d-flex-on-mobile"
            leftIcon={<Image width={20.7} src={filter_icon_png} />}
            onClick={() => setMode('FILTER')}
          >
            Фильтр
          </Button>
        </View>
        <View
          class_name="fdc ovf-y-auto ovf-x-hidden scroll_bar_usual pr-20 ph-10 pt-10"
          maxHeight="calc(100vh - 150px)"
        >
          {resumes.map((item) => (
            <CandidateItem
              key={item._id}
              resume_id={item._id}
              name={item.name || '-'}
              address={item.address}
              job={item.category_name}
              active={!candidate_id || candidate_id == item._id}
              src={item.picture || 'https://cdn-icons-png.flaticon.com/512/174/174369.png'}
              onClick={() => {
                setSearchParams(`candidate_id=${item._id}`);
              }}
            />
          ))}
        </View>
      </View>
      <View
        class_name={`fdc  pl-20 pr-10 map-container ${mode !== 'MAP' ? 'd-none' : ''} ${
          candidate_id ? 'd-none-on-mobile' : ''
        }`}
      >
        <Button
          type="outline"
          class_name="d-none d-flex-on-mobile mv-10"
          leftIcon={<Image width={20.7} src={filter_icon_png} />}
          onClick={() => setMode('FILTER')}
        >
          Фильтр
        </Button>
        <View class_name="h-60 d-flex aic">
          <Text SubtitleB>Найди сотрудника рядом с офисом</Text>
        </View>
        <MapForCandidates
          setSearchParams={setSearchParams}
          myPosition={myPosition}
          currentPosition={currentPosition}
          ref={mapRef}
        />
      </View>
      {candidate_id ? (
        <View class_name="waiter-info">
          <BackButton class_name="mv-20">Назад</BackButton>
          <View class_name="mt-60 ph-10 ass d-flex">
            <CandidateInfo candidate_id={candidate_id} />
          </View>
        </View>
      ) : null}
      <View width={125} class_name="f-shrink-1" />
    </View>
  );
};

export default SearchCandidates;
