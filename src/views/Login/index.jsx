import Icon from "@material-ui/core/Icon";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import LocalOffer from "@material-ui/icons/LocalOffer";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { userActions } from "../../actions";

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

  render() {
    const { classes, loggingIn, error } = this.props;
    const  { email, password, submitted } = this.state;
    return (
      <div className={classes.root}>
        {error}
        <GridContainer>
          <GridItem xs={8} sm={8} md={8} >
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>lock</Icon>
                </CardIcon>
                <Grid  container spacing={24}>
                <form method="POST" onSubmit={this.handleSubmit} className={classes.formControlGroup}>
                  <Grid item xs={12}>
                  <label>Email:</label> 
                  <input type="email" 
                    name="email"
                    className={classes.formControl}                     
                    onChange={this.handleChange}/>  
                    {submitted &&
                      !email && (
                        <div className={classes.helpBlock}>Email requerido</div>
                      )}  
                  </Grid>
                  <Grid item xs={12}>
                    <label>Password:</label> 
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
                      Login
                    </Button>
                    {loggingIn && (
                      <img alt="logging" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    )}
                  </Grid>
                  </form>
                </Grid>
                
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Recordar password
                </div>
                <div className={classes.stats}>
                  <LocalOffer />
                  <Link to="/register" className="btn btn-link">
                      Registrar
                  </Link>
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
  const { loggingIn, error } = state.authentication;
  const { email, password } = state;
  console.dir(state);
  return {
    email,
    password,
    loggingIn,
    error
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(dashboardStyle)(Login));
