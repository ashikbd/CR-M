import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "./routes";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(async (to, from) => {
  const store = useAuthStore();
  if(to.name != 'login'){
    await store.fetchUser();
  }
  
  
  if (to.meta.auth && !store.isLoggedIn) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    }
  }else if(to.meta.guest && store.isLoggedIn){
    return {
      name: "dashboard"
    }
  }
  
});

export default router;
