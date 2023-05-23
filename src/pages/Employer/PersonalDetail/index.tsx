import React, { useState, useMemo, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

// Helpers & Utils
import { formatSalary, parseSalaryPeriod, screen_height } from 'helpers/common';
import Input from 'components/custom-components/Input';
import { filter_icon_png, search_icon_png } from 'assets/icons/personals-icons';
import PersonalCard from 'components/personals-components/PersonalCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_resume_by_id_thunk } from 'store/resume-store/resume-thunk';
import { GET_RESUME_BY_ID } from 'store/resume-store/constans';
import { MoonLoader } from 'react-spinners';
import ModalCard from 'components/ui/ModalCard';
import './index.scss';

// Images & Icons
import PromtIcon from 'assets/icons/promt.svg';
import BackButton from 'components/ui/BackButton';

const PersonalDetail = () => {
  const { personalId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((s) => s.auth);
  const { resumes } = useAppSelector((s) => s.resume);
  const { loadings, categories } = useAppSelector((s) => s.common);

  const [personal, setPersonal] = useState<any>();
  const [warning, setWarning] = useState('');

  const randomPersonal1 = useMemo(() => resumes[Math.ceil(Math.random() * (resumes.length - 1))], [personalId]);
  const randomPersonal2 = useMemo(() => resumes[Math.ceil(Math.random() * (resumes.length - 1))], [personalId]);

  useEffect(() => {
    if (personalId) {
      dispatch(get_resume_by_id_thunk(personalId, (res) => setPersonal(res)));
    }
  }, [personalId]);

  return (
    <View
      class_name="full-width relative pt-45u pb-80 d-flex jcc waiter-detail-container"
      minHeight={screen_height - 286}
    >
      <View maxWidth={1100} width="100%">
        <BackButton class_name="mv-10">Назад</BackButton>
        <View class_name="space-b full-width d-none-on-mobile" onMouseDown={() => navigate('/personals')}>
          <Button width={265} type="outline" leftIcon={<Image width={20.7} src={filter_icon_png} />}>
            Фильтр
          </Button>
          <Input
            leftIcon={<Image src={search_icon_png} width={20} />}
            placeholder="Введите ключевое слово для поиска"
            class_name="mh-20u flex-1"
          />
          <Button width={265}>Поиск</Button>
        </View>
        {loadings[GET_RESUME_BY_ID] ? (
          <View class_name="mv-40 d-flex jcc">
            <MoonLoader color="#038ca9" size={32} />
          </View>
        ) : personal ? (
          <View class_name="d-flex jcsb full-width mt-40u ">
            <View card class_name="flex-1 p-20u relative d-flex jcsb waiter-detail">
              <View class_name="absolute pointer" top={10} right={15}>
                ☆
              </View>
              <View class_name="fdc mr-30u image-container">
                <View class_name={'br-10 ovf-hidden'}>
                  <Image src={personal.picture} fit="cover" width={234} height={234} />
                </View>
                <Button
                  type="outline"
                  width={'100%'}
                  class_name="mt-30u mb-17u"
                  onClick={() => {
                    if (!isAuth) {
                      setWarning('Написать');
                    }
                  }}
                >
                  Написать
                </Button>
                <Button
                  width={'100%'}
                  onClick={() => {
                    if (!isAuth) {
                      setWarning('Позвонить');
                    } else {
                      if (personal?.owner_id?.phone) window.open(`tel:+${personal.owner_id.phone}`);
                      else {
                        alert('Нет номера телефона');
                      }
                    }
                  }}
                >
                  Позвонить
                </Button>
              </View>

              <View class_name="flex-1 fdc">
                <Text BodyBlack>{personal.name}</Text>
                <View class_name="fdc mv-30u">
                  <Text Body>{personal.category_name}</Text>
                  <Text Body>{categories.find((item) => item._id === personal.category_id)?.name}</Text>
                </View>
                <Text BodyBlack>Желаемая зарплата</Text>
                <View height={15} />
                <Text Body red>
                  {formatSalary(personal.salary_from, personal.salary_to)} {parseSalaryPeriod(personal.salary_period)}
                </Text>
                <View class_name="mt-64u">
                  <Text BodyBlack>О себе</Text>
                  <View height={15} />
                  <Text Description>{personal.about_me}</Text>
                </View>
                <View class_name="mt-40u">
                  <Text BodyBlack>Опыт работы</Text>
                  <View height={15} />
                  <Text Description>{personal.experience}</Text>
                </View>
              </View>
            </View>
            <View class_name="fdc ml-22u d-none-on-mobile">
              <Text BodyB>Похожие вакансии</Text>
              {randomPersonal1 ? (
                <PersonalCard
                  class_name="mv-19u"
                  person={randomPersonal1}
                  onClick={() => navigate(`/personals/${randomPersonal1._id}`)}
                />
              ) : null}
              {randomPersonal2 ? (
                <PersonalCard
                  class_name="mb-19u"
                  person={randomPersonal2}
                  onClick={() => navigate(`/personals/${randomPersonal2._id}`)}
                />
              ) : null}
              <Button onClick={() => navigate('/personals')}>Посмотреть ещё</Button>
            </View>
          </View>
        ) : null}
      </View>
      <ModalCard visible={!!warning} onClose={() => setWarning('')} title="">
        <View class_name="full-width fdc aic">
          <PromtIcon />
          <Text
            BodyBlack
            class_name="mv-74 t-align-center ph-10u"
          >{`Что бы ${warning}, Вам необходимо пройти первичную регистрацию и создать резюме `}</Text>
          <Button bg="red" onClick={() => navigate('/account/registr')}>
            Регистрация
          </Button>
        </View>
      </ModalCard>
    </View>
  );
};

export default PersonalDetail;
