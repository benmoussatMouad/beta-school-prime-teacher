import profile1 from "../assets/images/profile-1.png";
import profile2 from "../assets/images/profile-2.png";
import profile3 from "../assets/images/profile-3.png";
import Grid from "@mui/material/Grid";
import VuiInput from "../components/VuiInput";
import VuiSelect from "../components/VuiSelect";
import React from "react";
import moment from "moment";

export function getEnvSafely(envKey, defaultValue) {
  const value = process.env[envKey];

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue; // Use the provided default value
    }

    throw new Error(`Missing required environment variable: ${envKey}`);
  }

  return value;
}

export const convertSecondsToMinutes = (seconds) => {
  return Math.round(moment.duration(seconds, "seconds").asMinutes());
};


export function formatSeconds(seconds, t) {
  const duration = moment.duration(seconds, "seconds");
  const hours = Math.floor(duration.asHours());
  const minutes = Math.ceil(duration.asMinutes());

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours} ${t("hour")}`;
  }
  if (minutes > 0) {
    if (formattedTime.length > 0) {
      formattedTime += " ";
    }
    formattedTime += `${minutes} ${t("minute")}`;
  }
  return formattedTime || `0 ${t("minute")}`; // Fallback for 0 seconds case
}

export const Subjects = [
  "MATHEMATICS",
  "SCIENCE",
  "PHYSICS",
  "HISTORY_GEOGRAPHY",
  "ISLAMIC_STUDIES",
  "ARABIC",
  "FRENCH",
  "ENGLISH",
];

export const EducationalBranches = [
  // Primary Education
  "PRIMARY_GENERAL",
  // Middle Education
  "MIDDLE_GENERAL",
  // Secondary Education
  "SECONDARY_SCIENCE",
  "SECONDARY_ARTS",
  "SECONDARY_LITERATURE",
  "SECONDARY_MATHEMATICS",
  "SECONDARY_TECHNIQUE_MATH",
  "SECONDARY_MANAGEMENT_ECONOMIES",

  "ALL_BRANCHES",
];

export const CourseLevel = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
];

export const StudentsLevel = [
  "PRIMARY_1",
  "PRIMARY_2",
  "PRIMARY_3",
  "PRIMARY_4",
  "PRIMARY_5",
  "MIDDLE_1", // Equivalent to AM1
  "MIDDLE_2", // Equivalent to AM2
  "MIDDLE_3", // Equivalent to AM3
  "MIDDLE_4",
  "SECONDARY_1", // Equivalent to AS1
  "SECONDARY_2",// Equivalent to AS2
  "SECONDARY_3", // Equivalent to AS3
  "OTHER",
];

export const FiltersSubjects = [
  "NONE",
  "MATHEMATICS",
  "SCIENCE",
  "PHYSICS",
  "HISTORY_GEOGRAPHY",
  "ISLAMIC_STUDIES",
  "ARABIC",
  "FRENCH",
  "ENGLISH",
  "OTHER"
];

export const FiltersStudentsLevel = [
  "NONE",
  "PRIMARY_1",
  "PRIMARY_2",
  "PRIMARY_3",
  "PRIMARY_4",
  "PRIMARY_5",
  "MIDDLE_1", // Equivalent to AM1
  "MIDDLE_2", // Equivalent to AM2
  "MIDDLE_3", // Equivalent to AM3
  "MIDDLE_4",
  "SECONDARY_1", // Equivalent to AS1
  "SECONDARY_2",// Equivalent to AS2
  "SECONDARY_3", // Equivalent to AS3
  "OTHER",
];

export const FiltersStatus = [
  "NONE",
  "UNDER_CREATION",
  "ACCEPTED",
  "TO_REVIEW",
  "REJECT",
];

export const FiltersRoles = [
  "TEACHER",
  "ADMIN",
];

export const getToken = () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("refresh_Token");

    // Optionally, add validation logic if needed
    if (token) {
      return token;
    }

    return null;
  } catch (error) {
    return null; // Return null in case of an error
  }
};

// Course data
export const courseData = [
  {
    id: 1,
    image: profile1,
    label: "Course #1",
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript, including variables, loops, and functions.",
    duration: "50 min",
    ressources: [0, 1, 2],
  },
  {
    id: 2,
    image: profile2,
    label: "Course #2",
    title: "HTML & CSS Basics",
    description: "Understand the fundamentals of web development with HTML and CSS.",
    duration: "60 min",
    ressources: [0, 1, 2, 3],
  },
  {
    id: 3,
    image: profile3,
    label: "Course #3",
    title: "React.js Fundamentals",
    description: "Get started with React.js by learning components, hooks, and state management.",
    duration: "45 min",
    ressources: [0, 1, 2, 3, 4],
  },
  {
    id: 4,
    image: profile1,
    label: "Course #4",
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript with ES6+, promises, async/await, and more.",
    duration: "40 min",
    ressources: [0, 1],
  },
  {
    id: 5,
    image: profile2,
    label: "Course #5",
    title: "Node.js Basics",
    description: "Introduction to backend development using Node.js and Express.",
    duration: "50 min",
    ressources: [1, 2, 3],
  },
  {
    id: 6,
    image: profile3,
    label: "Course #6",
    title: "MongoDB Essentials",
    description: "Learn how to work with MongoDB, a NoSQL database, for your applications.",
    duration: "55 min",
    ressources: [0, 3, 4],
  },
  {
    id: 7,
    image: profile1,
    label: "Course #7",
    title: "Building APIs with Express",
    description: "Create RESTful APIs with Express.js and integrate them with a database.",
    duration: "60 min",
    ressources: [2, 3],
  },
  {
    id: 8,
    image: profile2,
    label: "Course #8",
    title: "TypeScript Introduction",
    description: "Learn TypeScript, the superset of JavaScript that adds types and more.",
    duration: "45 min",
    ressources: [0, 1, 2],
  },
  {
    id: 9,
    image: profile3,
    label: "Course #9",
    title: "GraphQL Fundamentals",
    description: "Understand GraphQL, a query language for APIs, and how to integrate it into your projects.",
    duration: "60 min",
    ressources: [4, 5],
  },
  {
    id: 10,
    image: profile1,
    label: "Course #10",
    title: "Testing with Jest",
    description: "Learn how to test your JavaScript code using Jest and other testing libraries.",
    duration: "50 min",
    ressources: [1, 3, 6],
  },
];

export const getFiltersInputs = ({ tableId, onSearchChange, subject, selectedRole, teacherClass, status, t, role }) => {
  switch (tableId) {
    case "teachers":
      return <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={role === "ROOT" ? 2.5 : 3}>
          <VuiInput
            placeholder={t("signup.forms.firstName")}
            fullWidth
            onChange={onSearchChange}
            sx={{ my: 1 }}
            name="firstName"
          />
        </Grid>
        <Grid item xs={6} md={role === "ROOT" ? 2.5 : 3}>
          <VuiInput
            placeholder={t("signup.forms.lastName")}
            fullWidth
            onChange={onSearchChange}
            sx={{ my: 1 }}
            name="lastName"
          />
        </Grid>
        <Grid item xs={6} md={role === "ROOT" ? 2.5 : 3}>
          <VuiInput
            placeholder={t("signup.forms.email")}
            fullWidth
            onChange={onSearchChange}
            sx={{ my: 1 }}
            name="email"
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }} xs={6} sm={6} md={role === "ROOT" ? 2.5 : 3}>
          <VuiSelect
            typeSelect={"subjects"}
            onChange={onSearchChange}
            label={t("signup.forms.subject")}
            options={FiltersSubjects}
            value={subject || FiltersSubjects[0]}
            name={"subject"}
            sx={{ my: 1 }}
          />
        </Grid>
        {role === "ROOT" ? <Grid item sx={{ display: "flex", alignItems: "center" }} xs={6} sm={6} md={2}>
          <VuiSelect
            isRoot={true}
            typeSelect={"roles"}
            onChange={onSearchChange}
            options={FiltersRoles}
            value={selectedRole || FiltersRoles[0]}
            name={"roles"}
            sx={{ my: 1 }}
          />
        </Grid> : ""}
      </Grid>;
    case "teachersCourses":
      return <Grid container spacing={2}>
        <Grid item xs={12} md={role === "ROOT" ? 3 : 4}>
          <VuiInput
            placeholder={t("course.filter.title")}
            fullWidth
            onChange={onSearchChange}
            sx={{ my: 1 }}
            name="title"
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }} xs={12} md={role === "ROOT" ? 3 : 4}>
          <VuiSelect
            onChange={onSearchChange}
            label={t("course.filter.subject")}
            options={FiltersSubjects}
            value={subject || FiltersSubjects[0]}
            name={"subject"}
            typeSelect={"subjects"}
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }} xs={12} md={role === "ROOT" ? 3 : 4}>
          <VuiSelect
            t={false}
            onChange={onSearchChange}
            label={t("course.filter.level")}
            options={FiltersStudentsLevel}
            value={teacherClass || FiltersStudentsLevel[0]}
            name={"teacherClass"}
            typeSelect={"teacherClasses"}
          />
        </Grid>
        {role === "ROOT" ?
          <Grid item sx={{ display: "flex", alignItems: "center" }} xs={12} md={role === "ROOT" ? 3 : 4}>
            <VuiSelect
              t={false}
              onChange={onSearchChange}
              label={t("course.filter.status")}
              options={FiltersStatus}
              value={status || FiltersStatus[0]}
              name={"status"}
              typeSelect={"status"}
            />
          </Grid> : ""}

      </Grid>;
    case "courses":
      return <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <VuiInput
            placeholder={t("course.filter.title")}
            fullWidth
            onChange={onSearchChange}
            sx={{ my: 1 }}
            name="title"
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }} xs={12} md={3}>
          <VuiSelect
            onChange={onSearchChange}
            label={t("course.filter.subject")}
            options={FiltersSubjects}
            value={subject || FiltersSubjects[0]}
            name={"subject"}
            typeSelect={"subjects"}
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }} xs={12} md={3}>
          <VuiSelect
            t={false}
            onChange={onSearchChange}
            label={t("course.filter.level")}
            options={FiltersStudentsLevel}
            value={teacherClass || FiltersStudentsLevel[0]}
            name={"teacherClass"}
            typeSelect={"teacherClasses"}
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }} xs={12} md={3}>
          <VuiSelect
            t={false}
            onChange={onSearchChange}
            label={t("course.filter.status")}
            options={FiltersStatus}
            value={status || FiltersStatus[0]}
            name={"status"}
            typeSelect={"status"}
          />
        </Grid>

      </Grid>;
  }
};

// Utility functions for token management
export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
