import { useState } from "react";
import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiBadge from "../../../../components/VuiBadge";

import Table from "examples/Tables/Example";
import data from "./data";
import { getAccessToken } from "../../../../utils";
import { useGetCourses } from "../../../../api/courses";
import CreateCoursDialog from "../../../../examples/Dialogs/CreateCours";


function Courses() {
  const [openDialog, setOpenDialog] = useState(false);

  const token = getAccessToken();

  const { data: courses, isLoading: isLoadingCourses } = useGetCourses(token);

  const { t } = useTranslation();
  const { columns, rows } = data(courses?.courses);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card sx={{ height: "100% !important" }}>
      <CreateCoursDialog closeDialog={closeDialog} openDialog={openDialog} />
      {/* Courses Table */}
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox>
          <VuiTypography color="white" variant="h3" mb="6px" fontWeight="bold">
            {t("dashboard.myCourses")}
          </VuiTypography>
        </VuiBox>
        <VuiButton onClick={() => setOpenDialog(true)} color="primary" variant="gradient" size="medium">
          <VuiTypography variant="button" color="white">+ {t("dashboard.coursesCard.addCourse")}</VuiTypography>
        </VuiButton>
      </VuiBox>
      <VuiBox>
        <Table columns={columns} rows={rows?.reverse()} isLoading={isLoadingCourses} />
      </VuiBox>
    </Card>
  );
}

export default Courses;
