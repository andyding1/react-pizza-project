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

//Declaring global variable to store user info
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
      selected: false
    };
  },
  priceRender: function(price){
    var priceFormat = "$"+price+".00";
    return priceFormat;
  },
  goCustomize: function(event){
    event.preventDefault();
    browserHistory.push('/custom');
  },
  choosePizza: function(pizza,price){
    browserHistory.push('/done?pizza='+pizza+'&price='+price);
  },
  render: function(){
    return (
      <div>
        <h1>Choose your Pizza!</h1>
        <ul>
          {this.state.pizza.map((pizza)=>{
            return (
              <li key={pizza.name} onClick={this.choosePizza.bind(this, pizza.name, this.priceRender(pizza.price))}>
                <p>{pizza.name}</p>
                <p>{this.priceRender(pizza.price)}</p>
              </li>
            );
          })
          }
        </ul>
        <button onClick={this.goCustomize}>Customize Your Pizza</button>
      </div>
    );
  }
/* //This allows me to click each <li> item created for each pizza and everytime I click I can apply css to .selected className
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
          if(pizza.selected === true){
            color = "selected"
          }
          return (
            <li key={pizza.name} onClick={this.handleClick.bind(this, pizza.name)} className={color}>
              <p>{pizza.name}</p>
              <p>{pizza.price}</p>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
  */
});

// custom "page"
var Custom = React.createClass({
  getInitialState: function(){
    return {
      cheese: cheeses,
      topping: toppings
    };
  },
  priceRender: function(price){
    var priceFormat = "$"+price+".00";
    return priceFormat;
  },
  customizePizza: function(event){
    event.preventDefault();
    var finalPrice = 10;
    var pizzaStuff = this.state.cheese.concat(this.state.topping);
    var newList = pizzaStuff.forEach((pizzaIngredients)=>{
      //console.log(this.refs);
      if(this.refs[pizzaIngredients.name].checked){
        finalPrice += pizzaIngredients.price;
      }
      //console.log(this.refs[pizzaIngredients.name]);
    })
    console.log(finalPrice);
  },
  render: function() {
    return (
      <div>
        <h1>Create Your Pizza!</h1>
        <form onSubmit={this.customizePizza}>
          <ul>
          <h3>Cheese:</h3>
          {
            this.state.cheese.map((cheese)=>{
              return (
                <li key={cheese.name}>
                  <input type="radio" name="cheese" ref={cheese.name} />
                  <label name="cheese">{cheese.name}: {this.priceRender(cheese.price)}</label>
                </li>
              );
            })
          }
          <h3>Toppings:</h3>
          {
            this.state.topping.map((topping)=>{
              return (
                <li key={topping.name}>
                  <input type="checkbox" name="topping" ref={topping.name}/>
                  <label name="topping">{topping.name}: {this.priceRender(topping.price)}</label>
                </li>
              )
            })
          }
          <input type="Submit"/>
          </ul>
        </form>
      </div>
    );
  }
});

var Done = React.createClass({
  render: function() {
    return (
      <div>
        <h1>You are done!</h1>
        <h5>{userInfo.name}</h5>
        <h5>{userInfo.email}</h5>
        <h5>{userInfo.phoneNumber}</h5>
        <h5>{userInfo.homeAddress}</h5>
        <h3>You ordered: <br/>
          <p>Pizza: {this.props.location.query.pizza}</p>
          <p>Price: {this.props.location.query.price}</p>
        </h3>
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
      <Route path="done" component={Done}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// If this line of code is not here, nothing gets displayed!
ReactDOM.render(routes, document.querySelector('#app'));
