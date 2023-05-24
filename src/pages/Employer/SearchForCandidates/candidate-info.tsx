import React, { useState, useEffect } from 'react';

// Components
import Image from 'components/custom-components/Image';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';

// Images & Icons
import FavoriteIcon from 'assets/icons/favorite.svg';
import FavoriteGreyIcon from 'assets/icons/favorite-grey-large.svg';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_resume_by_id_thunk } from 'store/resume-store/resume-thunk';
import { GET_RESUME_BY_ID } from 'store/resume-store/constans';
import { MoonLoader } from 'react-spinners';
import { formatSalary, parseSalaryPeriod } from 'helpers/common';
import { add_remove_my_favorite_resume_thunk } from 'store/action-store/action-thunk';
import Button from 'components/custom-components/Button';
import ModalCard from 'components/ui/ModalCard';
import { useNavigate } from 'react-router-dom';
import Select from 'components/custom-components/Select';
import { get_chat_thunk } from 'store/chat-store/chat-thunk';
import PromtIcon from 'assets/icons/promt.svg';

type propsType = {
  candidate_id: string;
};

const CandidateInfo: React.FC<propsType> = ({ candidate_id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errors, loadings, categories } = useAppSelector((s) => s.common);
  const { favorite_resumes } = useAppSelector((s) => s.resume);
  const { isAuth, user } = useAppSelector((s) => s.auth);
  const [candidate, setCandidate] = useState<any>();
  const { my_active_vacancies } = useAppSelector((s) => s.vacancies);

  const [warning, setWarning] = useState('');
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<any>();

  useEffect(() => {
    if (candidate_id) {
      dispatch(get_resume_by_id_thunk(candidate_id, (res) => setCandidate(res)));
    }
  }, [candidate_id]);

  if (loadings[GET_RESUME_BY_ID])
    return (
      <View class_name="full-w d-flex jcc">
        <MoonLoader color="#038CA9" />
      </View>
    );

  if (errors[GET_RESUME_BY_ID])
    return (
      <View class_name="full-w pl-10">
        <Text red>{errors[GET_RESUME_BY_ID]}</Text>
      </View>
    );

  if (!candidate) return null;

  const is_favorite = favorite_resumes.includes(candidate_id);

  const go_to_chat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <View card width={530} class_name="relative p-20 fdc ass CandidateInfo">
      <View
        class_name="absolute pointer"
        top={10}
        right={10}
        onClick={() => {
          dispatch(add_remove_my_favorite_resume_thunk({ resume_id: candidate_id, is_favorite: !is_favorite }));
        }}
      >
        {is_favorite ? <FavoriteIcon /> : <FavoriteGreyIcon />}
      </View>
      <View class_name="d-flex main-info">
        <Image src={candidate.picture} width={140} height={140} class_name="br-8" />
        <View class_name="ml-20 pt-10 fdc">
          <Text BodyBlack>{candidate.name || '-'}</Text>
          <Text Body class_name="mt-35 mb-3">
            {candidate.category_name}
          </Text>
          <Text Body>({categories.find((item) => item._id === candidate.category_id)?.name})</Text>
        </View>
      </View>

      <View class_name="fdc mt-30 mb-22">
        <Text BodyBlack>Желаемая зарплата</Text>
        <Text class_name="mt-15" Body red>
          {formatSalary(candidate.salary_from, candidate.salary_to)} {parseSalaryPeriod(candidate.salary_period)}
        </Text>
      </View>

      <View class_name="fdc mb-40">
        <Text BodyBlack>О себе</Text>
        <Text class_name="mt-15" Description>
          {candidate.about_me}
        </Text>
      </View>
      <View class_name="fdc">
        <Text BodyBlack>Опыт работы</Text>
        <Text class_name="mt-15" Description>
          {candidate.experience}
        </Text>
      </View>
      <View class_name="d-flex space-b mt-15 buttons">
        <Button
          type="outline"
          class_name="mt-12"
          width="47%"
          onClick={() => {
            if (!isAuth) {
              setWarning('Написать');
            } else {
              setOpenSelectModal(true);
            }
          }}
        >
          Написать
        </Button>
        <Button
          class_name="mt-12"
          width="47%"
          onClick={() => {
            if (candidate?.owner_id?.phone) window.open(`tel:+${candidate.owner_id.phone}`);
            else {
              alert('Нет номера телефона');
            }
          }}
        >
          Позвонить
        </Button>
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
      <ModalCard
        visible={openSelectModal}
        onClose={() => {
          setOpenSelectModal(false);
          setSelectedVacancy(undefined);
        }}
        title=""
      >
        <View class_name="full-width fdc aic pv-40">
          <Text BodyB>Выберите вакансию</Text>
          <Select
            class_name="mv-40"
            placeholder="Выберите вакансию"
            value={selectedVacancy}
            onChange={(val) => setSelectedVacancy(val)}
            options={my_active_vacancies.map((item) => ({ _id: item._id, name: item.category_name }))}
          />
          <Button
            disabled={!selectedVacancy || !candidate._id || !user._id}
            onClick={() => {
              if (selectedVacancy?._id && user._id && candidate._id && candidate.owner_id?._id) {
                dispatch(
                  get_chat_thunk(
                    {
                      resume_id: candidate._id,
                      waiter_id: candidate.owner_id?._id,
                      employer_id: user._id,
                      vacancy_id: selectedVacancy?._id,
                    },
                    go_to_chat,
                  ),
                );
              }
            }}
          >
            Написать
          </Button>
        </View>
      </ModalCard>
    </View>
  );
};

export default CandidateInfo;
