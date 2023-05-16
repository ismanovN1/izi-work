/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState, useEffect, useMemo } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import Input from 'components/custom-components/Input';
import Button from 'components/custom-components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import UploadFileArea from 'components/custom-components/UploadFileArea';
import Textarea from 'components/custom-components/Textarea';

// Images & Icons
import Logo from 'assets/icons/logo.svg';
import CameraIcon from 'assets/icons/camera.svg';
import GoBackIcon from 'assets/icons/back-arrow.svg';
import { useAppDispatch, useAppSelector } from 'hooks';
import { checkObjValue } from 'helpers/common';
import { create_company_thunk, update_company_thunk } from 'store/company-store/company-thunk';
import { CREATE_COMPANY, UPDATE_COMPANY } from 'store/company-store/constans';
import { removeSuccess } from 'store/common-store/common-slice';

interface FieldsI {
  name?: string;
  description?: string;
  image?: any;
}

const CreateEditCompany = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { company_data } = useAppSelector((state) => state.company);
  const { loadings, successes, errors } = useAppSelector((state) => state.common);

  const [fields, setFields] = useState<FieldsI>({ ...company_data, image: company_data?.logo || undefined });

  useEffect(() => {
    if (successes[CREATE_COMPANY] || successes[UPDATE_COMPANY]) {
      dispatch(removeSuccess(CREATE_COMPANY));
      dispatch(removeSuccess(UPDATE_COMPANY));
      navigate('/employer/my-company');
    }
  }, [successes]);

  const error = useMemo(() => errors[CREATE_COMPANY] || errors[UPDATE_COMPANY], [errors]);
  const isEmpty = useMemo(() => Object.keys(checkObjValue(fields)).length === 0, [fields]);

  const onChangeField = (field: Partial<FieldsI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const onSubmit = () => {
    if (isEmpty) {
      navigate('/employer');
      return;
    }
    if (company_data) {
      dispatch(removeSuccess(UPDATE_COMPANY));
      const { name, description, image } = fields;
      dispatch(update_company_thunk(checkObjValue({ name, description, image }), String(company_data._id)));
    } else {
      dispatch(removeSuccess(CREATE_COMPANY));
      dispatch(create_company_thunk(checkObjValue(fields)));
    }
  };

  return (
    <View class_name="full-width fdc aic p-40">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <View card class_name="fdc aic mt-60 pv-40 ph-30" minHeight={482} width={530}>
        <Text H2>О компании</Text>
        <View class_name="mt-20 full-width d-flex ais">
          <View class_name="mr-30">
            <Text SubtitleM class_name="mb-14">
              Фото
            </Text>
            <UploadFileArea
              width={140}
              height={140}
              value={fields.image}
              onChange={(val) => onChangeField({ image: val })}
            >
              <View class_name="center fdc">
                <CameraIcon />
                <Text color="#868F90B2" class_name="t-align-center mt-14 ph-5" Description>
                  Добавьте фото или логотип
                </Text>
              </View>
            </UploadFileArea>
          </View>
          <View class_name="f-grow-1">
            <Text SubtitleM class_name="mb-14">
              Название
            </Text>
            <Textarea
              placeholder="Введите название вашей  компании"
              maxLength={120}
              height={139}
              rows={5}
              onChange={(e) => onChangeField({ name: e.target.value || undefined })}
              value={fields.name}
            />
          </View>
        </View>
        <View class_name="full-width">
          <Text SubtitleM class_name="mb-14">
            Описание
          </Text>
          <Textarea
            placeholder="Расскажите о своей компании"
            maxLength={500}
            height={139}
            rows={5}
            onChange={(e) => onChangeField({ description: e.target.value || undefined })}
            value={fields.description}
          />
        </View>
        {error && <Text red>{error}</Text>}
        <View class_name="space-b full-width mt-37">
          <View class_name="pointer d-flex aic" onClick={() => navigate(-1)}>
            <GoBackIcon />
            <Text class_name="ml-13" color="#ABB1B2" SubtitleB>
              Назад
            </Text>
          </View>
          <Button
            width={165}
            loading={loadings[CREATE_COMPANY] || loadings[UPDATE_COMPANY]}
            disabled={!(fields?.name || isEmpty)}
            onClick={onSubmit}
          >
            {company_data ? 'Сохранить' : 'Далее'}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CreateEditCompany;
