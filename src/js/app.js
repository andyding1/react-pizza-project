var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

// A simple navigation component
var Navigation = React.createClass({
  render: function() {
    return (
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>
            <Link to="/choose">Choose Pizza</Link>
          </li>
          <li>
            <Link to="/custom">Custom Pizza</Link>
          </li>
        </ul>
      </nav>
    );
  }
});

// The main application layout
// this.props.children will be set by React Router depending on the current route
var App = React.createClass({
  render: function() {
    return (
      <main>
        <Navigation/>
        {this.props.children}
      </main>
    );
  }
});

// home "page"
var Home = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Homepage!</h1>
        <p>Welcome to the homepage! Try to click on a link in the nav, then click the browser's back button.</p>
      </div>
    );
  }
});

// order "page"
var Order = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Order Page!</h1>
        <p>Please enter your information</p>
        <form>
          <label>Name: <input name="name" type="text"></input></label><br/>
          <label>Email: <input name="email" type="text"></input></label><br/>
          <label>Phone Number: <input name="phoneNumber" type="text"></input></label><br/>
          <label>Home Address: <input name="homeAddress" type="text"></input></label><br/>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
});

// choose "page"
var Choose = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Choose Your Pizza!</h1>
        <p>List of toppings,cheeses</p>
      </div>
    );
  }
});

// custom "page"
var Custom = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Create Your Pizza!</h1>
        <p>List of toppings,cheeses</p>
      </div>
    );
  }
});

// not found "page"
var NotFound = React.createClass({
  render: function() {
    return (
      <div>Not Found!</div>
    );
  }
});

/*
The routes. This section says:
  - If the route starts with /, load the App component
  - If the route IS /, load the Home component INSIDE App as this.props.children
  - If the route is /about, load the About component INSIDE App as this.props.children
  - If the route is /team, load the Team component INSIDE App as this.props.children
  - If the route is /about, load the About component INSIDE App as this.props.children
  - If the route is anything else, load the NotFound component INSIDE App as this.props.children

The whole process lets us create **complex, nested user interfaces** with minimal effort,
by simply nesting `Route` components.
*/

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="order" component={Order}/>
      <Route path="choose" component={Choose}/>
      <Route path="custom" component={Custom}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// If this line of code is not here, nothing gets displayed!
ReactDOM.render(routes, document.querySelector('#app'));
