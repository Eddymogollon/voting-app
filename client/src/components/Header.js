import React, { Component } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderHeader() {

    const { activeItem } = this.state;

    switch (this.props.auth) {
      case null || false:
        return;
      default:
        return [
          <Menu.Item key={1} name='my polls' as={Link} to='/mypolls' active={activeItem === 'my polls'} onClick={this.handleItemClick}/>,
          <Menu.Item key={2} name='new poll' as={Link} to='/newpoll' active={activeItem === 'new poll'} onClick={this.handleItemClick}/>
        ];
    }
  }

  renderLogin() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Menu.Item>
            <a href="/auth/google">
            <Button color='google plus'>
              <Icon name='google plus' />
              Sign In</Button>
            </a>
          </Menu.Item>
        );
      default:
        return (
        <Menu.Item name='logout'>
          <a href="/api/logout"><Button>Logout</Button></a>
        </Menu.Item>
        ); 
    }
  }

  render() {
    
    const { activeItem } = this.state;
    console.log(this.props);
    return (
        <Menu secondary style={styles.headerStyle}>
          <Menu.Item header>Voting App</Menu.Item>
          <Menu.Item name='home' as={Link} to='/' active={activeItem === 'home'} onClick={this.handleItemClick} />
          
          {this.renderHeader()}

          <Menu.Menu position='right'>
            {this.renderLogin()}
          </Menu.Menu>
            
        </Menu>
    );
  }
}

const styles = {
  headerStyle: {
    "borderWidth": "0px 0px 1px 0px",
    "borderColor": "#eee"
  }
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(Header);