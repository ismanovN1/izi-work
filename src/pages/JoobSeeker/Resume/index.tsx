import React, { useCallback, useState } from 'react';
import View from 'components/custom-components/View';
import Button from 'components/custom-components/Button';
import { Outlet } from 'react-router-dom';
import ResumeExample from './resume-example';

const ResumeRoot = () => {
  const [viewExample, setViewExample] = useState(false);
  return (
    <View width="100%" class_name="fdc ais">
      <View width="100%" class_name="ph-20u mt-20">
        <Button type={'outline'} bg={viewExample ? 'red' : 'blue'} onClick={() => setViewExample((prev) => !prev)}>
          {viewExample ? 'Закрыть пример резюме' : 'Посмотреть пример резюме'}
        </Button>
      </View>
      <View class_name={`d-${viewExample ? 'none' : 'block'} full-width`}>
        <Outlet />
      </View>
      {viewExample ? <ResumeExample /> : null}
    </View>
  );
};

export default ResumeRoot;
