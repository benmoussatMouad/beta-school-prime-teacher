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

function Teacher({ image, name }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} mt={2}>
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

function Function({ content }) {
  return (
    <VuiTypography variant="caption" fontWeight="medium" color="white">
      {content}
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

export const teacherTableData = (t, data, handleOpen) => {

  const rowsObject = data?.map((item) => ({
    [t("demands.table.fullName")]: (
      <Teacher image={item?.profilePic?.url} name={`${item.firstName} ${item.lastName}`} />
    ),
    [t("demands.table.email")]: <Function content={item.email} />,
    [t("demands.table.institution")]: (
      <Function content={item.Teacher.institution} />
    ),
    [t("demands.table.yearsOfExperience")]: (
      <VuiTypography
        variant="caption"
        color="white"
        fontWeight="medium"
        display="flex"
        justifyContent="center"
      >
        {item.Teacher.yearsOfExperience}
      </VuiTypography>
    ),
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
          badgeContent={t(`teachers.status.${item.Teacher.status}`)}
          color="success"
          size="xs"
          container
          sx={({ palette, borders: { borderRadius, borderWidth } }) => {
            const color = getStatusColor(item.Teacher.status, palette);
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
    [t("demands.table.subject")]: (
      <Function content={t(`subjects.${item.Teacher.subject}`)} />
    ),
    [t("demands.table.role")]: (
      <Function content={item.role} />
    ),
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
    [t("demands.table.action")]: (
      <VuiButton
        variant="contained"
        sx={{ padding: "0px", height: "30px" }}
        color="info"
        onClick={() => handleOpen(item)}
      >
        {t("demands.table.view")}
      </VuiButton>
    ),
  }));

  return {
    columns: [
      { name: t("demands.table.fullName"), align: "left" },
      { name: t("demands.table.email"), align: "left" },
      { name: t("demands.table.institution"), align: "center" },
      { name: t("demands.table.yearsOfExperience"), align: "center" },
      { name: t("demands.table.status"), align: "center" },
      { name: t("demands.table.subject"), align: "center" },
      { name: t("demands.table.role"), align: "center" },
      { name: t("demands.table.isEmailVerified"), align: "center" },
      { name: t("demands.table.action"), align: "center" },
    ],

    rows: rowsObject || [],
  };
};
