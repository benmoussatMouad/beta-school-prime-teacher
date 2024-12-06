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
import { Popover } from "@mui/material";
import { useState } from "react";
import colors from "../../../../assets/theme/base/colors";
import borders from "../../../../assets/theme/base/borders";
import boxShadows from "../../../../assets/theme/base/boxShadows";
import linearGradient from "../../../../assets/theme/functions/linearGradient";
import rgba from "../../../../assets/theme/functions/rgba";
import { useTranslation } from "react-i18next";

const { black, white, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;


function ChapterCard({ image, label, title, description, action, duration, id, ressources }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <VuiBox
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <VuiBox
        component="img"
        src={image}
        mb="8px"
        borderRadius="15px"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            height: "200px",
          },
        })}
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
          <VuiButton
            variant="outlined"
            size="small"
            color={action.color}
            onClick={handleClick}
          >
            {action.label}
          </VuiButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={(theme) => {
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
                  borderRadius: borderRadius.xl,
                  boxShadow: xxl,
                },
              };
            }}
          >
            {ressources.map(el => <VuiBox
              key={el}
              sx={{
                border: `${borderWidth[1]} solid ${white.main}`,
                borderRadius: borderRadius.xl,
                padding: "0.5em",
              }}>
              <VuiTypography variant={"caption"} color={"white"} sx={{ p: 2 }}>PDF {el}</VuiTypography>
              <VuiButton color={"info"} size={"small"}> {t("demands.table.view")} </VuiButton>
            </VuiBox>)}
          </Popover>
          <VuiBox display="flex">
            <VuiTypography variant={"caption"} color={"white"}>
              {duration}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}


export default ChapterCard;
