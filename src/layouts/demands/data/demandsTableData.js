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

export const demandsTableData = (t, data, handleOpen) => {
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
          badgeContent={t("demands.table.progress")}
          color="success"
          size="xs"
          container
          sx={({
                 palette: { white, success, warning },
                 borders: { borderRadius, borderWidth },
               }) => ({
            background: warning.main,
            border: `${borderWidth[1]} solid ${warning.main}`,
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
      { name: t("demands.table.action"), align: "center" },
    ],

    rows: rowsObject || [],
  };
};
