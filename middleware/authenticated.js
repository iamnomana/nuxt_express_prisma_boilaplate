// export default function ({ store, redirect }) {
//   console.log(store);
//   if (!store.state.auth.loggedIn) {
//     return redirect("/auth/login");
//   }
// }

export default function ({ $auth, store, route, redirect }) {
  if (route.path !== "/auth/login" && route.path !== "/auth/reset_password") {
    if (
      store.state.auth.loggedIn &&
      Object.keys(store.state.auth.user).length == 0
    ) {
      $auth.logout();
    }

    // we are on a protected route
    // if (!store.state.auth.loggedIn) {
    //   //take them to sign in page
    //   return redirect("/auth/login");
    // }
    if (!store.state.auth.loggedIn) {
      //take them to sign in page
      return redirect("/auth/login");
    }
  } else if (
    route.path === "/auth/login" ||
    route.path === "/auth/reset_password"
  ) {
    if (!store.state.auth.loggedIn) {
      //leave them on the sign in page
    } else {
      return redirect("/");
    }
  }
}
