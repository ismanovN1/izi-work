import React, { useEffect, useState } from 'react';

// Components
import View from 'components/custom-components/View';

// Images & Icons
import Logo from 'assets/icons/logo.svg';
import Text from 'components/custom-components/Text';
import Input from 'components/custom-components/Input';
import Button from 'components/custom-components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AUTHORIZATION } from 'store/auth-store/constants';
import { setIsAuth } from 'store/auth-store/auth-slice';
import { removeError, removeSuccess } from 'store/common-store/common-slice';
import { authorization_thunk } from 'store/auth-store/auth-thunnk';
import { checkObjValue } from 'helpers/common';
import { isMobile } from 'react-device-detect';

interface FieldsI {
  email?: string;
  password?: string;
  is_employer: boolean;
}

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loadings, successes, errors } = useAppSelector((state) => state.common);

  const [fields, setFields] = useState<FieldsI>({ is_employer: true });

  useEffect(() => {
    if (successes[AUTHORIZATION]) {
      dispatch(setIsAuth(true));
      navigate('/');
      dispatch(removeSuccess(AUTHORIZATION));
    }
  }, [successes[AUTHORIZATION]]);

  const onChangeField = (field: Partial<FieldsI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const onSubmit = () => {
    dispatch(removeError(AUTHORIZATION));
    dispatch(authorization_thunk(fields));
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
        <Text H2>Войти</Text>
        <Input
          class_name="mt-34 mb-20"
          placeholder="E-mail или телефон"
          value={fields.email}
          onChange={(e) => onChangeField({ email: e.target.value || undefined })}
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={fields.password}
          onChange={(e) => onChangeField({ password: e.target.value || undefined })}
        />
        {errors[AUTHORIZATION] && (
          <Text class_name="pv-10" red>
            {errors[AUTHORIZATION]}
          </Text>
        )}
        <Button
          class_name="mt-40 mb-20"
          loading={loadings[AUTHORIZATION]}
          disabled={Object.keys(checkObjValue(fields)).length < 2}
          onClick={onSubmit}
        >
          Войти
        </Button>
        <NavLink to="/account/registr">
          <Text class_name="pointer text-decoration-underline" red Description>
            Забыли пароль
          </Text>
        </NavLink>
      </View>
    </View>
  );
};

export default Auth;
