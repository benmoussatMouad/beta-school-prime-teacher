import React, { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useTranslation } from "react-i18next";
import { getAccessToken } from "../../utils";
import { useAuth } from "../../context/auth/authContext";
import { useGetDebtDetail } from "api/admin/getDebtDetail";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { CircularProgress, Divider, Grid } from "@mui/material";
import moment from "moment";
import VuiButton from "components/VuiButton";
import PaymentDialog from "examples/Dialogs/ConfirmPayment";
import { MdOutlinePayment } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineReceiptLong } from "react-icons/md";
import NotFound from "examples/NotFound/NotFound";
import VuiLoading from "components/VuiLoading";

function DebtDetail() {
  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { debtId } = useParams();
  const { user } = useAuth();
  const token = getAccessToken();
  const { t } = useTranslation();

  const { data, isLoading } = useGetDebtDetail({
    token,
    debtId
  });

  if (isLoading) {
    return <VuiLoading />;
  }


  if (!data) {
    return <NotFound isDebt={true} user={user} />;
  }

  const handleOpen = () => {
    const paymentData = {
      id: data.id,
      teacherId: data.teacherId,
      amount: data.amount,
      description: data.description,
      status: data.status,
      teacherName: `${data.teacher.user.firstName} ${data.teacher.user.lastName}`,
      email: data.teacher.user.email,
      phone: data.teacher.user.phone,
      profilePic: data.teacher.user.profilePic.url,
      wilaya: data.teacher.wilaya,
      subject: data.teacher.subject,
      transactions: data.transactions.map(trans => ({
        id: trans.id,
        amount: trans.netAmount,
        course: trans.course.title,
        student: `${trans.student.user.firstName} ${trans.student.user.lastName}`,
        paidAt: trans.paidAt,
        paymentMethod: trans.paymentMethod
      }))
    };
    setPaymentData(paymentData);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={t("debts.detail.title")} />
      <VuiBox py={3}>
        <Card sx={{ overflow: 'hidden' }}>
          {isLoading ? (
            <VuiBox display="flex" justifyContent="center" p={5}>
              <CircularProgress color="info" />
            </VuiBox>
          ) : (
            <>
              {/* Header Section with Status Badge */}
              <VuiBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <VuiTypography variant="h3" color="white">
                  {t("debts.detail.title")}
                </VuiTypography>
                <VuiBox
                  px={2}
                  py={1}
                  bgColor={data.status === "PENDING" ? "warning" : "success"}
                  borderRadius={10}
                >
                  <VuiTypography variant="button" color="white" fontWeight="medium">
                    {t(`status.${data.status}`)}
                  </VuiTypography>
                </VuiBox>
              </VuiBox>

              <VuiBox p={3}>
                <Grid container spacing={3}>
                  {/* Teacher Info Card */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <VuiBox p={2}>
                        <VuiBox display="flex" alignItems="center" mb={2}>
                          <BsPersonFill size={24} color="#fff" />
                          <VuiTypography variant="h4" color="white">
                            {t("debts.detail.teacherInfo")}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox pl={4}>
                          <VuiTypography variant="h6" color="white">
                            {`${data.teacher.user.firstName} ${data.teacher.user.lastName}`}
                          </VuiTypography>
                          <VuiTypography variant="button" color="text">
                            {data.teacher.user.email}
                          </VuiTypography>
                          <VuiTypography variant="button" color="text" display="block">
                            {data.teacher.user.phone}
                          </VuiTypography>
                        </VuiBox>
                      </VuiBox>
                    </Card>
                  </Grid>

                  {/* Debt Info Card */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%" }} >
                      <VuiBox p={2}>
                        <VuiBox display="flex" alignItems="center" mb={2}>
                          <MdOutlinePayment size={24} color="#fff" />
                          <VuiTypography variant="h4" color="white">
                            {t("debts.detail.debtInfo")}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox pl={4}>
                          <VuiTypography variant="h5" color="success">
                            {data.amount} DA
                          </VuiTypography>
                          <VuiTypography variant="button" color="text">
                            {t("debts.detail.createdAt")}: {moment(data.createdAt).format("DD/MM/YYYY HH:mm")}
                          </VuiTypography>
                        </VuiBox>
                      </VuiBox>
                    </Card>
                  </Grid>

                  {/* Transactions Section */}
                  <Grid item xs={12}>
                    <Card>
                      <VuiBox p={2}>
                        <VuiBox display="flex" alignItems="center" mb={3}>
                          <MdOutlineReceiptLong size={24} color="#fff" />
                          <VuiTypography variant="h4" color="white">
                            {t("debts.detail.transactions")}
                          </VuiTypography>
                        </VuiBox>

                        {data.transactions.map((transaction, index) => (
                          <React.Fragment key={transaction.id}>
                            <VuiBox
                              p={3}
                              mb={2}
                              borderRadius="xl"
                              bgColor="dark"
                              sx={{
                                transition: "all 0.3s",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
                                }
                              }}
                            >
                              <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={2}>
                                  <VuiTypography variant="h6" color="white" fontWeight="bold">
                                    {transaction.course.title}
                                  </VuiTypography>
                                  <VuiTypography variant="caption" color="text">
                                    {t("debts.detail.courseTitle")}
                                  </VuiTypography>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                  <VuiBox>
                                    <VuiTypography variant="button" color="text" fontWeight="medium">
                                      {`${transaction.student.user.firstName} ${transaction.student.user.lastName}`}
                                    </VuiTypography>
                                    <VuiTypography variant="caption" color="text" display="block">
                                      {transaction.student.user.phone}
                                    </VuiTypography>
                                    <VuiTypography variant="caption" color="text">
                                      {transaction.student.user.email}
                                    </VuiTypography>
                                  </VuiBox>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                  <VuiBox
                                    bgColor="dark"
                                    borderRadius="lg"
                                    p={2}
                                    sx={{
                                      background: "linear-gradient(145deg, rgba(26,31,51,1) 0%, rgba(31,35,53,1) 100%)"
                                    }}
                                  >
                                    <VuiBox display="flex" justifyContent="space-between" mb={1}>
                                      <VuiTypography variant="button" color="text" fontWeight="regular">
                                        {t("debts.detail.totalAmount")}:
                                      </VuiTypography>
                                      <VuiTypography variant="button" color="white" fontWeight="bold">
                                        {transaction.amount} DA
                                      </VuiTypography>
                                    </VuiBox>

                                    <VuiBox display="flex" justifyContent="space-between" mb={1}>
                                      <VuiTypography variant="button" color="text" fontWeight="regular">
                                        {t("debts.detail.discount")}:
                                      </VuiTypography>
                                      <VuiTypography variant="button" color="error" fontWeight="bold">
                                        -{transaction.discount}%
                                      </VuiTypography>
                                    </VuiBox>

                                    <VuiBox display="flex" justifyContent="space-between" mb={1}>
                                      <VuiTypography variant="button" color="text" fontWeight="regular">
                                        {t("debts.detail.netAmount")}:
                                      </VuiTypography>
                                      <VuiTypography variant="button" color="success" fontWeight="bold">
                                        {transaction.netAmount} DA
                                      </VuiTypography>
                                    </VuiBox>

                                    <Divider sx={{ my: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />

                                    <VuiBox display="flex" justifyContent="space-between">
                                      <VuiTypography variant="button" color="text" fontWeight="regular">
                                        {t("debts.detail.commission")}:
                                      </VuiTypography>
                                      <VuiTypography variant="button" color="warning" fontWeight="bold">
                                        {transaction.amount - transaction.netAmount} DA
                                      </VuiTypography>
                                    </VuiBox>
                                  </VuiBox>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                  <VuiBox>
                                    <VuiBox
                                      display="inline-flex"
                                      px={2}
                                      py={0.5}
                                      mb={1}
                                      borderRadius="xl"
                                      bgColor="info"
                                    >
                                      <VuiTypography variant="caption" color="white" fontWeight="medium">
                                        {transaction.paymentMethod}
                                      </VuiTypography>
                                    </VuiBox>
                                    <VuiTypography variant="caption" color="text" display="block">
                                      {moment(transaction.paidAt).format("DD/MM/YYYY")}
                                    </VuiTypography>
                                    <VuiTypography variant="caption" color="text">
                                      {moment(transaction.paidAt).format("HH:mm")}
                                    </VuiTypography>
                                  </VuiBox>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                  <VuiBox display="flex" justifyContent="flex-end">
                                    <VuiBox
                                      display="inline-flex"
                                      px={2}
                                      py={0.5}
                                      borderRadius="xl"
                                      bgColor={transaction.status === "PAID" ? "success" : "warning"}
                                    >
                                      <VuiTypography variant="caption" color="white" fontWeight="medium">
                                        {transaction.status}
                                      </VuiTypography>
                                    </VuiBox>
                                  </VuiBox>
                                </Grid>
                              </Grid>
                            </VuiBox>
                            {index < data.transactions.length - 1 && (
                              <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.1)" }} />
                            )}
                          </React.Fragment>
                        ))}
                      </VuiBox>
                    </Card>
                  </Grid>
                </Grid>
              </VuiBox>

              <PaymentDialog open={open} onClose={handleClose} debt={paymentData} />

              {/* Action Button */}
              {data.status === "PENDING" && (
                <VuiBox p={3} display="flex" justifyContent="flex-end">
                  <VuiButton
                    color="success"
                    variant="contained"
                    onClick={handleOpen}
                    startIcon={<MdOutlinePayment size={24} color="#fff" />}
                  >
                    {t("debts.detail.payNow")}
                  </VuiButton>
                </VuiBox>
              )}
            </>
          )}
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default DebtDetail;


