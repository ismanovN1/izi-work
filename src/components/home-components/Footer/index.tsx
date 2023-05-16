import React from 'react';

// Components
import View from 'components/custom-components/View';
import Image from 'components/custom-components/Image';
import Text from 'components/custom-components/Text';

// Helpers & Utils
import {} from 'helpers/common';

// Images & Icons
import LogoWhite from 'assets/icons/logo_white.svg';
import facebook_icon from 'assets/icons/facebook.png';
import instagram_icon from 'assets/icons/instagram.png';
import youtube_icon from 'assets/icons/youtube.png';

const Footer = () => {
  return (
    <View class_name="footer full-width relative" height={216}>
      <View class_name="bg-blue center absolute ph-16 pb-36u" height={250} left={0} right={0}>
        <View class_name="space-b f-wrap full-width f-shrink-1" width="100%" maxWidth={1100}>
          <View class_name="d-flex fdc">
            <LogoWhite />
            <Text class_name="mt-23" white SmallL>
              © 2023 IZIWork. All Rights Reserved.
            </Text>
          </View>
          <View class_name="d-flex fdc social">
            <Text class_name="full-width t-align-right" white SmallL>
              Ма в социальных сетях
            </Text>
            <View class_name="d-flex jce full-width mt-26">
              <Image className="mr-30 pointer" src={facebook_icon} width={30} height="auto" />
              <Image className="mr-30 pointer" src={instagram_icon} width={30} height="auto" />
              <Image className="pointer" src={youtube_icon} width={30} height="auto" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer;
