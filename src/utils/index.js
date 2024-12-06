import profile1 from "../assets/images/profile-1.png";
import profile2 from "../assets/images/profile-2.png";
import profile3 from "../assets/images/profile-3.png";

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

export const StudentsLevel = [
  "AS1",
  "AS2",
  "AS3",
  "AM2",
  "AM3",
  "TM2",
  "TM3",
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
