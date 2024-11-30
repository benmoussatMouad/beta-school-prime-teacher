import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, Popover, Typography, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import welcome from "assets/images/welcome-profile.png";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { FaRegEdit } from "react-icons/fa";
import avatar1 from "assets/images/avatar1.png";
import VuiButton from "components/VuiButton";
import { useTranslation } from "react-i18next";
import { useAuth } from "context/auth/authContext";
import { useUpdateProfile } from "api";
import colors from "assets/theme/base/colors";
import linearGradient from "assets/theme/functions/linearGradient";
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";
import rgba from "assets/theme/functions/rgba";
import { getEnvSafely } from "utils";
import { useDeleteAvatar } from "api/teacher/deleteAvatar";

const { black, gradients, dark } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

const Welcome = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null); // Popover state
  const [image, setImage] = useState(user?.user?.profilePic || null); // State to store the image
  const [selectedFile, setSelectedFile] = useState(null); // To keep track of the selected file
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const { t } = useTranslation();
  const { mutate } = useUpdateProfile();
  const { mutate: deletAvatarMutate } = useDeleteAvatar();
  const [avatarUrl, setAvatarUrl] = useState(user?.user?.profilePic?.url || image);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget); // Set the element that opens the popover
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Close the popover
  };

  const openPopover = Boolean(anchorEl); // Check if the popover is open

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create an object URL to display the image
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setOpenDialog(true); // Open the confirmation dialog after selecting a file
      handleClosePopover(); // Close popover after selecting the image
    }
  };

  const handleDelete = () => {
    deletAvatarMutate();
    setImage(null); // Reset to default image
    setOpenDeleteDialog(false); // Close delete confirmation dialog
    handleClosePopover(); // Close popover
  };

  const handleUpdateProfilePicture = () => {
    if (selectedFile && selectedFile instanceof File) {
      const formData = new FormData();
      formData.append("profilePic", selectedFile);
      mutate(formData); // Upload the image only if confirmed
    }
  };

  const handleConfirmDialogClose = (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      handleUpdateProfilePicture(); // Upload the image if confirmed
    }
  };

  const handleDeleteDialogClose = (confirmed) => {
    if (confirmed) {
      handleDelete(); // Proceed with deleting the image
    } else {
      setOpenDeleteDialog(false); // Close the delete confirmation dialog
    }
  };

  const publicUrl = getEnvSafely("REACT_APP_API_URL");

  useEffect(() => {
    if (user?.user?.profilePic?.url) {
      setAvatarUrl(`${user.user.profilePic.url}`);
    }
  }, [user?.user?.profilePic?.url]);

  return (
    <Card
      sx={({ breakpoints }) => ({
        background: `url(${welcome})`,
        backgroundSize: "cover",
        borderRadius: "20px",
        height: "100%",
        [breakpoints.only("xl")]: {
          gridArea: "1 / 1 / 2 / 2",
        },
      })}
    >
      <VuiBox display="flex" flexDirection="column">
        <VuiBox display="flex" flexDirection="column">
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="3px">
            {t("profile.welcome")}
          </VuiTypography>
          <VuiTypography color="white" variant="button" fontWeight="regular">
            {t("profile.description")}
          </VuiTypography>
        </VuiBox>
      </VuiBox>
      <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "70%", height: "210px" }}>
          <Avatar sx={{ width: "100%", height: "100%", '& img': { height: "100%", objectFit: 'cover' } }} src={avatarUrl} />
          <VuiButton
            style={{
              position: "absolute",
              width: "10px",
              right: "20%",
              bottom: 0,
            }}
            color="info"
            onClick={handleOpenPopover}
          >
            <FaRegEdit />
          </VuiButton>

          {/* Popover for update/delete options */}
          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <VuiBox bgColor={dark.body} style={{ borderRadius: "10px", padding: "5px" }} p={2}>
              <MenuItem onClick={() => document.getElementById("file-input").click()}>Update Picture</MenuItem>
              <MenuItem onClick={() => setOpenDeleteDialog(true)}>Delete Picture</MenuItem>
            </VuiBox>
          </Popover>
        </Box>
      </Box>

      {/* Hidden file input for image selection */}
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Update Picture Confirmation Dialog */}
      <Dialog
        sx={({ breakpoints, theme }) => ({
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: "column",
            background: linearGradient(card.main, card.state, card.deg),
            backdropFilter: "blur(120px)",
            position: "relative",
            minWidth: 0,
            padding: "22px",
            wordWrap: "break-word",
            backgroundClip: "border-box",
            border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
            borderRadius: borderRadius.xl,
            boxShadow: xxl,
          },
        })}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle color={"#ffffff"}>{t("dialog.title")}</DialogTitle>
        <DialogContent>
          <Typography color={"#ffffff"}>{t("dialog.description")}</Typography>
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={() => handleConfirmDialogClose(false)} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          <VuiButton onClick={() => handleConfirmDialogClose(true)} color="info">
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>

      {/* Delete Picture Confirmation Dialog */}
      <Dialog
        sx={({ breakpoints, theme }) => ({
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: "column",
            background: linearGradient(card.main, card.state, card.deg),
            backdropFilter: "blur(120px)",
            position: "relative",
            minWidth: 0,
            padding: "22px",
            wordWrap: "break-word",
            backgroundClip: "border-box",
            border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
            borderRadius: borderRadius.xl,
            boxShadow: xxl,
          },
        })}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle color={"#ffffff"}>{t("dialog.title")}</DialogTitle>
        <DialogContent>
          <Typography color={"#ffffff"}>{t("dialog.description")}</Typography>
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={() => handleDeleteDialogClose(false)} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          <VuiButton onClick={() => handleDeleteDialogClose(true)} color="info">
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Welcome;
