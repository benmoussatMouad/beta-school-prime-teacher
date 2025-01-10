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

/**
 All of the routes for the Vision UI Dashboard React are added here,
 You can add a new route, customize the routes and delete the routes here.

 Once you add a new route on this file it will be visible automatically on
 the Sidenav.

 For adding a new route you can follow the existing routes in the routes array.
 1. The `type` key with the `collapse` value is used for a route.
 2. The `type` key with the `title` value is used for a title inside the Sidenav.
 3. The `type` key with the `divider` value is used for a divider between Sidenav items.
 4. The `name` key is used for the name of the route on the Sidenav.
 5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
 6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
 7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
 inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
 8. The `route` key is used to store the route location which is used for the react router.
 9. The `href` key is used to store the external links location.
 10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
 10. The `component` key is used to store the component of its route.
 */

// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Courses from "layouts/courses";
import Students from "layouts/students";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Vision UI Dashboard React icons
import { IoHome } from "react-icons/io5";
import { BsFillEnvelopePaperFill, BsFillPersonFill } from "react-icons/bs";
import { GiBookshelf, GiMaterialsScience } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FcSalesPerformance } from "react-icons/fc";
import ResetPassword from "layouts/authentication/reset-password";
import ForgetPassword from "layouts/authentication/forget-password";
import Demands from "./layouts/demands";
import Teachers from "./layouts/teachers";
import Support from "./layouts/support";
import CoursDetails from "./layouts/cours";
import AllCourses from "./layouts/allCourses";
import PendingCourses from "./layouts/pendingCourses";
import StudentsApprovals from "./layouts/studentsApprovals";
import TeachersDebts from "./layouts/teachersDebts";
import TeacherPayments from "layouts/teacherPayments";
import Sales from "layouts/sales";


const routes = [
  {
    type: "collapse",
    name: "Tableau de bord",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
    isProtected: true,
  },
  {
    type: "collapse",
    name: "Les demands",
    key: "demands",
    route: "/demands",
    icon: <BsFillEnvelopePaperFill size="15px" color="inherit" />,
    component: Demands,
    noCollapse: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    type: "collapse",
    name: "Les enseignants",
    key: "teachers",
    route: "/teachers",
    icon: <LiaChalkboardTeacherSolid size="15px" color="inherit" />,
    component: Teachers,
    noCollapse: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    type: "collapse",
    name: "Les course des enseignants",
    key: "allCourses",
    route: "/allCourses",
    icon: <GiBookshelf size="15px" color="inherit" />,
    component: AllCourses,
    noCollapse: true,
    isProtected: true,
    isRoot: true,
  },
  {
    type: "collapse",
    name: "Enseignants dettes",
    key: "debts",
    route: "/debts",
    icon: <FaHandHoldingDollar size="15px" color="inherit" />,
    component: TeachersDebts,
    noCollapse: true,
    isProtected: true,
    isRoot: true,
  },
  {
    type: "collapse",
    name: "Les course des enseignants",
    key: "pendingCourses",
    route: "/pendingCourses",
    icon: <GiBookshelf size="15px" color="inherit" />,
    component: PendingCourses,
    noCollapse: true,
    isProtected: true,
    isAdmin: true,
    onlyAdmin: true,
  },
  {
    type: "collapse",
    name: "Demandes eleves",
    key: "studentsDemands",
    route: "/studentsDemands",
    icon: <PiStudentFill size="15px" color="inherit" />,
    component: StudentsApprovals,
    noCollapse: true,
    isProtected: true,
    isAdmin: true,
  },
  {
    type: "collapse",
    name: "Les cours",
    key: "courses",
    route: "/courses",
    icon: <GiMaterialsScience size="15px" color="inherit" />,
    component: Courses,
    noCollapse: true,
    isProtected: true,
  },
  {
    type: "route",
    name: "Course Detail",
    key: "cours",
    route: "/cours/:id",
    component: CoursDetails,
    noCollapse: true,
    isProtected: true,
  },
  {
    type: "collapse",
    name: "Les étudiants",
    key: "students",
    route: "/students",
    icon: <PiStudentFill size="15px" color="inherit" />,
    component: Students,
    noCollapse: true,
    isProtected: true,
  },
  {
    type: "collapse",
    name: "les payments des enseignants",
    key: "payments",
    route: "/payments",
    icon: <HiCurrencyDollar size="20px" color="inherit" />,
    component: TeacherPayments,
    noCollapse: true,
    isProtected: true,
  },
  {
    type: "collapse",
    name: "les payments des enseignants",
    key: "sales",
    route: "/sales",
    icon: <FcSalesPerformance size="20px" color="inherit" />,
    component: Sales,
    noCollapse: true,
    isProtected: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
    isProtected: true,
  },
  {
    type: "collapse",
    name: "Support",
    key: "support",
    route: "/support",
    icon: <BiSupport size="15px" color="inherit" />,
    component: Support,
    noCollapse: true,
    isProtected: true,
  },
  {
    type: "route",
    name: "Se connecter",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: SignIn,
    noCollapse: true,
    isGuestOnly: true,
  },
  {
    type: "route",
    name: "S'inscrire",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: SignUp,
    noCollapse: true,
    isGuestOnly: true,
  },
  {
    type: "route",
    name: "Réinitialiser le mot de passe",
    key: "reset-password",
    route: "/authentication/reset-password",
    component: ResetPassword,
    noCollapse: true,
    isGuestOnly: true,
  },
  {
    type: "route",
    name: "Réinitialiser le mot de passe",
    key: "reset-password",
    route: "/authentication/forget-password",
    component: ForgetPassword,
    noCollapse: true,
    isGuestOnly: true,
  },
];

export default routes;
