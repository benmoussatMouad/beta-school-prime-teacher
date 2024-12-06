// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import { useTranslation } from "react-i18next";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "cours",  align: "left" },
      { name: "members", align: "left" },
      { name: "etudiants", align: "center" },
      { name: "Revues", align: "center" },
    ],

    rows: [
      {
        cours: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
التفاضل والتكامل
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Rayane Arbi"],
              [avatar2, "Amina Hadid"],
              [avatar3, "Rayane Arbi"],
              [avatar4, "Amina Hadid"],
            ])}
          </VuiBox>
        ),
        etudiants: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            322
          </VuiTypography>
        ),
        Revues: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              60%
            </VuiTypography>
            <VuiProgress value={60} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        cours: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
الجبر الخطي
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar2, "Romina Hadid"],
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        etudiants: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            80
          </VuiTypography>
        ),
        Revues: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              10%
            </VuiTypography>
            <VuiProgress value={10} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        cours: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
الهندسة التحليلية
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar3, "Alexander Smith"],
            ])}
          </VuiBox>
        ),
        etudiants: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            54
          </VuiTypography>
        ),
        Revues: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              100%
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        cours: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
الإحصاء والاحتمالات
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar4, "Jessica Doe"],
              [avatar3, "Alexander Smith"],
              [avatar2, "Romina Hadid"],
              [avatar1, "Ryan Tompson"],
            ])}
          </VuiBox>
        ),
        etudiants: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            124
          </VuiTypography>
        ),
        Revues: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              100%
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        cours: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
المعادلات التفاضلية
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([[avatar4, "Jessica Doe"]])}
          </VuiBox>
        ),
        etudiants: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            78
          </VuiTypography>
        ),
        Revues: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              25%
            </VuiTypography>
            <VuiProgress value={25} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        cours: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
الجبر
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        etudiants: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            43
          </VuiTypography>
        ),
        Revues: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              40%
            </VuiTypography>
            <VuiProgress value={40} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
    ],
  };
}
