import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from './redux/user/user.selector';



import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';


const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component.jsx'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))
const ImagesPage = lazy(() => import('./pages/images/imagespage.component'))

class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount(){
 
    
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
          const userRef = await createUserProfileDocument(userAuth); 

          userRef.onSnapshot(snapShot => {
              setCurrentUser({
                  id: snapShot.id,
                  ...snapShot.data()
              });

          });
  
      }
      console.log(userAuth);
      setCurrentUser(userAuth); 
     
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return(<div>
      <Header />
      <Switch>
        <Suspense fallback={<div>..loading</div>}>
          <Route exact path = '/' component={HomePage} />
          <Route exact path = '/images' component={ImagesPage} />
          <Route  path = '/shop' component={ShopPage} />
          <Route exact path = '/checkout' component={CheckoutPage} />
          

          <Route  path = '/signin' render={() => this.props.currentUser ? 
                                          (<Redirect to = '/' />) :
                                          (<SignInAndSignUpPage />)} 
          />
        </Suspense>
      </Switch>
    </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})


const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
