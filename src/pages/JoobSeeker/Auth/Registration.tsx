import React, { useEffect, useState } from 'react';

// Components
import View from 'components/custom-components/View';

// Images & Icons
import Text from 'components/custom-components/Text';
import Input from 'components/custom-components/Input';
import Button from 'components/custom-components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkObjValue } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setIsAuth, setUser } from 'store/auth-store/auth-slice';
import { REGISTRATION } from 'store/auth-store/constants';
import { removeError, removeSuccess } from 'store/common-store/common-slice';
import { registration_thunk } from 'store/auth-store/auth-thunnk';

interface FieldsI {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  repass?: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Selectors
  const { loadings, errors, successes } = useAppSelector((s) => s.common);

  const [fields, setFields] = useState<FieldsI>({});

  const onChangeField = (field: Partial<FieldsI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const onSubmit = () => {
    dispatch(removeError(REGISTRATION));
    const { repass, ...restFields } = fields;
    dispatch(
      registration_thunk(restFields, () => {
        dispatch(setIsAuth(true));
        navigate('/account');
      }),
    );
  };

  return (
    <View class_name="full-width fdc ais pt-20 ph-20">
      <Text BodyBlack>Регистрация</Text>
      <Input
        class_name="mt-15 mb-20"
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
      {errors[REGISTRATION] ? (
        <Text red class_name="mv-10">
          {errors[REGISTRATION]}
        </Text>
      ) : null}
      <Button
        class_name="mt-20"
        disabled={
          Object.keys(checkObjValue(fields)).length !== 5 ||
          fields.password !== fields.repass ||
          fields.phone?.length < 11
        }
        loading={loadings[REGISTRATION]}
        onClick={onSubmit}
      >
        Отправить
      </Button>
    </View>
  );
};

export default Registration;
