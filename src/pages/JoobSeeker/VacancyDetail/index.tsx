import React, { useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { VacancyI } from 'types/common';
import BackIcon from 'assets/icons/back-arrow-white.svg';
import ShareIcon from 'assets/icons/share-icon.svg';
import placemark from 'assets/icons/placemark.png';
import PromtIcon from 'assets/icons/promt.svg';
import FavoriteIcon from './FavoriteIcon';
import Text from 'components/custom-components/Text';
import { checkObjValue, formatSalary, get_def_images } from 'helpers/common';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import Button from 'components/custom-components/Button';
import { RWebShare } from 'react-web-share';
import ModalCard from 'components/ui/ModalCard';
import { Survey } from './survey';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_vacancy_by_id_thunk } from 'store/vacancies-store/vacancies-thunk';
import { GridLoader } from 'react-spinners';
import { GET_VACANCY_BY_ID } from 'store/vacancies-store/constans';
import { removeSuccess, setSuccess } from 'store/common-store/common-slice';
import { get_respond_thunk, respond_thunk } from 'store/action-store/action-thunk';
import { RESPOND } from 'store/action-store/constants';
import { setCurrentRespond } from 'store/action-store/action-slice';
import { GET_CHAT } from 'store/chat-store/constants';
import { get_chat_thunk } from 'store/chat-store/chat-thunk';

const VacancyDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { resume } = useAppSelector((state) => state.resume);
  const { current_respond } = useAppSelector((state) => state.actions);
  const { loadings, errors, successes, categories } = useAppSelector((state) => state.common);
  const { vacancyId } = useParams();

  const [showCompanyDetail, setShowCompanyDetail] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [warning, setWarning] = useState<string | undefined>(undefined);
  const [vacancy, setVacancy] = useState<any>();

  useEffect(() => {
    if (vacancyId) {
      dispatch(
        get_vacancy_by_id_thunk(vacancyId, (res) => {
          setVacancy(res);
        }),
      );
    }
    return () => {
      dispatch(setCurrentRespond(undefined));
    };
  }, [vacancyId]);

  useEffect(() => {
    if (vacancy && resume) {
      dispatch(get_respond_thunk({ vacancy_id: vacancy._id, resume_id: resume._id, waiter_id: resume.owner_id }));
    }
  }, [vacancy, resume]);

  useEffect(() => {
    if (successes[RESPOND]) {
      setShowSurvey(false);
      dispatch(removeSuccess(RESPOND));
    }
  }, [successes]);

  const respond = (action = {}) => {
    if (vacancy && resume) {
      dispatch(
        respond_thunk({
          ...action,
          ...checkObjValue(
            current_respond?._id
              ? { respond_id: current_respond._id }
              : {
                  waiter_id: resume.owner_id,
                  vacancy_id: vacancy._id,
                  resume_id: resume._id,
                  employer_id: vacancy.owner_id,
                },
          ),
        }),
      );
    }
  };

  const go_to_chat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  const RenderRow: React.FC<any> = ({ title, children }) => {
    return (
      <View class_name="fdc mb-25">
        <Text DescriptionM color="#868F90">
          {title}
        </Text>
        <Text DescriptionL color="#868F90">
          {children}
        </Text>
      </View>
    );
  };

  if (!vacancyId) return null;

  if (loadings[GET_VACANCY_BY_ID])
    return (
      <View class_name="mt-60 full-w center">
        <GridLoader color="#36d7b7" />
      </View>
    );

  if (errors[GET_VACANCY_BY_ID])
    return (
      <View class_name="mt-60 full-w">
        <Text red>{errors[GET_VACANCY_BY_ID]}</Text>
      </View>
    );

  return (
    vacancy && (
      <View class_name="full-width fdc aic pb-80">
        <View class_name="fdc relative ais full-width">
          <Image
            src={vacancy?.picture || get_def_images(vacancy.category_id)}
            height="auto"
            fit="cover"
            class_name="VacancyPhoto "
          />
          <View class_name="absolute h-68 space-b ph-20u" top={0} left={0} right={0}>
            <View class_name="pointer" onClick={() => navigate(-1)}>
              <BackIcon />
            </View>
            <View class_name="d-flex aic">
              <View class_name="pointer mr-20">{vacancy._id ? <FavoriteIcon vacancy_id={vacancy._id} /> : null}</View>
              <RWebShare
                data={{
                  text: 'Поделитесь с друзьями',
                  url: window.location.href,
                  title: 'Поделиться',
                }}
                onClick={() => console.log('shared successfully!')}
              >
                <ShareIcon />
              </RWebShare>
            </View>
          </View>
        </View>

        <View class_name="mt-35 mb-10 ph-20responsive fdc">
          <Text H3 red>
            {formatSalary(vacancy.salary_from, vacancy.salary_to)}
          </Text>
          <View class_name="d-flex aic mt-20">
            <Text SubtitleM class_name="mr-10">
              {vacancy.category_name}
            </Text>
            <Text
              SubtitleB
              blue
              class_name="text-decoration-underline pointer"
              onClick={() => setShowCompanyDetail(true)}
            >
              {vacancy.company_id?.name}
            </Text>
          </View>
          <Text SubtitleL class_name="mb-20">
            {categories.find((item) => item._id === vacancy.category_id).name}
          </Text>
          <RenderRow title="Описание работодателя:">{vacancy.descriptions}</RenderRow>
          <RenderRow title="Требования:">{vacancy.requirements}</RenderRow>
          <RenderRow title="Условия: ">{vacancy.circumstances}</RenderRow>
          <Text DescriptionM color="#868F90">
            Местонахождение:
          </Text>
        </View>
        <View width="100%" height={210}>
          <YMaps>
            <Map defaultState={{ center: [43.2220146, 76.8512485], zoom: 12 }} width={'100%'} height={'100%'}>
              <Placemark
                geometry={[...(vacancy.location.coordinates || [])].reverse()}
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
        {errors[RESPOND] ? <Text red>{errors[RESPOND]}</Text> : null}
        <View class_name="full-width fdc ph-20u ais">
          <View class_name="space-b mb-20 mt-30 full-width">
            <Button
              bg="green"
              width="48%"
              loading={loadings[RESPOND]}
              disabled={current_respond?.is_responded}
              onClick={() => {
                if (resume) {
                  if (vacancy.questions?.length) setShowSurvey(true);
                  else respond({ is_responded: true });
                } else setWarning('откликнуться на вакансию');
              }}
            >
              {current_respond?.is_responded ? 'Вы откликнулись' : 'Откликнуться'}
            </Button>
            <Button
              width="48%"
              loading={loadings[RESPOND]}
              onClick={() => {
                if (!resume) setWarning('связаться с соискателем');
                else {
                  if (vacancy?.owner_id?.phone) window.open(`tel:+${vacancy.owner_id.phone}`);
                  else {
                    alert('Нет номера телефона');
                  }
                }
              }}
            >
              Позвонить
            </Button>
          </View>
          <Button
            type="outline"
            bg="blue"
            loading={loadings[GET_CHAT]}
            onClick={() => {
              if (!resume) setWarning('написать соискателю');
              else {
                if (current_respond?.chat_id)
                  dispatch(get_chat_thunk({ chat_id: current_respond?.chat_id }, go_to_chat));
                else if (resume && vacancy) {
                  dispatch(
                    get_chat_thunk(
                      {
                        resume_id: resume._id,
                        waiter_id: resume.owner_id,
                        employer_id: vacancy.owner_id,
                        vacancy_id: vacancy._id,
                      },
                      go_to_chat,
                    ),
                  );
                }
              }
            }}
          >
            Написать соискателю
          </Button>
        </View>
        <ModalCard visible={showCompanyDetail} onClose={() => setShowCompanyDetail(false)} title="О компании">
          <View class_name="mt-24 full-width ph-20u" minHeight={400}>
            <View class_name="d-flex">
              <Image
                src={vacancy.company_id?.logo}
                width={140}
                height={140}
                fit="cover"
                class_name="mr-20 bc-grey br-8"
              />
              <Text DescriptionB>{vacancy.company_id?.name}</Text>
            </View>
            <Text class_name="mt-20" Description>
              {vacancy.company_id?.description}
            </Text>
          </View>
        </ModalCard>
        <ModalCard
          visible={showSurvey}
          onClose={() => setShowSurvey(false)}
          title="Прежде чем откликнуться, пройдите небольшой опрос от работодателя."
        >
          <Survey survey={vacancy?.questions} submit={(ask) => respond({ ask, is_responded: true })} />
        </ModalCard>
        <ModalCard visible={!!warning} onClose={() => setWarning('')} title="">
          <View class_name="full-width fdc aic">
            <PromtIcon />
            <Text
              BodyBlack
              class_name="mv-74 t-align-center ph-10u"
            >{`Что бы ${warning}, Вам необходимо пройти первичную регистрацию и создать резюме `}</Text>
            <Button bg="red" onClick={() => navigate(!user ? '/registr' : '/resume/create-edit')}>
              {!user ? 'Регистрация' : 'Cоздать резюме'}
            </Button>
          </View>
        </ModalCard>
      </View>
    )
  );
};

export default React.memo(VacancyDetail);
