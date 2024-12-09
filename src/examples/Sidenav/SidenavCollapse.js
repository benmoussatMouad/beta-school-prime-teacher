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

// prop-types is a library for typechecking of props.

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Custom styles for the SidenavCollapse
import { collapseIcon, collapseIconBox, collapseItem, collapseText } from "examples/Sidenav/styles/sidenavCollapse";

// Vision UI Dashboard React context
import { useVisionUIController } from "context";

function SidenavCollapse({ color, icon, name, children, active, noCollapse, isAdmin, open, role, ...rest }) {
  const [controller] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;

  return (
    <>
      <ListItem component="li">
        <VuiBox {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, color }, role, isAdmin)}
          >
            {typeof icon === "string" ? (
              <Icon
                sx={(theme) =>
                  collapseIcon(theme, {
                    active,
                    role,
                    isAdmin,
                  })
                }
              >
                {icon}
              </Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => collapseText(theme, { miniSidenav, transparentSidenav, active })}
          />
        </VuiBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}


export default SidenavCollapse;
