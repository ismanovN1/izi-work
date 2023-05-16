import React, { useCallback, useState, useMemo, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import Button from 'components/custom-components/Button';

// Images & Icons
import GoBackIcon from 'assets/icons/back-arrow.svg';
import SelectCategory from 'components/resume-components/select-categoy';
import { ResumeI } from 'types/common';
import Salary from 'components/resume-components/salary';
import VacancyDescription from 'components/resume-components/resume-description';
import Address from 'components/resume-components/address';
import SelectPhoto from 'components/resume-components/select-photo';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addVacancy } from 'store/vacancies-store/vacancies-slice';
import { setResume } from 'store/resume-store/resume-slice';
import { useNavigate } from 'react-router-dom';
import { checkObjValue } from 'helpers/common';
import { create_resume_thunk, get_my_resume_thunk, update_resume_thunk } from 'store/resume-store/resume-thunk';
import { CREATE_RESUME } from 'store/resume-store/constans';
import { removeSuccess } from 'store/common-store/common-slice';

const getStepTitle = (step: number) => {
  switch (step) {
    case 1:
      return 'Выберите категорию';
    case 2:
      return 'Желаемая зарплата';
    case 3:
      return 'Поставьте метку на карте';
    case 4:
      return 'Расскажите о себе';
    case 5:
      return 'Расскажите о себе';
    case 6:
      return 'Фото';
    default:
      return '';
  }
};

const CreateResume = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //Selectors
  const { user } = useAppSelector((state) => state.auth);
  const { resume } = useAppSelector((state) => state.resume);
  const { loadings, successes, errors } = useAppSelector((state) => state.common);

  // States
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<Partial<ResumeI>>(resume || {});
  const [changedFields, setChangedFields] = useState<any>({});

  // States

  const clear = () => {
    setStep(1);
    setFields({});
    setChangedFields({});
  };

  useEffect(() => {
    if (successes[CREATE_RESUME]) {
      dispatch(get_my_resume_thunk());
      navigate('/waiter/resume');
      dispatch(removeSuccess(CREATE_RESUME));
      clear();
    }
  }, [successes[CREATE_RESUME]]);

  const onChangeFields = (field: Partial<ResumeI>) => {
    setChangedFields((prev) => ({ ...prev, ...field }));
    setFields((prev) => ({ ...prev, ...field }));
  };

  const publish = () => {
    console.log(changedFields);

    const data = checkObjValue({
      image: changedFields.photo,
      name: user?.name,
      category_id: changedFields.category?._id,
      category_name: changedFields.category?.name,
      sub_category_id: changedFields.category?.childId,
      about_me: changedFields.about,
      experience: changedFields.experience,
      salary_from: changedFields.salary?.from,
      salary_to: changedFields.salary?.to,
      salary_period: changedFields.salary?.period,
      address: changedFields.address?.name,
      lat: changedFields.address?.coords?.[0],
      lon: changedFields.address?.coords?.[1],
    });
    if (resume?._id) dispatch(update_resume_thunk(data, resume?._id));
    else dispatch(create_resume_thunk(data));
  };

  const RenderTitle: React.FC<any> = useCallback(() => {
    return (
      <View class_name="d-flex aic">
        <Text BodyBlack>{getStepTitle(step)}</Text>
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
        return <Address value={fields.address} onChange={(val) => onChangeFields({ address: val })} />;
      case 4:
        return (
          <VacancyDescription title="О себе" value={fields.about} onChange={(val) => onChangeFields({ about: val })} />
        );
      case 5:
        return (
          <VacancyDescription
            title="Опыт работы"
            value={fields.experience}
            onChange={(val) => onChangeFields({ experience: val })}
          />
        );
      case 6:
        return <SelectPhoto value={fields.photo} onChange={(val) => onChangeFields({ photo: val })} />;
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
          <Button
            width={165}
            loading={loadings[CREATE_RESUME]}
            onClick={() => {
              if (step < 6) {
                setStep((prev) => prev + 1);
              } else {
                publish();
              }
            }}
          >
            {step === 6 ? 'Готово' : 'Далее'}
          </Button>
        </View>
      </View>
    );
  }, [step, fields?.photo, loadings[CREATE_RESUME]]);

  return (
    <View
      width="100%"
      minHeight={'calc(100vh - 137px)'}
      class_name="relative ph-20u pb-37 pt-33 fdc jcsb ovf-y-auto scroll_bar_usual"
    >
      <RenderTitle />
      <RenderBody />
      {errors[CREATE_RESUME] ? <Text red>{errors[CREATE_RESUME]}</Text> : null}
      <RenderFooter />
    </View>
  );
};

export default CreateResume;
