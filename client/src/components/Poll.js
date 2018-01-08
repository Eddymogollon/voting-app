import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import Chart from 'chart.js';
import { Input, Header, Container, Segment, Button, Icon } from 'semantic-ui-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import randomColor from 'random-color';
import { Redirect } from 'react-router';

class Poll extends Component {

  componentDidMount() {
    this.props.fetchPoll(this.props.match.params.pollId);
  }
  
  async handleRemove() {
    let pollId = this.props.polls.poll._id;

    await axios.post('/api/remove-poll', { pollId });
    this.props.history.push('/');
  }

  handleTwitter(e) {
    const origin = window.location.origin;
    const url = this.props.location.pathname;
    const title = this.props.polls.poll.title;
    const message = `${title} %7C voting-app ${origin}${url}`;
    const twitterUrl = 'https://twitter.com/intent/tweet?text=';
    
    window.open(`${twitterUrl}${message}`, '_blank');
  }

  async handleSubmit() {
    console.log(this.props);
    const option = document.getElementById('votefor').value;
    const vote = {
      pollId: this.props.polls.poll._id,
      option
    };

    this.props.addVote(vote);
    document.getElementById('votefor').value = "";
  }

  renderPoll() {
    
    const { polls, auth } = this.props;
    const { poll } = polls;

    const showRemoveButton = auth && poll && auth._id == poll.ownerId ? true : false;

    if (!poll) {
      return <p>Loading...</p>;
    }

    let labels = [];
    let data = [];
    let backgroundColor = [];

    poll.options.map(option => {
      labels.push(option.option);
      data.push(option.votes);
      let color = randomColor();
      backgroundColor.push(color.rgbString());
    });

    console.log(backgroundColor);

    let doughnutData = {
      labels,
      "datasets": [
        {"label":"Poll Chart",
         data,
         backgroundColor}
        ]
      }

    return (
      <div>
        <Header size='large'>{poll.title}</Header>  
        <h4>I'd like to vote for:</h4>
        <Input id="votefor" list='options' placeholder='Choose an option...' />
        <datalist id='options'>
        {poll.options.map((option, i) => {
          return <option key={i} value={option.option} />
        })}
        </datalist>

        <br />
        <Button primary onClick={this.handleSubmit.bind(this)}>Submit</Button><br/>
        <Button color='twitter' onClick={this.handleTwitter.bind(this)}>
          <Icon name='twitter' /> Share on Twitter
        </Button><br/>
        { showRemoveButton ? <Button negative onClick={this.handleRemove.bind(this)}>Remove this poll</Button> : ''}
        <div style={{"width": "400px", "height": "250px"}}>
        <Doughnut data={doughnutData} />
        </div>

      </div>
    )
  }

  render() {
    console.log("Updated props");
    const { poll } = this.props.polls;
    console.log(poll);

    return (
      <div>
        <Container fluid style={styles.containerStyle} >
          <Segment stacked>
            
            {this.renderPoll()}
    
          </Segment>
        </Container>

      </div>
    );
  }
}

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

export default connect(mapStateToProps, actions)(Poll);
/*
<p>{poll.title}</p>
*/