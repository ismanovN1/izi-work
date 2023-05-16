import React, { useEffect, useState } from 'react';

// Components
import View from 'components/custom-components/View';

// Images & Icons
import Text from 'components/custom-components/Text';
import Input from 'components/custom-components/Input';
import Button from 'components/custom-components/Button';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { CHANGE_PASSWORD } from 'store/auth-store/constants';
import { removeError, removeSuccess } from 'store/common-store/common-slice';
import { change_password_thunk } from 'store/auth-store/auth-thunnk';

interface FieldsI {
  old_password?: string;
  new_password?: string;
  repass?: string;
}

const ChangePass: React.FC<{ setMode: (val: any) => void }> = ({ setMode }) => {
  const dispatch = useAppDispatch();

  const { loadings, errors, successes } = useAppSelector((s) => s.common);

  const [fields, setFields] = useState<FieldsI>({});
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    if (successes[CHANGE_PASSWORD]) {
      setMode('MY_INFO');
      dispatch(removeSuccess(CHANGE_PASSWORD));
    }
  }, [successes[CHANGE_PASSWORD]]);

  const onChangeField = (field: Partial<FieldsI>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const onSubmit = () => {
    dispatch(removeError(CHANGE_PASSWORD));
    const { repass, ...restFields } = fields;
    dispatch(change_password_thunk(restFields));
  };

  return (
    <View class_name="full-width fdc ais pt-20 ph-20">
      <Text BodyBlack>{verified ? 'Введите новый пароль' : 'Введите текущий пароль'}</Text>
      <Input
        class_name="mv-20"
        placeholder="Пароль"
        type="password"
        value={fields[verified ? 'new_password' : 'old_password'] || ''}
        onChange={(e) => onChangeField({ [verified ? 'new_password' : 'old_password']: e.target.value || undefined })}
      />
      {verified && (
        <Input
          placeholder="Повторить пароль"
          class_name="mb-20"
          type="password"
          value={fields.repass || ''}
          onChange={(e) => onChangeField({ repass: e.target.value || undefined })}
        />
      )}
      {errors[CHANGE_PASSWORD] ? (
        <Text red class_name="mv-10">
          {errors[CHANGE_PASSWORD]}
        </Text>
      ) : null}
      <Button
        disabled={(!verified && !fields.old_password) || (verified && fields.new_password !== fields.repass)}
        loading={loadings[CHANGE_PASSWORD]}
        onClick={() => {
          if (!verified) {
            setVerified(true);
          } else {
            onSubmit();
          }
        }}
      >
        {verified ? 'Изменить' : 'Далее'}
      </Button>

      {!verified && (
        <NavLink to="">
          <Text red Description class_name="full-width t-align-center mt-20 text-decoration-underline">
            Забыли пароль
          </Text>
        </NavLink>
      )}
    </View>
  );
};

export default ChangePass;
