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
import { useTranslation } from "react-i18next";
import moment from "moment";

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


export const salesRootTableData = (t, data, commission) => {
  const safeData = Array.isArray(data) ? data : [];

  const rowsObject = safeData.map((item) => ({
    [t("sales.table.id")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {item.id}
      </VuiTypography>
    ),
    [t("sales.table.course")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {item.course.title}
      </VuiTypography>
    ),
    [t("sales.table.teacher")]: (
      <Teacher
        image={item.course.teacher.user.profilePic?.url}
        name={`${item.course.teacher.user.firstName} ${item.course.teacher.user.lastName}`}
      />
    ),
    [t("sales.table.student")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {`${item.student.user.firstName} ${item.student.user.lastName}`}
      </VuiTypography>
    ),
    [t("sales.table.amount")]: (
      <VuiTypography sx={{ margin: 1.5 }} variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        <VuiBadge
          variant="standard"
          badgeContent={`${item.amount} DA`}
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      </VuiTypography>
    ),
    [t("sales.table.amountAfterCommission")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        {`${item.netAmount * commission} DA`}
      </VuiTypography>
    ),
    [t("sales.table.status")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        <VuiBadge
          variant="standard"
          badgeContent={t(`status.${item.status}`)}
          size="xs"
          container
          sx={({ palette: { white, success } }) => ({
            background: success.main,
            color: white.main,
          })}
        />
      </VuiTypography>
    ),
    [t("sales.table.date")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
      </VuiTypography>
    ),
  }));

  return {
    columns: [
      { name: t("sales.table.id"), key: "id", align: "left", sortable: false },
      { name: t("sales.table.course"), key: "course", align: "left", sortable: false },
      { name: t("sales.table.teacher"), key: "teacher", align: "left", sortable: false },
      { name: t("sales.table.student"), key: "student", align: "left", sortable: false },
      { name: t("sales.table.amount"), key: "amount", align: "center", sortable: true },
      { name: t("sales.table.amountAfterCommission"), key: "netAmount", align: "center", sortable: true },
      { name: t("sales.table.status"), key: "status", align: "center", sortable: true },
      { name: t("sales.table.date"), key: "createdAt", align: "center", sortable: true },
    ],
    rows: rowsObject,
  };
};
