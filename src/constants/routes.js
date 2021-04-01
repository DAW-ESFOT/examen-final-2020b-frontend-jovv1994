const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
};

const privateRoutes = {
  HOME: "/",
  PRODUCT: "/product",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
