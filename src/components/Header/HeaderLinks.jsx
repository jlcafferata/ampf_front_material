import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter  } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import Button from "components/CustomButtons/Button.jsx";

import { connect } from 'react-redux';

import { userActions } from "../../actions";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleCloseSession = event => {
    this.props.dispatch(userActions.logout());
    this.props.history.push("/login");
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const {email} = this.props;
    return (      
      <div>
        
        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow-user" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <div className={classes.userEmail}>{email}</div>
            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
              Perfil</p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow-user"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Ver perfil
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseSession}
                        className={classes.dropdownItem}
                      >
                        Cerrar sesi&oacute;n
                      </MenuItem>                      
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user, error} = state.authentication;
  let token='', email='';
  if(user){
    token=user.token;
    email=user.email
  }  
  return {
    loggedIn,    
    error,
    token,
    email
  };
}

export default connect(
  mapStateToProps,
  null
)(withRouter(withStyles(headerLinksStyle)(HeaderLinks)));

