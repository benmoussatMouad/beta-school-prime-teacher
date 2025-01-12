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
import { useConfirmPayment } from "../../api/admin/confirmPayment";
import moment from "moment/moment";
import VuiBadge from "components/VuiBadge";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function PaymentDialog({ open, onClose, debt }) {
    const { t } = useTranslation();
    const { mutate: confirmPayment, isLoading } = useConfirmPayment(debt?.id);

    const onConfirmPayment = () => {
        confirmPayment({ teacherId: debt.teacherId, debtId: debt.id }, {
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
                {t("popup.payment.title", { name: debt?.teacher?.user?.firstName || debt?.teacherName  || t("popup.defaultName") })}
            </DialogTitle>

            <DialogContent>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={debt?.teacher?.user?.profilePic?.url || debt?.profilePic || ""}
                        alt={debt?.teacher?.user?.firstName || debt?.teacherName || "User"}
                        sx={{
                            width: 150,
                            height: 150,
                            marginRight: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                    />
                    <Box>
                        <VuiTypography variant="subtitle2" color="white">
                            <b>{t("popup.fullName")}</b>: {debt?.teacherName} {debt?.teacher?.user?.firstName} {debt?.teacher?.user?.lastName}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.subject")}</b>: {t(`subjects.${debt?.teacher?.subject || debt?.subject}`)}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.wilaya")}</b>: {t(`wilaya.${debt?.teacher?.wilaya || debt?.wilaya}`)}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.email")}</b>: {debt?.teacher?.user?.email || debt?.email}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.phone")}</b>: {debt?.teacher?.user?.phone || debt?.phone}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.debt")}</b>:{" "}
                            <VuiBadge
                                variant="standard"
                                badgeContent={`${debt?.amount} DA`}
                                size="xs"
                                container
                                sx={({ palette: { white, success, error }, borders: { borderRadius, borderWidth } }) => ({
                                    background: debt?.status === 'PENDING' ? error.main : success.main,
                                    border: `${borderWidth[1]} solid ${debt?.status === 'PENDING' ? error.main : success.main}`,
                                    borderRadius: borderRadius.md,
                                    color: white.main,
                                    display: "inline-block",
                                    marginLeft: "8px"
                                })}
                            />
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.debtDescription")}</b>: {debt?.description}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.debtCreatedAt")}</b>: {moment(debt?.createdAt).format("DD/MM/YYYY")}
                        </VuiTypography>
                    </Box>
                </Box>

                <VuiTypography variant="body1" color="white">
                    {t("popup.payment.confirmation")}
                </VuiTypography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
                <VuiButton
                    onClick={onClose}
                    color="error"
                    sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
                    disabled={isLoading}
                >
                    {t("button.cancel")}
                </VuiButton>
                <VuiButton
                    onClick={onConfirmPayment}
                    color="success"
                    sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
                    disabled={isLoading}
                >
                    {isLoading ? t("button.processing") : t("button.confirm")}
                </VuiButton>
            </DialogActions>
        </Dialog>
    );
}

export default PaymentDialog;