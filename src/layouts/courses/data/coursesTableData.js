// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "../../../components/VuiButton";
import React from "react";


export const coursesTableData = (t) => {
  return {
    columns: [
      { name: t("courses.table.title"), align: "left" },
      { name: t("courses.table.description"), align: "left" },
      { name: t("courses.table.views"), align: "center" },
      { name: t("courses.table.rating"), align: "center" },
      { name: t("courses.table.createdAt"), align: "center" },
      { name: t("courses.table.updatedAt"), align: "center" },
      { name: t("cours.table.action"), align: "center" },
    ],

    rows: [
      {
        [t("courses.table.title")]: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              display="flex"
              justifyContent="center"
            >
              Introduction to React
            </VuiTypography>
          </VuiBox>
        ),
        [t("courses.table.description")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            Learn the basics of React including components and state management.
          </VuiTypography>
        ),
        [t("courses.table.views")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            1,500
          </VuiTypography>
        ),
        [t("courses.table.rating")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            4.5/5
          </VuiTypography>
        ),
        [t("courses.table.createdAt")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            2024-01-05
          </VuiTypography>
        ),
        [t("courses.table.updatedAt")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            2024-02-15
          </VuiTypography>
        ),
        [t("cours.table.action")]: (
          <VuiButton
            variant="contained"
            sx={{ padding: "0px", height: "30px" }}
            color="info"
            href={"/cours/1"}
          >
            {t("cours.table.action")}
          </VuiButton>
        ),
      },
      {
        [t("courses.table.title")]: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              display="flex"
              justifyContent="center"
            >
              Advanced JavaScript
            </VuiTypography>
          </VuiBox>
        ),
        [t("courses.table.description")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            Dive deeper into JavaScript with advanced concepts and patterns.
          </VuiTypography>
        ),
        [t("courses.table.views")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            3,200
          </VuiTypography>
        ),
        [t("courses.table.rating")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            4.8/5
          </VuiTypography>
        ),
        [t("courses.table.createdAt")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            2024-03-10
          </VuiTypography>
        ),
        [t("courses.table.updatedAt")]: (
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            display="flex"
            justifyContent="center">
            2024-04-20
          </VuiTypography>
        ),
        [t("cours.table.action")]: (
          <VuiButton
            variant="contained"
            sx={{ padding: "0px", height: "30px" }}
            color="info"
            href={"/cours/1"}
          >
            {t("cours.table.action")}
          </VuiButton>
        ),
      },
    ],
  };
};
