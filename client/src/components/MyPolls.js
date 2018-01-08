import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Container, Loader, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MyPolls extends Component {

  componentDidMount() {
    this.props.fetchUserPolls();
  }

  renderPolls() {
    const { userPolls } = this.props.polls;

    if (!userPolls) {
      return (
        <Loader active style={{"marginTop": "150px"}}/>
      );
    }

    return (
      <div className="ui fluid vertical menu">
        {userPolls.map((poll, i) => {
          return <Link key={i} to={`/mypolls/${poll._id}`} className="item">{poll.title}</Link>
        })}
      </div>
    );
  }

  render() {

    console.log(this.props);

    return (
      <div>
        <Container fluid style={styles.containerStyle} >
          <Segment stacked>
            <Header size='huge'>Eddy's Voting App</Header>
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

export default connect(mapStateToProps, actions)(MyPolls);