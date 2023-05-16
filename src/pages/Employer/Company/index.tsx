import React, { useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { useNavigate } from 'react-router-dom';

// Images & Icons
import Pen from 'assets/icons/pen.svg';

import { screen_height } from 'helpers/common';
import Image from 'components/custom-components/Image';
import { useAppDispatch, useAppSelector } from 'hooks';
import { GET_MY_COMPANY } from 'store/company-store/constans';
import { FadeLoader } from 'react-spinners';
import { get_my_company_thunk } from 'store/company-store/company-thunk';
import { removeError } from 'store/common-store/common-slice';

const Company = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { company_data } = useAppSelector((state) => state.company);
  const { errors, loadings } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (!company_data) dispatch(get_my_company_thunk());
    return () => {
      dispatch(removeError(GET_MY_COMPANY));
    };
  }, []);

  return (
    <View class_name="full-width d-flex aifs ph-125 pt-60">
      {company_data && (
        <View card width={275} height={screen_height - 180} class_name="p-20 mr-20">
          <View class_name="fdr">
            <Image src={company_data?.logo} class_name="br-8 bc-grey mr-10" width={52} height={52} fit="cover" />
            <Text class_name="mt4" Description>
              {company_data?.name}
            </Text>
          </View>
        </View>
      )}
      <View card class_name="br-10 p-20 d-flex ais" width={825}>
        {loadings[GET_MY_COMPANY] ? (
          <View class_name="full-width center" height={200}>
            <FadeLoader color="#36d7b7" />
          </View>
        ) : errors[GET_MY_COMPANY] ? (
          <Text red>{errors[GET_MY_COMPANY]}</Text>
        ) : company_data ? (
          <>
            <Image src={company_data?.logo} class_name="br-8 bc-grey mr-20" width={235} height={235} fit="cover" />
            <View class_name="fdc jcsb f-grow-1">
              <View class_name="fdc full-width">
                <Text DescriptionB>{company_data?.name}</Text>
                <Text Description class_name="mt-30">
                  {company_data?.description}
                </Text>
              </View>
              <View class_name="full-width d-flex jce">
                <View class_name="d-flex pointer" onClick={() => navigate('/account/create-edit')}>
                  <Pen />
                  <Text class_name="ml-8" Subtitle blue>
                    Редактировать
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <Text class_name="pointer" onClick={() => navigate('/account/create-edit')} Subtitle blue>
            + Cоздать компанию
          </Text>
        )}
      </View>
    </View>
  );
};

export default Company;
