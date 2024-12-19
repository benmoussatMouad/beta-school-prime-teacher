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

// react-router-dom components


// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { Dialog, DialogActions, DialogContent, DialogTitle, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import colors from "../../../../assets/theme/base/colors";
import borders from "../../../../assets/theme/base/borders";
import boxShadows from "../../../../assets/theme/base/boxShadows";
import linearGradient from "../../../../assets/theme/functions/linearGradient";
import rgba from "../../../../assets/theme/functions/rgba";
import { useTranslation } from "react-i18next";
import { MdDelete, MdEdit, MdPlayArrow } from "react-icons/md";
import { useDeleteChapter } from "../../../../api/chapters/deleteChapter";
import { saveAs } from "file-saver";
import { useDeleteAttachment } from "../../../../api/chapters/deleteAttachment";
import bgCard from "assets/images/welcome-profile.png"
import backgroundImage from "../../../../assets/images/sidenav/sidenav-card-background.png";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

const { black, white, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;


function ChapterCard(
  {
    image,
    label,
    title,
    description,
    action,
    duration,
    id,
    ressources,
    openToEdit,
    myOwnCourse,
    openToView,
  }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();

  const { mutate } = useDeleteChapter(id);
  const { mutate: deleteAttachment } = useDeleteAttachment();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  // Open the confirmation dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Close the confirmation dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Perform the delete action
  const handleDelete = async () => {
    mutate(id, {
      onSuccess: () => {
        setIsDialogOpen(false); // Close the dialog on success
      },
      onError: () => {
        setIsDialogOpen(false);
      },
    });
  };

  const handleDeleteAttachment = (attachmentId) => {
    deleteAttachment({ chapterId: id, attachmentId });
  };

  return (
    <VuiBox
      sx={{
        background: `url(${bgCard})`,
        padding: "10px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "visible",
        position: "relative",
      }}
    >
      {myOwnCourse && <VuiButton
        onClick={() => openToEdit(id)}
        color={"success"}
        variant={"contained"}
        sx={{ position: "absolute", top: "10px", left: "10px", zIndex: 100 }}
        size={"md"}
      >
        <MdEdit />
      </VuiButton>}
      {myOwnCourse && <VuiButton
        onClick={handleOpenDialog} // Open dialog on click
        color={"error"}
        size={"md"}
        variant={"contained"}
        sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 100 }}
      >
        <MdDelete />
      </VuiButton>}
      <VuiButton
        onClick={() => openToView(id)} // Open dialog on click
        color={"info"}
        size={"md"}
        variant={"text"}
        sx={{
          position: "absolute", top: "25%", right: "50%", transform: "translate(50%, -50%)", "&:hover": {
            transform: "translate(50%, -50%)",
          }, zIndex: 100,
        }}
      >
        <FaPlay size={"45px"} sx={{ position: "relative", top: "-50%", right: "-50%" }} />
      </VuiButton>
      <VuiBox
        component="img"
        src={image}
        mb="8px"
        borderRadius="15px"

      />
      <VuiBox
        sx={({ breakpoints }) => ({
          [breakpoints.only("xl")]: {
            minHeight: "200px",
          },
        })}
      >
        <VuiBox>
          <VuiTypography variant="xxs" color="text" fontWeight="medium" textTransform="capitalize">
            {label}
          </VuiTypography>
        </VuiBox>
        <VuiBox mb={1}>
          <VuiTypography
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            color="white"
            variant="h5"
            textTransform="capitalize"
          >
            {title}
          </VuiTypography>
        </VuiBox>
        <VuiBox mb={3} lineHeight={0}>
          <VuiTypography variant="button" fontWeight="regular" color="text">
            {description}
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" justifyContent="space-between" alignItems="center">
          {!ressources.length ? "" : <VuiButton
            variant="contained"
            size="small"
            color={action.color}
            onClick={handleClick}
          >
            {action.label}
          </VuiButton>}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={() => {
              return {
                "& .MuiPopover-paper": {
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                  background: linearGradient(card.main, card.state, card.deg),
                  backdropFilter: "blur(120px)",
                  minWidth: 0,
                  padding: "10px",
                  wordWrap: "break-word",
                  backgroundClip: "border-box",
                  border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
                  borderRadius: "8px",
                  boxShadow: xxl,
                },
              };
            }}
          >
            {!ressources.length ? "" : ressources?.map(el => <VuiBox
              key={el.id}
              sx={{
                border: `${borderWidth[1]} solid ${white.main}`,
                borderRadius: "8px",
                padding: "0.5em",
              }}>
              <VuiTypography variant={"caption"} color={"white"} sx={{ p: 2 }}>{el?.file?.fileName} </VuiTypography>
              <VuiButton color={"info"} size={"small"} onClick={() => {
                saveAs(el?.file?.url, el?.file?.fileName);
              }}>
                {t("demands.table.view")}
              </VuiButton>
              {myOwnCourse && <VuiButton variant={"text"} color={"error"} size={"large"} onClick={() => {
                handleDeleteAttachment(el.id);
              }}>
                <MdDelete />
              </VuiButton>}
            </VuiBox>)}
          </Popover>
          <VuiBox sx={{ textAlign: "right", width: "100%" }} display="flex" alignSelf="center"
                  justifyContent="flex-end">
            <VuiTypography variant={"caption"} color={"white"}>
              {duration} {t("minute")}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      {/* Confirmation Dialog */}
      <Dialog sx={({}) => ({
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
      })} open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle color={"#ffffff"}>{t("dialog.deleteCourse.title")}</DialogTitle>
        <DialogContent>
          <Typography color={"#ffffff"}>{t("dialog.deleteCourse.description")}</Typography>
        </DialogContent>
        <DialogActions>
          {/* Cancel Button */}
          <VuiButton onClick={handleCloseDialog} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          {/* Confirm Delete Button */}
          <VuiButton onClick={handleDelete} color="error">
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>
    </VuiBox>
  );
}


export default ChapterCard;
