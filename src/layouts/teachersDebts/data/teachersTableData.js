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

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";

// Images
import VuiBadge from "../../../components/VuiBadge";
import React from "react";
import VuiButton from "../../../components/VuiButton";
import { useTranslation } from "react-i18next";

function Teacher({ image, name }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} m={2}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function Function({ content, isWilaya }) {
  const { t } = useTranslation();
  return (
    <VuiTypography variant="caption" fontWeight="medium" color="white">
      {isWilaya ? content && t(`wilaya.${content}`) : content}
    </VuiTypography>
  );
}

export const teacherTableData = (t, data, handleOpen, user) => {
  const role = user?.user?.role;
  // Use a default empty array if data is undefined or not an array
  const safeData = Array.isArray(data) ? data : [];



  // Modify the rowsObject mapping
  const rowsObject = safeData.map((item) => ({
    [t("demands.table.fullName")]: (
      <Teacher image={item?.user.profilePic?.url} name={`${item.user.firstName} ${item.user.lastName}`} />
    ),
    [t("demands.table.email")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {item.user.email}
      </VuiTypography>
    ),
    [t("demands.table.phone")]: <Function content={item.user.phone} />,
    [t("demands.table.institution")]: (
      <Function content={item?.institution} />
    ),
    [t("demands.table.yearsOfExperience")]: (
      <VuiTypography
        variant="caption"
        color="white"
        fontWeight="medium"
        display="flex"
        justifyContent="center"
      >
        {item?.yearsOfExperience}
      </VuiTypography>
    ),
    [t("teachers.table.wilaya")]: <Function isWilaya={true} content={item?.wilaya} />,
    [t("demands.table.debt")]: (
      <VuiTypography
        variant="caption"
        color="white"
        fontWeight="medium"
        display="flex"
        justifyContent="center"
      >
        <VuiBadge
          variant="standard"
          badgeContent={`${item.debt} DA`}
          size="xs"
          container
          sx={({ palette: { white, success, error }, borders: { borderRadius, borderWidth } }) => ({
            background: item.debt > 0 ? error.main : success.main,
            border: `${borderWidth[1]} solid ${item.debt > 0 ? error.main : success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      </VuiTypography>
    ),
    [t("demands.table.subject")]: <Function content={t(`subjects.${item?.subject}`)} />,
    [t("demands.table.role")]: <Function content={t(`roles.${item?.user.role}`)} />,
    [t("demands.table.action")]: role === "ROOT" && item.role !== "ROOT" ? (
      <VuiButton
        variant="contained"
        sx={{ padding: "0px", height: "30px" }}
        color="info"
        onClick={() => handleOpen(item)}
      >
        {t("demands.table.pay")}
      </VuiButton>
    ) : null,
  }));

  return {
    columns: [
      { name: t("demands.table.fullName"), key: "fullName", align: "left", sortable: false },
      { name: t("demands.table.email"), key: "email", align: "left", sortable: false },
      { name: t("demands.table.phone"), key: "phone", align: "left", sortable: false },
      { name: t("demands.table.institution"), key: "institution", align: "center", sortable: true },
      { name: t("demands.table.yearsOfExperience"), key: "yearsOfExperience", align: "center", sortable: true },
      { name: t("teachers.table.wilaya"), key: "wilaya", align: "center", sortable: false },
      { name: t("demands.table.debt"), key: "debt", align: "center", sortable: true },
      { name: t("demands.table.subject"), key: "subject", align: "center", sortable: false },
      { name: t("demands.table.role"), key: "role", align: "center", sortable: false },
      { name: t("demands.table.action"), key: "action", align: "center", sortable: false },
    ],
    rows: rowsObject || [],
  };
};