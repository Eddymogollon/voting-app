import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Home from './Home';
import MyPolls from './MyPolls';
import Poll from './Poll';
import NewPoll from './NewPoll';
import * as actions from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/mypolls" component={MyPolls} />
            <Route path="/mypolls/:pollId" component={Poll} />
            <Route exact path="/newpoll" component={NewPoll} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
