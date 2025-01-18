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



export const teacherTableData = (t, data) => {
  // Use a default empty array if data is undefined or not an array
  const safeData = Array.isArray(data) ? data : [];



  // Modify the rowsObject mapping
  const rowsObject = safeData.map((item) => ({
    [t("payments.table.id")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        #000{item.teacherPaymentId}
      </VuiTypography>
    ),
    [t("payments.table.amount")]: (
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
    [t("payments.table.status")]: (
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
    [t("payments.table.paidAt")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium">
        {moment(item.paidAt).format("DD/MM/YYYY HH:mm")}
      </VuiTypography>
    ),
  }));

  return {
    columns: [
      { name: t("payments.table.id"), key: "id", align: "left", sortable: false },
      { name: t("payments.table.amount"), key: "amount", align: "center", sortable: true },
      { name: t("payments.table.status"), key: "status", align: "center", sortable: false },
      { name: t("payments.table.paidAt"), key: "paidAt", align: "center", sortable: true },
    ],
    rows: rowsObject || [],
  };
};
