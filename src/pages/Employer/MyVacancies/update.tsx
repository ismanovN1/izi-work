import React, { useCallback, useState, useMemo, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

// Images & Icons
import DocIcon from 'assets/icons/document.svg';
import ModalCloseIcon from 'assets/icons/modal-close-dark.svg';
import GoBackIcon from 'assets/icons/back-arrow.svg';
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
import { get_my_vacancies_thunk, update_vacancy_thunk } from 'store/vacancies-store/vacancies-thunk';
import { UPDATE_VACANCY } from 'store/vacancies-store/constans';
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

const MyVacaciesUpdate: React.FC<{ vacancy: any; onClose?: () => void }> = ({ vacancy, onClose }) => {
  const dispatch = useAppDispatch();

  const { loadings, successes, errors } = useAppSelector((state) => state.common);

  // States
  const [createVacancy, setCreateVacancy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Partial<VacancyI>>({});
  const [changedFields, setChangedFields] = useState<Partial<VacancyI>>({});

  const clear = () => {
    setStep(0);
    setFields({});
    setChangedFields({});
    setCreateVacancy(false);
  };

  useEffect(() => {
    if (successes[UPDATE_VACANCY]) {
      dispatch(removeSuccess(UPDATE_VACANCY));
      clear();
    }
  }, [successes[UPDATE_VACANCY]]);

  useEffect(() => {
    if (vacancy) {
      setFields(
        checkObjValue({
          photo: vacancy.picture,
          category: {
            _id: vacancy.category_id,
            childId: vacancy.sub_category_id,
            name: vacancy.category_name,
          },
          about: {
            descriptions: vacancy.descriptions,
            requirements: vacancy.requirements,
            circumstances: vacancy.circumstances,
          },
          schedule: {
            shift_work: vacancy.shift_work,
            shedule: vacancy.shedule,
            get_started_right_away: vacancy.get_started_right_away,
          },
          salary: {
            from: vacancy.salary_from,
            to: vacancy.salary_to,
            period: vacancy.salary_period,
          },
          address: {
            name: vacancy.address,
            coords: [vacancy.lat, vacancy.lon],
          },
          questions: vacancy.questions?.length ? vacancy.questions : undefined,
        }),
      );
      setCreateVacancy(true);
      setTimeout(() => {
        setStep(1);
      });
    }
  }, [vacancy]);

  useEffect(() => {
    if (!createVacancy) onClose?.();
  }, [createVacancy]);

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
    setChangedFields((prev) => ({ ...prev, ...field }));
  };

  const publish = () => {
    if (vacancy?._id) {
      const data = checkObjValue({
        image: changedFields.photo,
        category_id: changedFields.category?._id,
        category_name: changedFields.category?.name,
        sub_category_id: changedFields.category?.childId,
        descriptions: changedFields.about?.descriptions,
        requirements: changedFields.about?.requirements,
        circumstances: changedFields.about?.circumstances,
        get_started_right_away: changedFields.schedule?.get_started_right_away,
        shedule: changedFields.schedule?.shedule,
        shift_work: changedFields.schedule?.shift_work,
        salary_from: changedFields.salary?.from,
        salary_to: changedFields.salary?.to,
        salary_period: changedFields.salary?.period,
        address: changedFields.address?.name,
        lat: changedFields.address?.coords?.[0],
        lon: changedFields.address?.coords?.[1],
      });

      fields.questions?.forEach((item, index) => {
        if (item) {
          data[`questions[${index}][question]`] = item.question;
          item.options.forEach((option, i) => {
            data[`questions[${index}][options][${i}]`] = option;
          });
        }
      });
      if (Object.keys(changedFields).length) dispatch(update_vacancy_thunk(data, vacancy._id));
      else clear();
    }
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
      <View class_name="space-b full-width mt-25">
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
        <View class_name="d-flex aic">
          {step === 8 ? (
            <Button width={165} onClick={() => setPreview(true)} type="outline" bg="red" class_name="mr-20">
              Предпросмотр
            </Button>
          ) : null}
          <Button
            width={165}
            disabled={disabled}
            loading={loadings[UPDATE_VACANCY]}
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
  }, [disabled, step, loadings[UPDATE_VACANCY]]);

  return (
    <View
      class_name={`fixed zi-12 ovf-y-auto center p-40 pt-40 d-${createVacancy ? 'flex' : 'none'}`}
      top={0}
      bottom={0}
      right={0}
      left={0}
      bg={'#001829B2'}
    >
      {preview ? (
        <View class_name="d-flex">
          <PreviewVacancy vacancy={fields} />
          <View class_name="ml-20 pointer" width={40} onClick={() => setPreview(false)}>
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
            {errors[UPDATE_VACANCY] ? (
              <Text red class_name="pv-5">
                {errors[UPDATE_VACANCY]}
              </Text>
            ) : null}
            <RenderFooter />
          </View>
        </View>
      )}
    </View>
  );
};

export default MyVacaciesUpdate;
