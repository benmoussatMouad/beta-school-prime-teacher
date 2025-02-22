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

import { useEffect } from "react";

// react-router-dom components
import { NavLink, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

import logo from "assets/images/logos/logo-v2-gradient.svg";
import logoLong from "assets/images/logos/logo-large.png";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Vision UI Dashboard React context
import { setMiniSidenav, setTransparentSidenav, useVisionUIController } from "context";
import { useTranslation } from "react-i18next";
import VuiButton from "../../components/VuiButton";
import { getRefreshToken } from "../../utils";
import { useLogout } from "../../api";
import VuiBadge from "../../components/VuiBadge";

// Vision UI Dashboard React icons

// function Sidenav({ color, brand, brandName, routes, ...rest }) {
function Sidenav({ color, brandName, routes, user, ...rest }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const { mutate } = useLogout();

  const { t } = useTranslation();
  const closeSidenav = () => setMiniSidenav(dispatch, true);

  const logout = async () => {
    const refreshToken = getRefreshToken();
    mutate(refreshToken);
  };

  const role = user?.user?.role || null;

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /**
     The event listener that's calling the handleMiniSidenav function when resizing the window.
     */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  useEffect(() => {
    if (window.innerWidth < 1440) {
      setTransparentSidenav(dispatch, false);
    }
  }, []);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, icon, noCollapse, key, route, href, isAdmin, isRoot, isTitle, isNotRoot, onlyAdmin }) => {
    let returnValue;


    if (type === "collapse") {

      if (isNotRoot && role === "ROOT") {
        return null;
      }

      if (isRoot && role !== "ROOT") {
        return null;
      }

      if (onlyAdmin && role === "ROOT") {
        return null;
      }

      if (isAdmin && role !== "ADMIN" && role !== "ROOT") {
        return null; // Don't render this route if it's an admin-only route and the user doesn't have 'ADMIN' or 'ROOT' role
      }
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            color={color}
            name={t(`routes.${key}`)}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
            role={role}
            isAdmin={isAdmin || isRoot}
          />
        </Link>
      ) : (
        <NavLink to={route} key={key}>
          <SidenavCollapse
            color={color}
            key={key}
            name={t(`routes.${key}`)}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
            role={role}
            isAdmin={isAdmin || isRoot}
          />
        </NavLink>
      );
    } else if (type === "title") {
      if (isTitle) {
        if (role === "TEACHER") {
          return null;
        }

        if (role === "ADMIN" && !isAdmin) {
          return null;
        }
      }

      returnValue = (
        <VuiTypography
          key={key}
          color="white"
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {t(`routes.${key}`)}
        </VuiTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider light key={key} />;
    } else if (type === "route") {
      return "";
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <VuiBox
        pt={3.5}
        pb={0.5}
        px={4}
        textAlign="center"
        sx={{
          overflow: "unset !important",
        }}
      >
        <VuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <VuiTypography variant="h6" color="text">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </VuiTypography>
        </VuiBox>
        <VuiBox component={NavLink} to="/" display="flex" alignItems="center">
          <VuiBox
            sx={
              ((theme) => sidenavLogoLabel(theme, { miniSidenav }),
              {
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              })
            }
          >
            <VuiBox

              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <img src={logo} style={{ width: "64px" }} alt={"beta-logo"} />
              <img src={logoLong} style={{ width: "180px" }} alt={"beta-logo"} />
              <VuiBadge
                sx={(theme) => ({ position: "relative", top: "-40px", right: `${theme.direction === "ltr" ? "-70px" : "70px"}`, fontSize: "15px !important" })}
                badgeContent={"online"} color="info" />
              <VuiTypography variant="h6" color="white" fontWeight="bold" textTransform="uppercase">
                {t("platformForTeachers")}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <Divider light />
      <List>{renderRoutes}</List>
      <VuiBox
        my={2}
        mx={2}
        mt="auto"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            pt: 2,
          },
          [breakpoints.only("xl")]: {
            pt: 1,
          },
          [breakpoints.down("xl")]: {
            pt: 2,
          },
        })}
      >
        <VuiBox mt={2}>
          <VuiButton
            color={'error'}
            onClick={logout}
            rel="noreferrer"
            variant="gradient"
            circular
            fullWidth
          >
            <Icon>logout</Icon>
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </SidenavRoot>
  );
}


export default Sidenav;
