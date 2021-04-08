import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ROUTES from './routes';

const routes = ROUTES.map((route) => {
  if (route.path instanceof Array) {
    return route.path.map((path) => ({
      ...route,
      path,
    }));
  }
  return route;
}).flat();

const RouterComponent = ({
  component: Component,
  path,
  exact,
}) => {

  return <Route component={Component} path={path} exact={exact} />;
};

const Router = () => {
  return (
    <Switch>
      {routes.map(({
        exact, key, path, component,
      }) => {
        return (
          <RouterComponent
            key={key}
            exact={exact}
            component={component}
            path={path}
          />
        );
      })}
    </Switch>
  );
};

export default Router;