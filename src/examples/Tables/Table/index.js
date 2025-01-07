import React from "react";
import { Table as MuiTable, TableBody, TableContainer, TablePagination, TableRow } from "@mui/material";
import VuiBox from "components/VuiBox";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import { getFiltersInputs } from "../../../utils";
import { useAuth } from "../../../context/auth/authContext";

function Table(
  {
    columns,
    rows,
    onSearchChange,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    isLoading,
    subject,
    teacherClass,
    status,
    totalCount,
    tableId,
    wilaya,
    selectedRole,
    onSortChange,
    sortConfig
  }) {
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const { t } = useTranslation();

  const { user } = useAuth();

  const role = user?.user?.role || null;

  const handleSort = (columnKey, sortable) => {
    if (!sortable) return; // Skip sorting for non-sortable columns

    onSortChange(columnKey); // Notify parent about the sort action
  };

  return (
    <>
      {/* Search Input */}
      {getFiltersInputs({ tableId, onSearchChange, subject, selectedRole, teacherClass, status, wilaya, t, role })}
      {isLoading ? (
        <VuiBox display="flex" justifyContent="center" alignItems="center" py={3}>
          <CircularProgress color="info" />
        </VuiBox>
      ) : (
        <>
          <TableContainer>
            <MuiTable>
              <VuiBox component="thead">
                {!rows.length ? (
                  <VuiBox display="flex" justifyContent="center" alignItems="center" py={3}>
                    {t("demands.table.nodata")}
                  </VuiBox>
                ) : <TableRow>
                  {columns.map(({ name, key, sortable, align }) => (
                    <VuiBox
                      key={name}
                      component="th"
                      pt={1.5}
                      pb={1.25}
                      textAlign={align}
                      fontSize={size.xxs}
                      fontWeight={fontWeightBold}
                      color="text"
                      opacity={0.7}
                      borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleSort(key, sortable)} // Handle sorting on click
                    >
                      {name.toUpperCase()}{" "}
                      {sortable && sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                    </VuiBox>
                  ))}
                </TableRow>}
              </VuiBox>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={`row-${index}`}>
                    {columns.map(({ name, align }) => (
                      <VuiBox
                        key={name}
                        component="td"
                        textAlign={align}
                        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
                      >
                        {row[name] || "-"}
                      </VuiBox>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                labelDisplayedRows={({ from, to, count }) =>
                  <span> {from}-{to} {t("table.pagination.of")} {count} </span>}
                sx={{
                  padding: "20px 0px !important",
                  width: "100%",
                  background: "transparent !important",
                  borderBottom: "none !important",
                  color: "white !important",
                  "& .MuiTablePagination-input": {
                    fontSize: "1.2rem",
                    color: "white !important",
                    maxWidth: "50px",
                    backgroundColor: "transparent !important",
                    margin: "0px !important",
                    minWidth: "0px !important",
                    "& .MuiTablePagination-select": {
                      fontSize: "1.2rem",
                      color: "white",
                      border: "none",
                      padding: "0px 0px !important",
                    },
                  },

                  ".MuiTablePagination-actions": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    button: {
                      color: "white !important",
                    },
                  },
                  ".MuiTablePagination-spacer": {
                    display: "none",
                  },
                  ".MuiTablePagination-selectIcon": {
                    color: "white",
                  },
                  ".MuiTablePagination-toolbar": {
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                    padding: "0px !important",
                  },
                  ".MuiTypography-root": {
                    fontSize: "1.1rem",
                  },
                  ".MuiTablePagination-selectLabel": {
                    display: "none !important",
                  },
                }}
                variant={"footer"}
              />
            </MuiTable>
          </TableContainer>
        </>
      )}
    </>
  );
}

export default Table;
