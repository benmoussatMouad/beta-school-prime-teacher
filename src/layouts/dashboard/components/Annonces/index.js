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
import { getAccessToken } from "../../../../utils";
import { useGetAnnouncements } from "../../../../api/announcements/getAnnouncements";
import moment from "moment/moment";
import "moment/locale/ar-dz";
import "moment/locale/fr";
import i18n from "../../../../i18n";
import VuiButton from "../../../../components/VuiButton";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteAnnouncements } from "../../../../api/announcements/deleteAnnouncment";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { Form } from "react-hook-form";
import { useCreateAnnouncement } from "../../../../api/announcements/createAnnouncement";

function Annonces({teacherId}) {
  const { t } = useTranslation();
  const token = getAccessToken();
  const { data, isLoading } = useGetAnnouncements({token, teacherId})
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const { mutate } = useDeleteAnnouncements();
  const {mutate: createAnnouncement} = useCreateAnnouncement();

  function deleteAnnouncement(id) {
    setIsDeleteLoading(true);
    mutate({token, id}, {
      onSuccess: () => setIsDeleteLoading(false),
      onError: () => setIsDeleteLoading(false),
    })
  }

  function createNewAnnouncement(event) {
    event.preventDefault();
    setIsCreateLoading(true);
    createAnnouncement({message: newMessage}, {
      onSuccess: () => {
        setIsCreateLoading(false);
        setNewMessage("");
      },
      onError: () => setIsCreateLoading(false),
    })
  }

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
        sx={{
          maxHeight: "300px",
          overflowY: "scroll",
        }}
        p={2}
      >
        {data && !data.announcements?.length && !isLoading &&
          <VuiBox display="flex" justifyContent="center" color={"grey"} alignItems="center" py={3}>
            {t("demands.table.nodata")}
          </VuiBox>}
        {!isLoading && data && data.announcements?.slice().reverse().map((item, index) => (
          <>
            <VuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
              <TimelineItem
                key={index}
                icon={<FaBell size="16px" color={palette.info.main} />}
                title={item.message}
                dateTime={moment(item.createdAt).locale(i18n.language == "ar" ? "ar-dz" : "fr").format("hh:mm - Do MMM YYYY ") || ""}
              />
              <VuiButton variant="text" onClick={() => deleteAnnouncement(item.id)}>{
                !isDeleteLoading ? < AiFillDelete /> : <CircularProgress />
              }</VuiButton>
            </VuiBox>
          </>
        ))}
      </VuiBox>
      <VuiBox
      >
        <form onSubmit={createNewAnnouncement}>
          <VuiInput
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t("typeHere")}
            size="large"
            multiline
            maxRows={4}
            icon={{
              component: !isCreateLoading ? <VuiButton type="submit" variant="text" color="white"
                                                       style={{
                                                         position: "relative",
                                                         left: "-23px",
                                                         top: "-7px",
                                                       }}><BsSendFill /> </VuiButton> :
                <CircularProgress color="white" size="15px" />,
              direction: "left",
            }}
          />
        </form>
      </VuiBox>
    </Card>
  );
}

export default Annonces;
