/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';

// Components
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

// Helpers
import { formatSalary, screen_height } from 'helpers/common';

// Images & Icons
import PhoneIcon from 'assets/icons/phone-grey.svg';
import LocationIcon from 'assets/icons/location-grey.svg';
import FavoriteIcon from 'assets/icons/favorite.svg';
import FavoriteGreyIcon from 'assets/icons/favorite-grey-large.svg';

// Others
import './candidate-card-style.scss';
import Button from 'components/custom-components/Button';
import { useAppDispatch, useAppSelector } from 'hooks';
import { add_remove_my_favorite_resume_thunk } from 'store/action-store/action-thunk';
import BackButton from 'components/ui/BackButton';
import { get_chat_thunk } from 'store/chat-store/chat-thunk';
import { useNavigate } from 'react-router-dom';

type propsType = {
  data: any;
};

const CandidateCard: React.FC<propsType> = ({ data }) => {
  console.log('data', data);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categories } = useAppSelector((s) => s.common);
  const { user } = useAppSelector((s) => s.auth);

  const { favorite_resumes } = useAppSelector((s) => s.resume);

  const is_favorite = favorite_resumes.includes(data.resume_id?._id);

  const RenderRow: React.FC<{ title: string; children: string; mb?: number; mt?: number }> = ({
    title,
    mb,
    mt,
    children,
  }) => {
    return (
      <View class_name={`fdc ${mb ? 'mb-' + mb.toString() : ''} ${mt ? 'mt-' + mt.toString() : ''}`}>
        <Text DescriptionM>{title}</Text>
        <Text Description class_name="mt-4">
          {children}
        </Text>
      </View>
    );
  };

  const go_to_chat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <View>
      <BackButton class_name="mv-10">Назад</BackButton>
      <View class_name="candidate-card">
        <Image src={data.resume_id?.picture} class_name="candidate-ava" />
        <View class_name="candidate-info relative">
          <View
            class_name="favorite-icon"
            onClick={(e) => {
              e.stopPropagation();
              if (data.resume_id?._id)
                dispatch(
                  add_remove_my_favorite_resume_thunk({ resume_id: data.resume_id?._id, is_favorite: !is_favorite }),
                );
            }}
          >
            {is_favorite ? <FavoriteIcon /> : <FavoriteGreyIcon />}
          </View>
          <View class_name="fdc f-grow-1 pl-20 pb-30">
            <View class_name="fdc mt-5">
              <Text SubtitleB>{data.waiter_id?.name}</Text>
              <Text Small grey class_name="mt-5">
                {' '}
              </Text>
            </View>
            <View class_name="fdr aic mt-28">
              <LocationIcon />
              <Text Description class_name="ml-8">
                {data?.resume_id?.address}
              </Text>
            </View>
            <View class_name="fdc mt-28">
              <Text DescriptionM>{data?.resume_id?.category_name}</Text>
              <Text Description class_name="mt-5">
                ({categories.find((c) => c._id === data?.resume_id?.category_id).name})
              </Text>
            </View>
            <a className="fdr aic mt-28" href={`tel:${data.waiter_id?.phone}`}>
              <PhoneIcon />
              <Text SubtitleB class_name="ml-8" black>
                {`  +${data.waiter_id?.phone}`}
              </Text>
            </a>
          </View>
          <Button
            onClick={() => {
              if (data?.chat_id) dispatch(get_chat_thunk({ chat_id: data?.chat_id }, go_to_chat));
              else {
                dispatch(
                  get_chat_thunk(
                    {
                      resume_id: data.resume_id._id,
                      waiter_id: data.waiter_id._id,
                      employer_id: user._id,
                      vacancy_id: data.vacancy_id,
                    },
                    go_to_chat,
                  ),
                );
              }
            }}
          >
            Чат
          </Button>
        </View>
        {data?.ask ? (
          <View class_name="candidate-response">
            <Text SubtitleB>Ответ на тест Вопрос</Text>
            {data?.ask.map((item: any, index: number) => (
              <>
                {index ? <View class_name="full-width h-1 bg-light-grey mv-35" /> : null}
                <View key={item._id} class_name="fdc mt-40 mb-10">
                  <Text Small grey>
                    Вопрос {index ? index + 1 : ''}
                  </Text>
                  <Text Description class_name="mt-5 mb-35">
                    {item?.question}
                  </Text>
                  <Text Small grey>
                    Ответ
                  </Text>
                  <Text SubtitleB class_name="mt-5">
                    {item.ask}
                  </Text>
                </View>
              </>
            ))}
          </View>
        ) : null}
        <View class_name="candidate-description">
          <View class_name="mb-40">
            <Text DescriptionM>Обо мне:</Text>
            <br />
            <Text Description class_name="mt-5">
              {data?.resume_id?.about_me}
            </Text>
          </View>
          <View class_name="mb-40 fdc">
            <Text DescriptionM>Опыт работы:</Text>

            <Text class_name="mt-5" DescriptionB>
              {data?.resume_id?.experience}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CandidateCard;
