import React, { useState } from "react";
import { Avatar, Box, Card, Popover, Typography, MenuItem } from "@mui/material";
import welcome from "assets/images/welcome-profile.png";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { FaRegEdit } from "react-icons/fa";
import avatar1 from "assets/images/avatar1.png";
import VuiButton from "components/VuiButton";
import colors from "assets/theme/base/colors";
import { useTranslation } from "react-i18next";

const { dark } = colors;

const Welcome = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Popover state
  const [image, setImage] = useState(avatar1); // State to store the image
  const [selectedFile, setSelectedFile] = useState(null); // To keep track of the selected file
	const { t } = useTranslation();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set the element that opens the popover
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const open = Boolean(anchorEl); // Check if the popover is open

  const handleUpdate = () => {
    // Trigger file input when "Update Picture" is clicked
    document.getElementById("file-input").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create an object URL to display the image
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
      handleClose(); // Close popover after selecting the image
    }
  };

  const handleDelete = () => {
    setImage(avatar1); // Reset to default image
    handleClose();
  };

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
            {t('profile.welcome')}
          </VuiTypography>
          <VuiTypography color="white" variant="button" fontWeight="regular">
          {t('profile.description')}
          </VuiTypography>
        </VuiBox>
      </VuiBox>
      <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Avatar sx={{ width: "70%", height: "75%" }} src={image} />
          <VuiButton
            style={{
              position: "absolute",
              width: "10px",
              right: "20%",
              bottom: 0,
            }}
            color="info"
            onClick={handleOpen}
          >
            <FaRegEdit />
          </VuiButton>

          {/* Popover for update/delete options */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
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
              <MenuItem onClick={handleUpdate}>Update Picture</MenuItem>
              <MenuItem onClick={handleDelete}>Delete Picture</MenuItem>
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
    </Card>
  );
};

export default Welcome;
