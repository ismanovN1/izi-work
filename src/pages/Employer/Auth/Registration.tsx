import React, { useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import Input from 'components/custom-components/Input';
import Button from 'components/custom-components/Button';

// Helpers

// Images & Icons
import Logo from 'assets/icons/logo.svg';

import { NavLink, useNavigate } from 'react-router-dom';
import { checkObjValue } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setIsAuth } from 'store/auth-store/auth-slice';
import { registration_thunk } from 'store/auth-store/auth-thunnk';
import { REGISTRATION } from 'store/auth-store/constants';
import { removeError, removeSuccess } from 'store/common-store/common-slice';
import { isMobile } from 'react-device-detect';

interface FieldsI {
  name?: string;
  email?: string;
  phone?: string;
  is_employer?: boolean;
  password?: string;
  repass?: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loadings, successes, errors } = useAppSelector((state) => state.common);

  const [fields, setFields] = useState<FieldsI>({});

  const onChangeField = (field: Partial<FieldsI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const onSubmit = () => {
    dispatch(removeError(REGISTRATION));
    const { repass, ...restFields } = fields;
    dispatch(
      registration_thunk({ is_employer: true, ...restFields }, () => {
        dispatch(setIsAuth(true));
        navigate('/account/create-edit');
      }),
    );
  };
  return (
    <View class_name={`full-width fdc aic p-${isMobile ? 16 : 40}`}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <View
        card
        class_name={`fdc aic mt-60 pv-40 ph-${isMobile ? 16 : 70}`}
        minHeight={482}
        maxWidth={530}
        width={'100%'}
      >
        <Text H2>Регистрация</Text>
        <Input
          class_name="mt-34 mb-20"
          placeholder="Имя"
          value={fields.name}
          onChange={(e) => onChangeField({ name: e.target.value || undefined })}
        />
        <Input
          placeholder="E-mail"
          type="email"
          value={fields.email}
          onChange={(e) => onChangeField({ email: e.target.value || undefined })}
        />
        <Input
          mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
          guide
          class_name="mt-20"
          placeholder="+7 (***) *** ** **"
          type="numeric"
          value={fields.phone?.slice(1)}
          onChange={(e) => onChangeField({ phone: e.target.value.replace(/\D+/g, '') || undefined })}
        />
        <Input
          class_name="mv-20"
          placeholder="Пароль"
          type="password"
          value={fields.password}
          onChange={(e) => onChangeField({ password: e.target.value || undefined })}
        />
        <Input
          placeholder="Повторить пароль"
          type="password"
          value={fields.repass}
          onChange={(e) => onChangeField({ repass: e.target.value || undefined })}
        />
        {errors[REGISTRATION] && (
          <Text class_name="pv-10" red>
            {errors[REGISTRATION]}
          </Text>
        )}
        <Text class_name="pv-15" grey Description>
          *указывая номер телефона, потенциальные соискатели смогут вам звонить
        </Text>
        <Button
          class_name="mt-20"
          disabled={Object.keys(checkObjValue(fields)).length < 4 || fields.password !== fields.repass}
          loading={loadings[REGISTRATION]}
          onClick={onSubmit}
        >
          Далее
        </Button>
      </View>
    </View>
  );
};

export default Registration;
