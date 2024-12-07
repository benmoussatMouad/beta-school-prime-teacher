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

import React, { useMemo } from "react";

// prop-types is a library for typechecking of props
// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiAvatar from "components/VuiAvatar";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";


const StyledTableContainer = styled(TableContainer)({
  maxHeight: "350px",

  // Custom scrollbar styles
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f0f0f0", // Track color
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#0e143d", // Thumb color
    borderRadius: "4px",
    border: "2px solid #0F1643",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(15,22,67,0.95)",
  },
});

function Table({ columns, rows, isLoading }) {
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const { t } = useTranslation();

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <VuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="text"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        {name.toUpperCase()}
      </VuiBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <VuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <VuiBox mr={2}>
                <VuiAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </VuiBox>
              <VuiTypography
                color="white"
                variant="button"
                fontWeight="medium"
                sx={{ width: "max-content" }}
              >
                {row[name][1]}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        );
      } else {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${grey[700]}` : null}
          >
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </VuiTypography>
          </VuiBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <>
        {isLoading ? (
          <VuiBox display="flex" justifyContent="center" alignItems="center" py={3}>
            <CircularProgress color="info" />
          </VuiBox>
        ) : !rows.length ? (
          <VuiBox display="flex" justifyContent="center" alignItems="center" py={3}>
            {t("demands.table.nodata")}
          </VuiBox>
        ) : <StyledTableContainer>
          <MuiTable>
            <VuiBox component="thead">
              <TableRow>{renderColumns}</TableRow>
            </VuiBox>
            <TableBody>{renderRows}</TableBody>
          </MuiTable>
        </StyledTableContainer>
        }
      </>
    ),
    [columns, rows],
  );
}


export default Table;