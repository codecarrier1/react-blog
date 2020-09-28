import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import { getUserInfo } from '../../redux/actions';

const Invite = React.lazy(() => import('./invite'));

class App extends Component {
  render() {
    const { match } = this.props;
    if (localStorage.getItem('user_role') == 1) {
      this.props.history.goBack();
    }
    return (
      <AppLayout>
        <div className='dashboard-wrapper'>
          <Suspense fallback={<div className='loading' />}>
            <Switch>
              <Route
                exact
                path={`${match.url}/`}
                render={(props) => <h1> AAA </h1>}
              />
              <Route
                path={`${match.url}/invite`}
                render={(props) => <Invite {...props} />}
              />

              <Redirect to='/error' />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, { getUserInfo })(App));
