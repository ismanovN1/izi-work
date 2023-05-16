import React, { useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';

// Images & Icons
import Text from 'components/custom-components/Text';
import Input from 'components/custom-components/Input';
import Button from 'components/custom-components/Button';
import { checkObjValue } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setIsAuth, setUser } from 'store/auth-store/auth-slice';
import { removeError, removeSuccess } from 'store/common-store/common-slice';
import { EDIT_USER } from 'store/auth-store/constants';
import { edit_user_data_thunk } from 'store/auth-store/auth-thunnk';

interface FieldsI {
  name?: string;
  email?: string;
  phone?: string;
}

const ChangeInfo: React.FC<{ setMode: (val: any) => void }> = ({ setMode }) => {
  const dispatch = useAppDispatch();

  // Selectors
  const { loadings, errors, successes } = useAppSelector((s) => s.common);
  const { user } = useAppSelector((s) => s.auth);

  const [fields, setFields] = useState<FieldsI>(
    checkObjValue({ name: user.name, email: user.email, phone: user.phone }),
  );

  useEffect(() => {
    if (successes[EDIT_USER]) {
      setMode('MY_INFO');
      dispatch(removeSuccess(EDIT_USER));
    }
  }, [successes[EDIT_USER]]);

  const onChangeField = (field: Partial<FieldsI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const onSubmit = () => {
    dispatch(removeError(EDIT_USER));
    dispatch(edit_user_data_thunk(fields));
  };

  return (
    <View class_name="full-width fdc ais pt-20 ph-20">
      <Text BodyBlack>Изменить мои данные</Text>
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
      {errors[EDIT_USER] ? (
        <Text red class_name="mv-10">
          {errors[EDIT_USER]}
        </Text>
      ) : null}
      <Button
        class_name="mt-20"
        loading={loadings[EDIT_USER]}
        disabled={Object.keys(checkObjValue(fields)).length !== 3 || fields.phone?.length < 11}
        onClick={onSubmit}
      >
        Изменить
      </Button>
    </View>
  );
};

export default ChangeInfo;
