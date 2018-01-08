import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Container, Loader, Header, Segment, Form, TextArea, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class NewPoll extends Component {

  async handleSubmit(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let options = [];

    document.getElementById('options').value.split('\n').map(option => {
      options.push({option});
    });

    console.log({
      title, options
    });
    const poll = {title, options};

    await axios.post('/api/create-poll', poll);
    this.props.history.push('/');

  }

  render() {

    console.log(this.props);

    return (
      <div>
        <Container fluid style={styles.containerStyle} >
          <Segment stacked>
            <Header size='huge'>Make a new poll!</Header>
            <Form onSubmit={this.handleSubmit.bind(this)} >
              <Form.Field>
                <label>Title:</label>
                <Form.Input id="title" name="title" type="text"/>
              </Form.Field>
              <Form.Field>
                <label>Options (separated by line):</label>
                <TextArea id="options" />
              </Form.Field>
              <Button type='submit'>Make!</Button>  
            </Form>
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

export default connect(mapStateToProps, actions)(NewPoll);