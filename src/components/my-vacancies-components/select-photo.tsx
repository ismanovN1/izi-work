import Button from 'components/custom-components/Button';
import Text from 'components/custom-components/Text';
import UploadFileArea from 'components/custom-components/UploadFileArea';
import View from 'components/custom-components/View';
import React, { useCallback, useEffect, useState } from 'react';
import { VacancyI } from 'types/common';
import CameraIcon from 'assets/icons/camera-small.svg';

type propsType = {
  value?: VacancyI['photo'];
  onChange?: (val: VacancyI['photo'] | undefined) => void;
};

const SelectPhoto: React.FC<propsType> = ({ onChange, value }) => {
  const [val, setVal] = useState<VacancyI['photo'] | undefined>(value);

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      <Text Description color="#868F90B2" class_name="mb-15">
        Выберите фото для своего объявления.
      </Text>
      <UploadFileArea
        onChange={(e) => {
          setVal(e);
          onChange?.(e);
        }}
        value={val}
        width="100%"
        height={326}
        deleteIconColor="WHITE"
      >
        <View class_name="full-width full-height center">
          <Button leftIcon={<CameraIcon />} width={275}>
            Добавить фото
          </Button>
        </View>
      </UploadFileArea>
    </View>
  );
};

export default SelectPhoto;
