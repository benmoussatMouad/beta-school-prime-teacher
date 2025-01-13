import React from "react";
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import VuiButton from "../../components/VuiButton";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import VuiTypography from "../../components/VuiTypography";
import { useTranslation } from "react-i18next";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useCancelStudentTransaction } from "api/admin/cancelStudentTransaction";
import VuiBadge from "components/VuiBadge";
import moment from "moment";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function CancelTransactionDialog({ open, onClose, transaction }) {
    const { t } = useTranslation();
    const { mutate: cancelTransaction, isLoading } = useCancelStudentTransaction(transaction?.id);

    const onCancelTransaction = () => {
        cancelTransaction({ transactionId: transaction.id }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={({ breakpoints }) => ({
                "& .MuiDialog-paper": {
                    display: "flex",
                    flexDirection: "column",
                    background: linearGradient(card.main, card.state, card.deg),
                    backdropFilter: "blur(120px)",
                    position: "relative",
                    minWidth: 600,
                    padding: "22px",
                    wordWrap: "break-word",
                    backgroundClip: "border-box",
                    border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
                    borderRadius: borderRadius.xl,
                    boxShadow: xxl,
                    [breakpoints.up("md")]: { minWidth: 700 },
                },
            })}
        >
            <DialogTitle color="#ffffff" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {t("popup.cancel.title", { name: transaction?.student?.user?.firstName || t("popup.defaultName") })}
            </DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={transaction?.student?.user?.profilePic?.url || ""}
                        alt={transaction?.student?.user?.firstName || "User"}
                        sx={{
                            width: 150,
                            height: 150,
                            marginRight: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                    />
                    <Box>
                        <VuiTypography variant="subtitle2" color="white">
                            <b>{t("popup.student")}</b>: {transaction?.student?.user?.firstName} {transaction?.student?.user?.lastName}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.course")}</b>: {transaction?.course?.title}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.teacher")}</b>: {transaction?.course?.teacher?.user?.firstName} {transaction?.course?.teacher?.user?.lastName}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.email")}</b>: {transaction?.student?.user?.email}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.phone")}</b>: {transaction?.student?.user?.phone}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.amount")}</b>:{" "}
                            <VuiBadge
                                variant="standard"
                                badgeContent={`${transaction?.amount} DA`}
                                size="xs"
                                container
                                sx={({ palette: { white, success, error }, borders: { borderRadius, borderWidth } }) => ({
                                    background: transaction?.status === 'PENDING' ? error.main : success.main,
                                    border: `${borderWidth[1]} solid ${transaction?.status === 'PENDING' ? error.main : success.main}`,
                                    borderRadius: borderRadius.md,
                                    color: white.main,
                                    display: "inline-block",
                                    marginLeft: "8px"
                                })}
                            />
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.discount")}</b>: {transaction?.discount}%
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.netAmount")}</b>: {transaction?.netAmount} DA
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.createdAt")}</b>: {moment(transaction?.createdAt).format("DD/MM/YYYY")}
                        </VuiTypography>
                    </Box>
                </Box>
                <VuiTypography variant="body1" color="white">
                    {t("popup.payment.cancel")}
                </VuiTypography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }} >
                <VuiButton
                    color="error"
                    sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
                    variant="contained"
                    disabled={isLoading}
                    onClick={onClose}
                >
                    {t("popup.cancel.cancel")}
                </VuiButton>
                <VuiButton
                    variant="contained"
                    color="success"
                    sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
                    disabled={isLoading}
                    onClick={onCancelTransaction}
                >
                    {t("popup.cancel.confirm")}
                </VuiButton>
            </DialogActions>
        </Dialog>
    );
}

export default CancelTransactionDialog;