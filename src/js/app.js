var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

/*
  The Pizza
*/
var pizzas = [
  {
    name: 'Cheese Pizza',
    cheese: 'mozzarella',
    toppings: [],
    price: 5
  },
  {
    name: 'The Monster',
    cheese: 'parmesan',
    toppings: ['anchovies', 'lobster', 'truffle oil'],
    price: 100
  }
];

/*
  Cheese
*/
var cheeses = [
  {
    name: 'mozzarella',
    displayName: 'Mozzarella cheese',
    price: 0
  },
  {
    name: 'parmesan',
    displayName: 'Parmigiano Reggiano',
    price: 100
  }
];

/*
  Toppings
*/
var toppings = [
  {
    name: 'pepperoni',
    displayName: 'Pepperoni',
    price: 1
  },
  {
    name: 'anchovies',
    displayName: 'Anchovies',
    price: 10
  },
  {
    name: 'lobster',
    displayName: 'Lobstah',
    price: 25
  },
  {
    name: 'truffle oil',
    displayName: 'Mmmm... truffle oillll',
    price: 100
  }
];

var userInfo;

// A simple navigation component
// var Navigation = React.createClass({
//   render: function() {
//     return (
//       <nav className="main-menu">
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/order">Order</Link>
//           </li>
//           {/*}
//           <li>
//             <Link to="/choose">Choose Pizza</Link>
//           </li>
//           <li>
//             <Link to="/custom">Custom Pizza</Link>
//           </li>
//           */}
//         </ul>
//       </nav>
//     );
//   }
// });

// The main application layout
// this.props.children will be set by React Router depending on the current route

var App = React.createClass({
  render: function() {
    return (
      <main>
      {/*
      <Navigation/>
      */}
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
        <h1>Welcome!</h1>
        <p>Click below to order pizza.</p>
        <Link to="/order">Order</Link>
      </div>
    );
  }
});

// order "page"
var Order = React.createClass({
  getUser: function(event){
    event.preventDefault();
    userInfo = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      phoneNumber: this.refs.phoneNumber.value,
      homeAddress: this.refs.homeAddress.value
    }
    browserHistory.push('/choose');
    console.log(userInfo);
  },
  render: function() {
    return (
      <div>
        <h1>Order Page!</h1>
        <p>Please enter your information</p>
        <form onSubmit={this.getUser}>
          <label>Name:          <input ref="name" name="name" type="text"></input></label><br/>
          <label>Email:         <input ref="email" name="email" type="text"></input></label><br/>
          <label>Phone Number:  <input ref="phoneNumber" name="phoneNumber" type="text"></input></label><br/>
          <label>Home Address:  <input ref="homeAddress" name="homeAddress" type="text"></input></label><br/>
          <input type="submit" defaultValue="Submit"></input>
        </form>
      </div>
    );
  }
});

// choose "page"
var Choose = React.createClass({
  getInitialState: function(){
    return {
      pizza: pizzas,
      selected: false,
    };
  },
  handleClick: function(clickedPizza){
      var newList = this.state.pizza.map(function(pizza){
        if (clickedPizza === pizza.name){
          pizza.selected = !pizza.selected;
        }

        return pizza;
      });
      this.setState({
        pizza: newList
      })
  },
  render: function() {
    return (
      <div>
        <h1>Choose Your Pizza!</h1>
        <ul>
        {this.state.pizza.map((pizza) =>{
          var color = "";
          if(pizza.selected){
            color = "selected"
          }

          return (
            <li key={pizza.name} onClick={this.handleClick.bind(null, pizza.name)} className={color}>
              <p>{pizza.name}</p>
              <p>{pizza.price}</p>
            </li>
          );
        })}
        </ul>
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
