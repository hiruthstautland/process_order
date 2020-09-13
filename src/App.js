import React, { useState, useEffect } from 'react';
import { ContentLoader } from './components/ContentLoader/index';
import MainView from './components/MainView';
import OrderViews from './components/OrderViews/index';
import ConfirmedView from './components/ConfirmedView';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/ErrorAndInfoCard';

const App = () => {
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => setSpinner(false), 200);

    return () => {
      setSpinner(false);
    };
  }, []);

  return !spinner ? (
    <React.Fragment>
      <HashRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <ErrorBoundary>
                  <MainView {...props} />
                </ErrorBoundary>
              )}
            />
            <Route
              exact
              path="/:orderstatus"
              render={(props) => (
                <ErrorBoundary>
                  <MainView {...props} />
                </ErrorBoundary>
              )}
            />
            <Route
              exact
              path="/:orderstatus/:ordernumber"
              render={(props) => (
                <ErrorBoundary>
                  <OrderViews {...props} />
                </ErrorBoundary>
              )}
            />
            <Route
              path="/:orderstatus/:ordernumber/:status"
              render={(props) => (
                <ErrorBoundary>
                  <ConfirmedView {...props} />
                </ErrorBoundary>
              )}
            />
          </Switch>
        </div>
      </HashRouter>
    </React.Fragment>
  ) : (
    <ContentLoader />
  );
};

export default App;
