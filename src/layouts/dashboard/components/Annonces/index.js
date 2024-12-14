/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// React icons
import { FaBell } from "react-icons/fa";

// Vision UI Dashboard React example components
import TimelineItem from "examples/Timeline/TimelineItem";

// Vision UI Dashboard theme imports
import palette from "assets/theme/base/colors";
import VuiInput from "../../../../components/VuiInput";
import { useTranslation } from "react-i18next";
import VuiBadge from "../../../../components/VuiBadge";

function Annonces() {
  const { t } = useTranslation();
  return (
    <Card className="h-100">
      <VuiBox
        xs={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      >

      </VuiBox>
      <VuiBox mb="16px">
        <VuiTypography variant="h4" fontWeight="bold" mb="5px" color="white">
          {t("announcement.title")}
        </VuiTypography>
        <VuiBadge color="warning" variant="gradient" badgeContent="En cours de development" size="lg" />
        {/*<VuiBox mb={2}>*/}
        {/*  <VuiBox display="flex" alignItems="center">*/}
        {/*    <BsCheckCircleFill color="green" size="15px" mr="5px" />*/}
        {/*    <VuiTypography variant="button" color="text" fontWeight="medium" ml="5px" mr="2px">*/}
        {/*      +30%*/}
        {/*    </VuiTypography>{" "}*/}
        {/*    <VuiTypography variant="button" color="text" fontWeight="regular">*/}
        {/*      {" "}*/}
        {/*      this month*/}
        {/*    </VuiTypography>*/}
        {/*  </VuiBox>*/}
        {/*</VuiBox>*/}
      </VuiBox>
      <VuiBox
        p={2}
      >
        <TimelineItem
          icon={<FaBell size="16px" color={palette.info.main} />}
          title="Session directe, 24 Nov. Lien meet: https://meet.google.com/wax-kivn-kni"
          dateTime="22 DEC 7:20 PM"
        /> <TimelineItem
        icon={<FaBell size="16px" color={palette.info.main} />}
        title="Session directe, 24 Nov. Lien meet: https://meet.google.com/wax-kivn-kni"
        dateTime="22 DEC 7:20 PM"
      /> <TimelineItem
        icon={<FaBell size="16px" color={palette.info.main} />}
        title="Session directe, 24 Nov. Lien meet: https://meet.google.com/wax-kivn-kni"
        dateTime="22 DEC 7:20 PM"
      />
      </VuiBox>
      <VuiBox
      >
        <VuiInput
          placeholder="Type here..."
          icon={{
            component: "send",
            direction: "right",
          }}
        />
      </VuiBox>
    </Card>
  );
}

export default Annonces;
