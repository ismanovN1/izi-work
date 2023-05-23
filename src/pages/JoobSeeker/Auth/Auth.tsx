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
import { setIsAuth } from 'store/auth-store/auth-slice';
import { removeError, removeSuccess } from 'store/common-store/common-slice';
import { authorization_thunk } from 'store/auth-store/auth-thunnk';
import { AUTHORIZATION } from 'store/auth-store/constants';

interface FieldsI {
  email?: string;
  password?: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Selectors
  const { loadings, errors, successes } = useAppSelector((s) => s.common);

  const [fields, setFields] = useState<FieldsI>({});

  const onChangeField = (field: Partial<FieldsI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const onSubmit = () => {
    dispatch(removeError(AUTHORIZATION));
    dispatch(
      authorization_thunk(fields, () => {
        dispatch(setIsAuth(true));
        navigate('/');
      }),
    );
  };

  return (
    <View class_name="full-width fdc ais pt-20 ph-20" minHeight="calc(100vh - 65px)">
      <Text BodyBlack>Войти</Text>
      <Input
        class_name="mt-15"
        placeholder="E-mail"
        type="E-mail"
        value={fields.email}
        onChange={(e) => onChangeField({ email: e.target.value || undefined })}
      />
      <Input
        class_name="mv-20"
        placeholder="Пароль"
        type="password"
        value={fields.password}
        onChange={(e) => onChangeField({ password: e.target.value || undefined })}
      />
      {errors[AUTHORIZATION] ? (
        <Text red class_name="mv-10">
          {errors[AUTHORIZATION]}
        </Text>
      ) : null}
      <Button
        class_name="mt-20"
        loading={loadings[AUTHORIZATION]}
        disabled={Object.keys(checkObjValue(fields)).length !== 2}
        onClick={onSubmit}
      >
        Войти
      </Button>

      <NavLink to="/registr">
        <Text red Description class_name="full-width t-align-center mt-20 text-decoration-underline">
          Забыли пароль
        </Text>
      </NavLink>
    </View>
  );
};

export default Auth;
