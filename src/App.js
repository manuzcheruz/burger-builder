import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';

const LazyAuth = React.lazy( () => import('./containers/Auth/Auth')) 
const LazyLogout = React.lazy(() => import('./containers/Auth/Logout/Logout'))
const LazyOrders = React.lazy(() => import('./containers/Orders/Orders'))
const LazyCheckout = React.lazy(() => import('./containers/Checkout/Checkout'))

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignUp()
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" render={() => <Suspense fallback={<h1>Loading...</h1>}><LazyAuth /></Suspense>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/checkout" render={() => <Suspense fallback={<h1>Loading...</h1>}><LazyCheckout /></Suspense>} />
            <Route path="/orders" render={() => <Suspense fallback={<h1>Loading...</h1>}><LazyOrders /></Suspense>} />
            <Route path="/auth" render={() => <Suspense fallback={<h1>Loading...</h1>}><LazyAuth /></Suspense>} />
            <Route path="/logout" render={() => <Suspense fallback={<h1>Loading...</h1>}><LazyLogout /></Suspense>} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
