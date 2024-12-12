import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Create from "@/views/Create.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Index },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/create", component: Create, meta:{requiresAuth:true}},
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
