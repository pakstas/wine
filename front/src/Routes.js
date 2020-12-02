import React, { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Loading } from "./components";
import { Header } from "./components";
import { AuthContext } from "./context/AuthContext";

const HomeLazy = lazy(() => import("./pages/Home/Home"));
const AboutLazy = lazy(() => import("./pages/About/About"));
const LoginLazy = lazy(() => import("./pages/Login/Login"));
const RegisterLazy = lazy(() => import("./pages/Register/Register"));
const WineTypeLazy = lazy(() => import("./pages/WineType/WineType"));
const WineTypeAddLazy = lazy(() => import("./pages/WineTypeAdd/WineTypeAdd"));

function Routes() {
  const auth = useContext(AuthContext);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header
          loggedIn={!!auth.token}
          logout={() => {
            auth.updateToken("");
            localStorage.removeItem("token");
          }}
        />
        <Switch>
          <Route exact path="/" component={HomeLazy} />
          <Route exact path="/login" component={LoginLazy} />
          <Route exact path="/register" component={RegisterLazy} />
          <Route exact path="/about" component={AboutLazy} />
          <Route exact path="/winetype" component={WineTypeLazy} />
          <Route exact path="/winetypeadd" component={WineTypeAddLazy} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
