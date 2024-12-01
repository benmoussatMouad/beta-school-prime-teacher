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

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

function Student({ image, name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {email}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function Function({ job, org }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <VuiTypography variant="caption" fontWeight="medium" color="white">
        {job}
      </VuiTypography>
      <VuiTypography variant="caption" color="text">
        {org}
      </VuiTypography>
    </VuiBox>
  );
}

export const studentsTableData = (t) => {
  return {
    columns: [
      { name: t("students.table.author"), align: "left" },
      { name: t("students.table.function"), align: "left" },
      { name: t("students.table.status"), align: "center" },
      { name: t("students.table.employed"), align: "center" },
      { name: t("students.table.action"), align: "center" },
    ],

    rows: [
      {
        [t("students.table.author")]: <Student image={avatar4} name="Amira Khalil" email="esthera@simmmple.com" />,
        [t("students.table.function")]: <Function job="Manager" org="Organization" />,
        [t("students.table.status")]: (
          <VuiBadge
            variant="standard"
            badgeContent="Online"
            color="success"
            size="xs"
            container
            sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
              background: success.main,
              border: `${borderWidth[1]} solid ${success.main}`,
              borderRadius: borderRadius.md,
              color: white.main,
            })}
          />
        ),
        [t("students.table.employed")]: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            23/04/18
          </VuiTypography>
        ),
        [t("students.table.action")]: (
          <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </VuiTypography>
        ),
      },
      {
        [t("students.table.author")]: <Student image={avatar2} name="Layla Rashid" email="alexa@simmmple.com" />,
        [t("students.table.function")]: <Function job="Programator" org="Developer" />,
        [t("students.table.status")]: (
          <VuiBadge
            variant="standard"
            badgeContent="Offline"
            size="xs"
            container
            sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
              background: "unset",
              border: `${borderWidth[1]} solid ${white.main}`,
              borderRadius: borderRadius.md,
              color: white.main,
            })}
          />
        ),
        [t("students.table.employed")]: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            11/01/19
          </VuiTypography>
        ),
        [t("students.table.action")]: (
          <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </VuiTypography>
        ),
      },
      {
        [t("students.table.author")]: <Student image={avatar3} name="Omar Najib" email="laurent@simmmple.com" />,
        [t("students.table.function")]: <Function job="Executive" org="Projects" />,
        [t("students.table.status")]: (
          <VuiBadge
            variant="standard"
            badgeContent="Online"
            color="success"
            size="xs"
            container
            sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
              background: success.main,
              border: `${borderWidth[1]} solid ${success.main}`,
              borderRadius: borderRadius.md,
              color: white.main,
            })}
          />
        ),
        [t("students.table.employed")]: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            19/09/17
          </VuiTypography>
        ),
        [t("students.table.action")]: (
          <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </VuiTypography>
        ),
      },
      {
        [t("students.table.author")]: <Student image={avatar1} name="Yusuf Idrees" email="freduardo@simmmple.com" />,
        [t("students.table.function")]: <Function job="Programator" org="Developer" />,
        [t("students.table.status")]: (
          <VuiBadge
            variant="standard"
            badgeContent="Online"
            color="success"
            size="xs"
            container
            sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
              background: success.main,
              border: `${borderWidth[1]} solid ${success.main}`,
              borderRadius: borderRadius.md,
              color: white.main,
            })}
          />
        ),
        [t("students.table.employed")]: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            24/12/08
          </VuiTypography>
        ),
        [t("students.table.action")]: (
          <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </VuiTypography>
        ),
      },
      {
        [t("students.table.author")]: <Student image={avatar5} name="Hassan Nader" email="daniel@simmmple.com" />,
        [t("students.table.function")]: <Function job="Manager" org="Executive" />,
        [t("students.table.status")]: (
          <VuiBadge
            variant="standard"
            badgeContent="Offline"
            size="xs"
            container
            sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
              background: "unset",
              border: `${borderWidth[1]} solid ${white.main}`,
              borderRadius: borderRadius.md,
              color: white.main,
            })}
          />
        ),
        [t("students.table.employed")]: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            04/10/21
          </VuiTypography>
        ),
        [t("students.table.action")]: (
          <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </VuiTypography>
        ),
      },
      {
        [t("students.table.author")]: <Student image={avatar6} name="Rayan Medjari" email="mark@simmmple.com" />,
        [t("students.table.function")]: <Function job="Programtor" org="Developer" />,
        status: (
          <VuiBadge
            variant="standard"
            badgeContent="Offline"
            size="xs"
            container
            sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
              background: "unset",
              border: `${borderWidth[1]} solid ${white.main}`,
              borderRadius: borderRadius.md,
              color: white.main,
            })}
          />
        ),
        [t("students.table.employed")]: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            14/09/20
          </VuiTypography>
        ),
        [t("students.table.action")]: (
          <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </VuiTypography>
        ),
      },
    ],
  };
};
