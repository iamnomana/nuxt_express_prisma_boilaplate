export default function ({ $auth, store, route, redirect }) {
  if (route.path !== "/auth/login" && route.path !== "/auth/change_password") {
    if (!store.state.auth.loggedIn) {
      //take them to sign in page
      return redirect("/auth/login");
    }
  } else if (
    route.path === "/auth/login" ||
    route.path === "/auth/change_password"
  ) {
    if (!store.state.auth.loggedIn) {
      //leave them on the sign in page
    } else {
      return redirect("/");
    }
  }
}
