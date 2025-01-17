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
import VuiBadge from "components/VuiBadge";
import VuiButton from "../../../components/VuiButton";
import React from "react";

// Images

function Student({ image, name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={1.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {email}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}



export const studentsTableData = (t, students, role, handleOpen, handleOpenActions) => {
  // Map status to corresponding color and text
  const getStatusBadge = (status) => {
    const statusMap = {
      REGISTERED: {
        label: t("students.status.registered"),
        color: "info", // You can adjust these colors based on your theme
      },
      IN_PROGRESS: {
        label: t("students.status.inProgress"),
        color: "primary",
      },
      ACCEPTED: {
        label: t("students.status.accepted"),
        color: "success",
      },
      REJECTED: {
        label: t("students.status.rejected"),
        color: "error",
      },
      BLOCKED: {
        label: t("students.status.blocked"),
        color: "warning",
      },
    };

    const badgeStyle = (theme) => {
      const defaultColor = theme.palette.grey[500];
      const badgeColor = theme.palette[statusMap[status]?.color]?.main || defaultColor;

      return {
        background: badgeColor,
        border: `1px solid ${badgeColor}`,
        borderRadius: theme.borders.borderRadius.md,
        color: theme.palette.common.white,
      };
    };

    return (
      <VuiBadge
        variant="standard"
        badgeContent={statusMap[status]?.label || t("students.status.unknown")}
        size="xs"
        container
        sx={(theme) => badgeStyle(theme)} // Use the computed badge style
      />
    );
  };

  if (!students || students.length === 0) {
    return {
      columns: [
        { name: t("students.table.student"), align: "left" },
        { name: t("students.table.phoneNumber"), align: "left" },
        { name: t("students.table.address"), align: "left" },
        { name: t("students.table.wilaya"), align: "center" },
        { name: t("students.table.class"), align: "center" },
        { name: t("students.table.status"), align: "center" },
        { name: t("students.table.action"), align: "center" },
      ],
      rows: [], // Handle empty student array
    };
  }

  return {
    columns: [
      { name: t("students.table.student"), key: "student", sortable: false, align: "left" },
      { name: t("students.table.phoneNumber"), key: "phoneNumber", sortable: false, align: "left" },
      { name: t("students.table.address"), key: "address", sortable: false, align: "left" },
      { name: t("students.table.wilaya"), key: "wilaya", sortable: true, align: "center" },
      { name: t("students.table.class"), key: "class", sortable: true, align: "center" },
      { name: t("students.table.status"), key: "status", sortable: true, align: "center" },
      { name: t("students.table.action"), key: "action", sortable: false, align: "center" }, // No sorting for action column
    ],

    rows: students.map((student) => ({
      [t("students.table.student")]: (
        <Student
          image={student.user.profilePic?.url || "default-avatar.png"}
          name={`${student.user.firstName} ${student.user.lastName}`}
          email={student.user.email}
        />
      ),
      [t("students.table.phoneNumber")]: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          {student.user.phone || t("students.table.noPhone")}
        </VuiTypography>
      ),
      [t("students.table.class")]: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          {t(`teacherClass.${student.class}`)}
        </VuiTypography>
      ),
      [t("students.table.address")]: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          {student.address || t("students.table.noAddress")}
        </VuiTypography>
      ),
      [t("students.table.wilaya")]: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          {t(`wilaya.${student.wilaya}`)}
        </VuiTypography>
      ),
      [t("students.table.status")]: getStatusBadge(student.status),
      [t("students.table.action")]: role === "ROOT" ? <VuiButton
        variant="contained"
        sx={{ padding: "0px", height: "30px" }}
        color="info"
        onClick={() => handleOpenActions(student.id)}
      >
        {t("demands.table.view")}
      </VuiButton> : ""
    })),
  }
};
