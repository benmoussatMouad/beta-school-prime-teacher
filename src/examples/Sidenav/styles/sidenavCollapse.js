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

function collapseItem(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav } = ownerState;

  const { transparent, white, sidenav } = palette;
  const { xxl } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: active ? sidenav.button : transparent.main,
    color: white.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(10.8)} ${pxToRem(12.8)} ${pxToRem(10.8)} ${pxToRem(16)}`,
    margin: `0 ${pxToRem(16)}`,
    borderRadius: borderRadius.lg,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: active && transparentSidenav ? xxl : "none",
    [breakpoints.up("xl")]: {
      boxShadow: () => {
        if (active) {
          return transparentSidenav ? xxl : "none";
        }

        return "none";
      },
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}

function collapseIconBox(theme, ownerState, role, isAdmin) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, color } = ownerState;

  const { white, info, gradients, transparent, sidenav } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: (active) => {
      if (active) {
        return color === "default" ? white.button : sidenav.button;
      }
      return sidenav.button;
    },
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    borderRadius: borderRadius.button,
    display: "grid",
    placeItems: "center",
    boxShadow: md,
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    [breakpoints.up("xl")]: {
      background: () => {
        let background;

        if (!active) {
          background = sidenav.button;
        } else if (color === "default") {
          background = info.main;
        } else if (color === "warning") {
          background = gradients.warning.main;
        } else {
          background = palette[color].main;
        }

        return background;
      },
    },

    backgroundColor: active ? palette[color].main : transparent.main,
    "& svg, svg g": {
      fill: active ? white.main : (role === "ROOT" && isAdmin ? palette.success.light : role === "ADMIN" && isAdmin ? "#F883DD" : palette.info.main),
    },
  };
}

const collapseIcon = ({ palette: { white, gradients, success, primary } }, { active, role, isAdmin }) => ({
  color: role === "ROOT" && isAdmin ? success.main : role === "ADMIN" && isAdmin ? primary.main : active ? white.main : gradients.dark.state,
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(12.8),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav || miniSidenav ? 0 : 1,
      maxWidth: miniSidenav || miniSidenav ? 0 : "100%",
      marginLeft: miniSidenav || miniSidenav ? 0 : pxToRem(12.8),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
    },
  };
}

export { collapseItem, collapseIconBox, collapseIcon, collapseText };
