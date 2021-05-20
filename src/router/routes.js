import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Login from "@/pages/Login.vue";
import Qna from "@/pages/Qna.vue";

// import QnaView from "@/components/Qna/QnaView.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
        children: [
          {
            path: "",
            name: "notification-list",
            component: () =>
              import("@/components/Notification/NotificationList.vue")
          },
          {
            path: "notification-view",
            name: "notification-view",
            component: () =>
              import("@/components/Notification/NotificationView.vue")
          }
        ]
      },
      {
        path: "qna",
        name: "qna",
        component: Qna,
        children: [
          {
            path: "",
            name: "qna-list",
            component: () => import("@/components/Qna/QnaList.vue")
          },

          {
            path: "qna-view",
            name: "qna-view",
            component: () => import("@/components/Qna/QnaView.vue")
          }
        ]
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
