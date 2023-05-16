import React, { useEffect } from 'react';
import View from 'components/custom-components/View';
import Resume from 'components/resume-components/resume';
import { useAppDispatch, useAppSelector } from 'hooks';
import { redirect, useNavigate } from 'react-router-dom';
import { GET_MY_RESUME } from 'store/resume-store/constans';
import { get_my_resume_thunk } from 'store/resume-store/resume-thunk';
import { MoonLoader } from 'react-spinners';
import Text from 'components/custom-components/Text';

const MyResume: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { resume } = useAppSelector((state) => state.resume);
  const { user } = useAppSelector((state) => state.auth);
  const { loadings, errors } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (!resume?._id && !loadings[GET_MY_RESUME]) {
      dispatch(get_my_resume_thunk());
    }
  }, []);

  if (loadings[GET_MY_RESUME])
    return (
      <View class_name="full-w center" minHeight="50vh">
        <MoonLoader color="#36d7b7" size={30} />
      </View>
    );

  if (errors[GET_MY_RESUME])
    return (
      <View class_name="full-w center" minHeight="50vh">
        <Text red>{errors[GET_MY_RESUME]}</Text>
      </View>
    );

  if (!user || !resume) return null;
  return <Resume resume={resume} user={user} />;
};

export default MyResume;
