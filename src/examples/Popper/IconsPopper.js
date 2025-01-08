import Popper from "@mui/material/Popper/BasePopper";
import Grid from "@mui/material/Grid";
import rgba from "../../assets/theme/functions/rgba";
import Avatar from "@mui/material/Avatar";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";


const { black } = colors;
const { borderRadius } = borders;

function PopperIcon(
  {
    isPopperOpen,
    popperAnchor,
    handlePopperClose,
    handlePredefinedIconClick,
    watch,
    icons
  }) {
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
      {icons.map((icon) => (
        <Grid
          item
          xs={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          key={icon.id}
        >
          <Avatar
            src={icon.file.url}
            onClick={() => handlePredefinedIconClick(icon.file.url, icon.file.id)}
            sx={{
              width: 60,
              height: 60,
              cursor: "pointer",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: watch("icon")?.name === icon.fileName
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
