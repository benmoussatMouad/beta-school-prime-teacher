import Popper from "@mui/material/Popper/BasePopper";
import Grid from "@mui/material/Grid";
import rgba from "../../assets/theme/functions/rgba";
import Avatar from "@mui/material/Avatar";

import icon1 from "assets/images/icons/magazine_3829323.png";
import icon2 from "assets/images/icons/online-class_6988471.png";
import icon3 from "assets/images/icons/online-course_3344794.png";
import icon4 from "assets/images/icons/online-course_3829284.png";
import icon5 from "assets/images/icons/pie-charts_3829291.png";
import icon6 from "assets/images/icons/teacher_8388500.png";
import icon7 from "assets/images/icons/training-course_6988584.png";
import icon8 from "assets/images/icons/tutor_5910072.png";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";


const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];

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