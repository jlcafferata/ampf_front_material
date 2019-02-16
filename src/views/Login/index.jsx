import Icon from "@material-ui/core/Icon";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import PowerOff from "@material-ui/icons/PowerOff";
import PermIdentity from "@material-ui/icons/PermIdentity";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// core components
import { Link, withRouter  } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { userActions } from "../../actions";

import logo from "../../assets/img/logoAmpf.png";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    submitted: false
  };

  constructor(props) {
    super(props);
    // reset login status
    this.props.dispatch(userActions.logout());
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let {name, value} = event.target;
    switch(name){
      case "email":
        this.setState({email: value});
      break;    
      case "password":
        this.setState({password: value});
      break; 
      default:
      break;   
    }
  };

  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.authenticate(this.state));
    }
  }

  componentWillReceiveProps(){
    if(this.props.token && !this.props.error){
      this.props.history.push("/user");
    }
  }

  render() {
    const { classes, loggingIn, error} = this.props;
    const  { email, password, submitted } = this.state;
    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={9} md={9} >
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger" >
                  <Icon id="iconoLogin">lock</Icon>                     
                </CardIcon>
                <img src={logo} alt="AMPF"/>
                <div className={classes}>AMPF</div>
                <Grid  container spacing={24}>
                <form method="POST" onSubmit={this.handleSubmit} className={classes.formControlGroup}>
                  <Grid item xs={12} sm={12} md={12}>
                  <label className={classes.labelFormControl}>Email:</label> 
                  <input type="email" 
                    name="email"
                    className={classes.formControl}                     
                    onChange={this.handleChange}/>  
                    {submitted &&
                      !email && (
                        <div className={classes.helpBlock}>Email requerido</div>
                      )}  
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <label className={classes.labelFormControl}>Password:</label> 
                    <input type="password"
                    className={classes.formControl}
                    name="password"
                    onChange={this.handleChange}
                    />
                     {submitted &&
                      !password && (
                        <div className={classes.helpBlock}>Password requerido</div>
                      )}
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" color="default" className={classes.button}>
                      Aceptar
                    </Button>
                    {loggingIn && (
                      <img alt="logging" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    )}
                  </Grid>
                  {error && (
                    <div className={classes.helpBlock}>{error}</div>
                  )}
                  </form>
                </Grid>
                
              </CardHeader>
              <CardFooter stats>
                <div style={{width:"100%"}}> 
                  <div className={classes.buttonBottomBar}>
                    <PowerOff />
                    <Link to="/remember">
                      Olvidaste tu constrase&ntilde;a?
                    </Link>
                  </div>
                  <div className={classes.buttonBottomBar}>
                    <PermIdentity />
                    <Link to="/register" >
                       Registrar
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { loggingIn, error, user } = state.authentication;
  const { email, password } = state;
  let token='';
  if(user){
    token=user.token;
  }  
  return {
    email,
    password,
    loggingIn,
    error,
    token
  };
}

export default connect(
  mapStateToProps,
  null
)(withRouter(withStyles(dashboardStyle)(Login)));
