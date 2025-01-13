import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Avatar, Box } from '@mui/material';
import VuiTypography from 'components/VuiTypography';
import VuiButton from 'components/VuiButton';
import VuiBadge from 'components/VuiBadge';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import colors from 'assets/theme/base/colors';
import borders from 'assets/theme/base/borders';
import boxShadows from 'assets/theme/base/boxShadows';

const { black, gradients } = colors;
const { card } = gradients;

function MakeAdmin({ open, handleClose, selectedTeacher, MakeTeacherAdmin, UnMakeTeacherAdmin }) {
    const { t } = useTranslation();

    return (
        <Dialog
            sx={({ functions: { linearGradient } , borders: { borderWidth, borderRadius }, boxShadows: { xxl } }) => ({
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
                    border: `${borderWidth[0]} solid ${black.main}`,
                    borderRadius: borderRadius.xl,
                    boxShadow: xxl,
                },
            })}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle color="#ffffff" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {t("popup.title", { name: selectedTeacher?.firstName || t("popup.defaultName") })}
            </DialogTitle>

            <DialogContent>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={selectedTeacher?.profilePic?.url || ""}
                        alt={selectedTeacher?.firstName || "User"}
                        sx={{
                            width: 150,
                            height: 150,
                            marginRight: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                    />
                    <Box>
                        <VuiTypography variant="subtitle2" color="white">
                            <b>{t("popup.fullName")}</b>: {selectedTeacher?.firstName} {selectedTeacher?.lastName}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.subject")}</b>: {t(`subjects.${selectedTeacher?.Teacher?.subject}`)}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.email")}</b>: {selectedTeacher?.email || t("popup.noEmail")}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("popup.phone")}</b>: {selectedTeacher?.phone || t("popup.noPhone")}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("forms.institution")}</b>: {selectedTeacher?.Teacher?.institution}
                        </VuiTypography>
                        <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                            <b>{t("forms.dateOfJoining")}</b>: {moment(selectedTeacher?.createdAt).format("DD/MM/YYYY")}
                        </VuiTypography>

                        <VuiBadge
                            variant="standard"
                            badgeContent={t(`profile.card.${selectedTeacher.isEmailVerified ? "Verified" : "unVerified"}`)}
                            color="success"
                            size="xs"
                            container
                            sx={({ palette: { white, success, warning }, borders: { borderRadius, borderWidth } }) => ({
                                background: selectedTeacher.isEmailVerified ? success.main : warning.main,
                                border: `${borderWidth[1]} solid ${selectedTeacher.isEmailVerified ? success.main : warning.main}`,
                                borderRadius: borderRadius.md,
                                color: white.main,
                            })}
                        />
                    </Box>
                </Box>

                <VuiTypography variant="body1" color="white">
                    {selectedTeacher.role === "TEACHER" ? t("popup.teachers.description.makeAdmin") : t("popup.teachers.description.unMakeAdmin")}
                </VuiTypography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
                <VuiButton
                    onClick={() => selectedTeacher.role === "TEACHER" ? MakeTeacherAdmin(false) : UnMakeTeacherAdmin(false)}
                    color="error"
                    sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
                >
                    {t("button.cancel")}
                </VuiButton>
                <VuiButton
                    onClick={() => selectedTeacher.role === "TEACHER" ? MakeTeacherAdmin(true) : UnMakeTeacherAdmin(true)}
                    color="success"
                    sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
                >
                    {t("button.confirm")}
                </VuiButton>
            </DialogActions>
        </Dialog>
    );
}

export default MakeAdmin;