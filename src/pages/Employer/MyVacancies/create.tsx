import React, { useCallback, useState, useMemo, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

// Images & Icons
import DocIcon from 'assets/icons/document.svg';
import ModalCloseIcon from 'assets/icons/modal-close-dark.svg';
import GoBackIcon from 'assets/icons/back-arrow.svg';
import Input from 'components/custom-components/Input';
import Image from 'components/custom-components/Image';
import { categories } from 'data/categories-data';
import Select from 'components/custom-components/Select';
import SelectCategory from 'components/my-vacancies-components/select-categoy';
import { VacancyI } from 'types/common';
import Salary from 'components/my-vacancies-components/salary';
import VacancyDescription from 'components/my-vacancies-components/vacancy-description';
import Schedule from 'components/my-vacancies-components/schedule';
import Address from 'components/my-vacancies-components/address';
import Questions from 'components/my-vacancies-components/questions';
import { checkObjValue, screen_height } from 'helpers/common';
import SelectPhoto from 'components/my-vacancies-components/select-photo';
import Finally from 'components/my-vacancies-components/finally';
import PreviewVacancy from 'components/my-vacancies-components/preview-vacancy';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addVacancy } from 'store/vacancies-store/vacancies-slice';
import { create_vacancy_thunk, get_my_vacancies_thunk } from 'store/vacancies-store/vacancies-thunk';
import { CREATE_VACANCY } from 'store/vacancies-store/constans';
import { removeSuccess } from 'store/common-store/common-slice';

const getStepTitle = (step: number) => {
  switch (step) {
    case 1:
      return 'Категория';
    case 2:
      return 'Зарплата';
    case 3:
      return 'Описание вакансии';
    case 4:
      return 'График работы';
    case 5:
      return 'Местоположение работы';
    case 6:
      return 'Задать вопрос';
    case 7:
      return 'Фото';
    case 8:
      return 'Вакансия готова!';
    default:
      return '';
  }
};

