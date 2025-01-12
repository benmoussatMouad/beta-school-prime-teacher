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
  const safeData = Array.isArray(data) ? data : [];

  const rowsObject = safeData.map((item) => ({
    [t("demands.table.fullName")]: (
      <Teacher
        image={item?.teacher?.user?.profilePic?.url}
        name={`${item.teacher.user.firstName} ${item.teacher.user.lastName}`}
      />
    ),
    [t("demands.table.email")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {item.teacher.user.email}
      </VuiTypography>
    ),
    [t("demands.table.phone")]: <Function content={item.teacher.user.phone} />,
    [t("demands.table.institution")]: (
      <Function content={item.teacher?.institution} />
    ),
    [t("demands.table.yearsOfExperience")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        {item.teacher?.yearsOfExperience}
      </VuiTypography>
    ),
    [t("teachers.table.wilaya")]: <Function isWilaya={true} content={item.teacher?.wilaya} />,
    [t("demands.table.debt")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        <VuiBadge
          variant="standard"
          badgeContent={`${item.amount} DA`}
          size="xs"
          container
          sx={({ palette: { white, success, error }, borders: { borderRadius, borderWidth } }) => ({
            background: item.status === 'PENDING' ? error.main : success.main,
            border: `${borderWidth[1]} solid ${item.status === 'PENDING' ? error.main : success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      </VuiTypography>
    ),
    [t("demands.table.subject")]: <Function content={t(`subjects.${item.teacher?.subject}`)} />,
    [t("demands.table.status")]: <Function content={t(`status.${item.status}`)} />,
    [t("demands.table.createdAt")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {new Date(item.createdAt).toLocaleDateString()}
      </VuiTypography>
    ),
    [t("demands.table.action")]: role === "ROOT" && item.status === 'PENDING' ? (
      <VuiBox sx={{ display: "flex", gap: ".5em", alignItems: "center", justifyContent: "center" }} >
        <VuiButton
          variant="contained"
          sx={{ padding: "0px", height: "30px" }}
          color="info"
          onClick={() => handleOpen(item)}
        >
          {t("demands.table.pay")}
        </VuiButton>
        <VuiButton
          variant="contained"
          sx={{ padding: "0px", height: "30px" }}
          color="info"
          href={`/debt/${item.id}`}
        >
          {t("demands.table.view")}
        </VuiButton>
      </VuiBox>
    ) : null,
  }));

  return {
    columns: [
      { name: t("demands.table.fullName"), key: "fullName", align: "left" },
      { name: t("demands.table.email"), key: "email", align: "left" },
      { name: t("demands.table.phone"), key: "phone", align: "left" },
      { name: t("demands.table.institution"), key: "institution", align: "center" },
      { name: t("demands.table.yearsOfExperience"), key: "yearsOfExperience", align: "center" },
      { name: t("teachers.table.wilaya"), key: "wilaya", align: "center" },
      { name: t("demands.table.debt"), key: "debt", align: "center" },
      { name: t("demands.table.subject"), key: "subject", align: "center" },
      { name: t("demands.table.status"), key: "status", align: "center" },
      { name: t("demands.table.createdAt"), key: "createdAt", align: "center" },
      { name: t("demands.table.action"), key: "action", align: "center" },
    ],
    rows: rowsObject,
  };
};
