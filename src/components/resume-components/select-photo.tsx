import Button from 'components/custom-components/Button';
import Text from 'components/custom-components/Text';
import UploadFileArea from 'components/custom-components/UploadFileArea';
import View from 'components/custom-components/View';
import React, { useCallback, useEffect, useState } from 'react';
import { ResumeI } from 'types/common';
import CameraIcon from 'assets/icons/camera-large.svg';

type propsType = {
  value?: ResumeI['photo'];
  onChange?: (val: ResumeI['photo'] | undefined) => void;
};

const SelectPhoto: React.FC<propsType> = ({ onChange, value }) => {
  const [val, setVal] = useState<ResumeI['photo'] | undefined>(value);

  useEffect(() => {
    if (typeof val !== 'string') onChange?.(val);
  }, [val]);

  return (
    <View class_name="full-width fdc ais flex-1 mt-12">
      <Text Description color="#868F90B2" class_name="mb-39">
        Добавьте или сделайте фото
      </Text>
      <View class_name="full-width full-height center">
        <UploadFileArea onChange={(e) => setVal(e)} value={val} width={290} height={290} deleteIconColor="WHITE">
          <CameraIcon />
        </UploadFileArea>
      </View>
    </View>
  );
};

export default SelectPhoto;