const MyVacaciesCreate = () => {
  const dispatch = useAppDispatch();

  const { loadings, successes, errors } = useAppSelector((state) => state.common);

  // States
  const [createVacancy, setCreateVacancy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<Partial<VacancyI>>({});

  const clear = () => {
    setStep(1);
    setFields({});
    setCreateVacancy(false);
    dispatch(get_my_vacancies_thunk());
  };

  const disabled = useMemo(() => {
    switch (step) {
      case 1:
        return !(fields.category && fields.category._id && fields.category.childId);
      case 2:
      case 7:
      case 8:
        return false;
      case 3:
        return !(fields.about && fields.about.requirements && fields.about.descriptions && fields.about.circumstances);
      case 4:
        return !(fields.schedule && fields.schedule.shedule);
      case 5:
        return !(fields.address && fields.address.name);
      case 6:
        return !(!fields.questions || (fields.questions && fields.questions.length));
      default:
        return true;
    }
  }, [step, fields]);

  const onChangeFields = (field: Partial<VacancyI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const publish = () => {
    const data = checkObjValue({
      image: fields.photo,
      category_id: fields.category._id,
      category_name: fields.category.name,
      sub_category_id: fields.category.childId,
      descriptions: fields.about.descriptions,
      requirements: fields.about.requirements,
      circumstances: fields.about.circumstances,
      get_started_right_away: fields.schedule.get_started_right_away,
      shift_work: fields.schedule.shift_work,
      salary_from: fields.salary?.from,
      salary_to: fields.salary?.to,
      salary_period: fields.salary?.period,
      address: fields.address.name,
      lat: fields.address?.coords?.[0],
      lon: fields.address?.coords?.[1],
    });

    fields.questions?.forEach((item, index) => {
      if (item) {
        data[`questions[${index}][question]`] = item.question;
        item.options.forEach((option, i) => {
          data[`questions[${index}][options][${i}]`] = option;
        });
      }
    });

    dispatch(create_vacancy_thunk(data, clear));
  };

  const RenderTitle: React.FC<any> = useCallback(() => {
    return (
      <View class_name="d-flex aic">
        <Text H2>{getStepTitle(step)}</Text>
        {step === 7 ? (
          <Text class_name="ml-10 mt-7" DescriptionL color="#868F90B2">
            Опционально
          </Text>
        ) : null}
      </View>
    );
  }, [step]);

  const RenderBody: React.FC<any> = useCallback(() => {
    switch (step) {
      case 1:
        return <SelectCategory value={fields.category} onChange={(val) => onChangeFields({ category: val })} />;
      case 2:
        return <Salary value={fields.salary} onChange={(val) => onChangeFields({ salary: val })} />;
      case 3:
        return <VacancyDescription value={fields.about} onChange={(val) => onChangeFields({ about: val })} />;
      case 4:
        return <Schedule value={fields.schedule} onChange={(val) => onChangeFields({ schedule: val })} />;
      case 5:
        return <Address value={fields.address} onChange={(val) => onChangeFields({ address: val })} />;
      case 6:
        return <Questions value={fields.questions} onChange={(val) => onChangeFields({ questions: val })} />;
      case 7:
        return <SelectPhoto value={fields.photo} onChange={(val) => onChangeFields({ photo: val })} />;
      case 8:
        return <Finally fields={fields} goBack={(val) => setStep((prev) => val || prev - 1)} />;

      default:
        return null;
    }
  }, [step]);

  const RenderFooter: React.FC<any> = useCallback(() => {
    return (
      <View class_name={`${step === 8 ? 'publication' : 'creation'}-footer space-b full-width mt-25`}>
        {step === 1 ? (
          <View />
        ) : (
          <View class_name="pointer d-flex aic" onClick={() => setStep((prev) => prev - 1)}>
            <GoBackIcon />
            <Text class_name="ml-13" color="#ABB1B2" SubtitleB>
              Назад
            </Text>
          </View>
        )}
        <View class_name="d-flex aic f-wrap jce">
          {step === 8 ? (
            <Button width={165} onClick={() => setPreview(true)} type="outline" bg="red">
              Предпросмотр
            </Button>
          ) : null}
          <Button
            width={165}
            disabled={disabled}
            loading={loadings[CREATE_VACANCY]}
            class_name="ml-20"
            onClick={() => {
              if (step < 8) {
                setStep((prev) => prev + 1);
              } else {
                publish();
              }
            }}
          >
            {step === 8 ? 'Опубликовать' : 'Далее'}
          </Button>
        </View>
      </View>
    );
  }, [disabled, step, loadings[CREATE_VACANCY]]);

  return (
    <>
      <View class_name="full-width full-height center">
        <View className="fdc ais" width={275}>
          <Text BodyM grey class_name="t-align-center">
            Здесь вы можете отслеживать свои вакансии и соискателей
          </Text>
          <View class_name="bc-grey bs-dashed center mv-40 full-width br-10" height="140px">
            <DocIcon />
          </View>
          <Button onClick={() => setCreateVacancy(true)}>Разместить работу</Button>
        </View>
      </View>
      <View
        class_name={`vacancy-creation  fixed zi-12 ovf-y-auto center p-40 pt-40 d-${createVacancy ? 'flex' : 'none'}`}
        top={0}
        bottom={0}
        right={0}
        left={0}
        bg={'#001829B2'}
      >
        {preview ? (
          <View class_name="d-flex" maxHeight={screen_height - 140}>
            <PreviewVacancy vacancy={fields} />
            <View class_name="ml-20 pointer preview-close-button" width={40} onClick={() => setPreview(false)}>
              <ModalCloseIcon />
            </View>
          </View>
        ) : (
          <View
            card
            width={550}
            minHeight={580}
            maxHeight={screen_height - 140}
            class_name="relative p-37 pt-33 fdc jcsb ovf-y-auto scroll_bar_usual"
          >
            <View class_name="absolute pointer" top={20} right={20} onClick={() => setCreateVacancy(false)}>
              <ModalCloseIcon />
            </View>
            <RenderTitle />
            <RenderBody />
            <View class_name="fdc">
              {errors[CREATE_VACANCY] ? (
                <Text red class_name="pv-5">
                  {errors[CREATE_VACANCY]}
                </Text>
              ) : null}
              <RenderFooter />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default MyVacaciesCreate;
