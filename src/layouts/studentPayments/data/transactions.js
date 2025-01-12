import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiButton from "components/VuiButton";
import React from "react";

function Student({ image, name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} m={2}>
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

function Function({ content }) {
  return (
    <VuiTypography variant="caption" color="white" fontWeight="medium">
      {content}
    </VuiTypography>
  );
}

export const transactionsTableData = (t, data, handleConfirm) => {
  const safeData = Array.isArray(data) ? data : [];


  const rowsObject = safeData.map((transaction) => ({
    [t("transactions.student")]: (
      <Student
        name={`${transaction.student.user.firstName} ${transaction.student.user.lastName}`}
        email={transaction.student.user.email}
        image={transaction.student.user.profilePic.url}
      />
    ),
    [t("transactions.course")]: <Function content={transaction.course.title} />,
    [t("transactions.teacher")]: (
      <Function content={`${transaction.course.teacher.user.firstName} ${transaction.course.teacher.user.lastName}`} />
    ),
    [t("transactions.amount")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        {`${transaction.amount} DZD`}
      </VuiTypography>
    ),
    [t("transactions.discount")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        {`${transaction.discount}%`}
      </VuiTypography>
    ),
    [t("transactions.netAmount")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        {`${transaction.netAmount} DZD`}
      </VuiTypography>
    ),
    [t("transactions.date")]: (
      <VuiTypography variant="caption" color="white" fontWeight="medium" display="flex" justifyContent="center">
        {new Date(transaction.createdAt).toLocaleDateString()}
      </VuiTypography>
    ),
    [t("transactions.actions")]: (
      <VuiButton variant="contained" color="info" onClick={() => handleConfirm(transaction)}>
        {t("transactions.confirm")}
      </VuiButton>
    ),
  }));

  return {
    columns: [
      { name: t("transactions.student"), align: "left", sortable: false },
      { name: t("transactions.course"), align: "left", sortable: false },
      { name: t("transactions.teacher"), align: "left", sortable: false },
      { name: t("transactions.amount"), align: "center", sortable: true, key: "amount" },
      { name: t("transactions.discount"), align: "center", sortable: true, key: "discount" },
      { name: t("transactions.netAmount"), align: "center", sortable: true, key: "netAmount" },
      { name: t("transactions.date"), align: "center", sortable: true, key: "createdAt" },
      { name: t("transactions.actions"), align: "center", sortable: false }
    ],
    rows: rowsObject || []
  };
};