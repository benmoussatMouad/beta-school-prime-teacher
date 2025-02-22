import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "../../../components/VuiButton";
import React from "react";
import VuiAvatar from "../../../components/VuiAvatar";
import { GiOpenBook } from "react-icons/gi";
import moment from "moment/moment";

function Icon({ image, name }) {
  return (
    <VuiBox display="flex" alignItems="center" justifyContent={"center"} m={2}>
      <VuiBox>
        {image ? <VuiAvatar src={image} alt={name} size="sm" variant="rounded" /> :
          <GiOpenBook size={28} color={"white"} />}
      </VuiBox>
    </VuiBox>
  );
}

function Function({ content }) {
  return (
    <VuiTypography variant="caption" fontWeight="medium" color="white">
      {content}
    </VuiTypography>
  );
}

export const coursesTableData = (t, data) => {
  return {
    columns: [
      { name: t("courses.table.icon"), align: "center", key: "icon" },
      { name: t("courses.table.title"), align: "left", sortable: true, key: "title" },
      { name: t("courses.table.subject"), align: "left", sortable: true, key: "subject" },
      { name: t("courses.table.level"), align: "center", sortable: true, key: "class" },
      { name: t("courses.table.createdAt"), align: "center", sortable: true, key: "createdAt" },
      { name: t("demands.table.view"), align: "center", key: "view" },
    ],

    rows: !data ? [] : data?.map((course) => ({
      [t("courses.table.icon")]: (
        <Icon image={course?.icon?.url} name={`${course.title} }`} />
      ),
      [t("courses.table.title")]: (
        <Function content={course.title} />
      ),
      [t("courses.table.subject")]: (
        <VuiTypography variant="caption" fontWeight="medium" color="white">
          {t(`subjects.${course.teacher.subject}`)}
        </VuiTypography>
      ),
      [t("courses.table.level")]: (
        <VuiTypography variant="caption" fontWeight="medium" color="white">
          {t(`teacherClass.${course.class[0]}`)}
        </VuiTypography>
      ),
      [t("courses.table.createdAt")]: (
        <Function content={moment(course.createdAt).format("DD/MM/YYYY hh:mm")} />
      ),
      [t("demands.table.view")]: (
        <VuiButton
          variant="contained"
          sx={{ padding: "0px", height: "30px" }}
          color="info"
          href={"/cours/" + course.id}
        >
          {t("demands.table.view")}
        </VuiButton>
      ),
    })),
  };
};
