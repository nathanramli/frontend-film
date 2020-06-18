import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  state = {
    open: false,
    message: ''
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name){
        if(this.state.open){
          this.setState({open: false});
        }
        this.setState({open: true, message: `Name: ${error.msg.name.join()}`});
      }
      if (error.msg.email){
        if(this.state.open){
          this.setState({open: false});
        }
        this.setState({open: true, message: `Email: ${error.msg.email.join()}`});
      }
      if (error.msg.message){
        if(this.state.open){
          this.setState({open: false});
        }
        this.setState({open: true, message: `Message: ${error.msg.message.join()}`});
      }
      if (error.msg.non_field_errors){
        if(this.state.open){
          this.setState({open: false});
        }
        this.setState({open: true, message: error.msg.non_field_errors.join()});
      }
      if (error.msg.username){
        if(this.state.open){
          this.setState({open: false});
        }
        this.setState({open: true, message: error.msg.username.join()});
      }
    }

    if (message !== prevProps.message) {
      if (message.passwordNotMatch){
        if(this.state.open){
          this.setState({open: false});
        }
        this.setState({open: true, message: message.passwordNotMatch});
      }
    }
  }

  handleClose(event, reason){
    if(reason === 'clickaway'){
      return;
    }

    this.setState({
      open: false
    });
  }

  render() {
    return (
        <div>
          <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose.bind(this)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose.bind(this)}
          >
            <CloseIcon />
          </IconButton>]}
        />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(Alerts);
