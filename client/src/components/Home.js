import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Container, Loader, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends Component {

  componentDidMount() {
    this.props.fetchAllPolls(); 
  }

  renderPolls() {
    console.log(this.props);
    const { allPolls } = this.props.polls;

    if (!allPolls) {
      return (
        <Loader active style={{"marginTop": "150px"}}/>
      );
    }

    return (
      <div className="ui fluid vertical menu">
        {allPolls.map((poll, i) => {
          return <Link key={i} to={`/mypolls/${poll._id}`} className="item">{poll.title}</Link>
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Container fluid style={styles.containerStyle} >
          <Segment stacked>
            <Header size='huge'>Eddy's Voting App</Header>
            <Header size='medium'>Below are polls you own.</Header>
            <Header size='medium'>Select a poll to see the results and vote, or make a new poll!</Header>
            {this.renderPolls()}
          </Segment>
        </Container>
      </div>
    );
  }
};

const styles = {
  containerStyle: {
    "backgroundColor": "#eee",
    "width": "95%",
    "marginTop": "30px",
    "borderRadius": "10px",
    "padding": "20px"
  }
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(Home);