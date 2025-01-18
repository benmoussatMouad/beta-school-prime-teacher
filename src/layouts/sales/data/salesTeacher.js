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
import VuiTypography from "components/VuiTypography";

// Images
import VuiBadge from "../../../components/VuiBadge";
import React from "react";
import moment from "moment";



export const teacherSalesTableData = (t, data, commission) => {
  // Use a default empty array if data is undefined or not an array
  const safeData = Array.isArray(data) ? data : [];

  const rowsObject = safeData.map((item) => ({
    [t("sales.table.id")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        #000{item.transactionId}
      </VuiTypography>
    ),
    [t("sales.table.course")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {item.course.title}
      </VuiTypography>
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
        {`${item.netAmount} DA`}
      </VuiTypography>
    ),
    [t("sales.table.status")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        <VuiBadge
          variant="standard"
          badgeContent={t(`status.${item.status}`)}
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
      { name: t("sales.table.student"), key: "student", align: "left", sortable: false },
      { name: t("sales.table.amount"), key: "amount", align: "center", sortable: true },
      { name: t("sales.table.amountAfterCommission"), key: "netAmount", align: "center", sortable: true },
      { name: t("sales.table.status"), key: "status", align: "center", sortable: true },
      { name: t("sales.table.date"), key: "createdAt", align: "center", sortable: true },
    ],
    rows: rowsObject,
  };
};
