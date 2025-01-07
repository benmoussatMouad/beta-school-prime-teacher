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

const getStatusColor = (status, palette) => {
  switch (status) {
    case "REGISTERED":
      return palette.info.main;
    case "IN_PROGRESS":
      return palette.warning.main;
    case "ACCEPTED":
      return palette.success.main;
    case "REJECTED":
      return palette.error.main;
    default:
      return palette.grey[500];
  }
};

export const teacherTableData = (t, data, handleOpen, user) => {
  const role = user?.user?.role;
  // Use a default empty array if data is undefined or not an array
  const safeData = Array.isArray(data) ? data : [];


  const rowsObject = safeData.map((item) => ({
    [t("demands.table.fullName")]: (
      <Teacher image={item?.profilePic?.url} name={`${item.firstName} ${item.lastName}`} />
    ),
    [t("demands.table.email")]: <Function content={item.email} />,
    [t("demands.table.institution")]: (
      <Function content={item.Teacher?.institution} />
    ),
    [t("demands.table.yearsOfExperience")]: (
      <VuiTypography
        variant="caption"
        color="white"
        fontWeight="medium"
        display="flex"
        justifyContent="center"
      >
        {item.Teacher?.yearsOfExperience}
      </VuiTypography>
    ),
    [t("teachers.table.wilaya")]: <Function isWilaya={true} content={item.Teacher?.wilaya} />, // Add Wilaya here
    [t("demands.table.status")]: (
      <VuiTypography
        variant="caption"
        color="white"
        fontWeight="medium"
        display="flex"
        justifyContent="center"
      >
        <VuiBadge
          variant="standard"
          badgeContent={t(`teachers.status.${item.Teacher?.status}`)}
          color="success"
          size="xs"
          container
          sx={({ palette, borders: { borderRadius, borderWidth } }) => {
            const color = getStatusColor(item.Teacher?.status, palette);
            return {
              background: color,
              border: `${borderWidth[1]} solid ${color}`,
              borderRadius: borderRadius.md,
              color: palette.white.main,
            };
          }}
        />
      </VuiTypography>
    ),
    [t("demands.table.subject")]: <Function content={t(`subjects.${item.Teacher?.subject}`)} />,
    [t("demands.table.role")]: <Function content={t(`roles.${item.role}`)} />,
    [t("demands.table.isEmailVerified")]: (
      <VuiTypography
        variant="caption"
        color="white"
        fontWeight="medium"
        display="flex"
        justifyContent="center"
      >
        <VuiBadge
          variant="standard"
          badgeContent={t(`profile.card.${item.isEmailVerified ? "Verified" : "unVerified"}`)}
          color="success"
          size="xs"
          container
          sx={({
                 palette: { white, success, warning },
                 borders: { borderRadius, borderWidth },
               }) => ({
            background: item.isEmailVerified ? success.main : warning.main,
            border: `${borderWidth[1]} solid ${item.isEmailVerified ? success.main : warning.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      </VuiTypography>
    ),
    [t("demands.table.action")]: role === "ROOT" && item.role !== "ROOT" ? (
      <VuiButton
        variant="contained"
        sx={{ padding: "0px", height: "30px" }}
        color="info"
        onClick={() => handleOpen(item)}
      >
        {t("demands.table.view")}
      </VuiButton>
    ) : null,
  }));

  return {
    columns: [
      { name: t("demands.table.fullName"), key: "fullName", align: "left", sortable: false },
      { name: t("demands.table.email"), key: "email", align: "left", sortable: true },
      { name: t("demands.table.institution"), key: "institution", align: "center", sortable: true }, // Not sortable
      { name: t("demands.table.yearsOfExperience"), key: "yearsOfExperience", align: "center", sortable: true },
      { name: t("teachers.table.wilaya"), key: "wilaya", align: "center", sortable: true },
      { name: t("demands.table.status"), key: "status", align: "center", sortable: false }, // Not sortable
      { name: t("demands.table.subject"), key: "subject", align: "center", sortable: true }, // Not sortable
      { name: t("demands.table.role"), key: "role", align: "center", sortable: false },
      { name: t("demands.table.isEmailVerified"), key: "isEmailVerified", align: "center", sortable: false }, // Not sortable
      { name: t("demands.table.action"), key: "action", align: "center", sortable: false }, // Not sortable
    ],
    rows: rowsObject || [],
  };
};
