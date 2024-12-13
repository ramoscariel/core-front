import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Create from "@/views/Create.vue";
import Profile from "@/views/Profile.vue";
import Edit from "@/views/Edit.vue";
import Report from "@/views/Report.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Index },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/create", component: Create, meta:{requiresAuth:true}},
    { path: "/profile/:user_id", component: Profile },
    { path: "/edit/:post_id", component: Edit, meta:{requiresAuth:true}},
    { path: "/report", component: Report }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next("/login");
  } else {
    next();
  }
});

export default router;
