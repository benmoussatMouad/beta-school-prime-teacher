import Popper from "@mui/material/Popper/BasePopper";
import Grid from "@mui/material/Grid";
import rgba from "../../assets/theme/functions/rgba";
import Avatar from "@mui/material/Avatar";

import icon1 from "assets/images/icons/Analyze-Data-1--Streamline-Brooklyn.png";
import icon2 from "assets/images/icons/Analyze-Data-4--Streamline-Brooklyn.png";
import icon3 from "assets/images/icons/Analyze-Data-3--Streamline-Brooklyn.png";
import icon4 from "assets/images/icons/Analyze-Data-6--Streamline-Brooklyn.png";
import icon5 from "assets/images/icons/Audit--Streamline-Brooklyn.png";
import icon6 from "assets/images/icons/Deadline--Streamline-Brooklyn.png";
import icon7 from "assets/images/icons/Dna-2--Streamline-Brooklyn.png";
import icon8 from "assets/images/icons/Lab-Experiment-4--Streamline-Brooklyn.png";
import icon10 from "assets/images/icons/Microscope-1--Streamline-Brooklyn.png";
import icon11 from "assets/images/icons/Microscope-3--Streamline-Brooklyn.png";
import icon12 from "assets/images/icons/Online-Learning-2--Streamline-Brooklyn.png";
import icon13 from "assets/images/icons/Team-Success-4--Streamline-Brooklyn.png";
import icon14 from "assets/images/icons/Partnership--Streamline-Brooklyn.png";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";


const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon10, icon11, icon12, icon13, icon14,];

const { black } = colors;
const { borderRadius } = borders;

function PopperIcon(
  {
    isPopperOpen,
    popperAnchor,
    handlePopperClose,
    handlePredefinedIconClick,
    watch,
  }){
  return <Popper
    open={isPopperOpen}
    anchorEl={popperAnchor}
    placement="bottom"
    disablePortal={true}
    modifiers={[
      {
        name: "preventOverflow",
        options: {
          boundary: "viewport",
        },
      },
    ]}
    onMouseLeave={handlePopperClose}
    style={{ zIndex: 5 }}
  >
    <Grid sx={{
      width: "85%",
      margin: "auto",
      pointerEvents: "auto", // Allow interaction inside the Popper
      backgroundColor: rgba(black.main, 0.4), // Set the background color for the Popper
      padding: "16px", // Add padding to Popper content
      borderRadius: borderRadius.md, // Add border radius for rounded edges
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)", // Add shadow for visual depth
    }} container spacing={2}>
      {icons.map((icon, index) => (
        <Grid
          item
          xs={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          key={index}
        >
          <Avatar
            src={icon}
            onClick={() => handlePredefinedIconClick(icon, index)}
            sx={{
              width: 60,
              height: 60,
              cursor: "pointer",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: watch("icon")?.name === `icon${index + 1}.png`
                ? "2px solid #4caf50"
                : "2px solid transparent",
            }}
          />
        </Grid>
      ))}
    </Grid>
  </Popper>;
}

export default PopperIcon;
