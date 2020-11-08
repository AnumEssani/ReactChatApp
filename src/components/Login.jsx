import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import Firebase from '../FirebaseConfig';


class Login extends Component {
    constructor(props) {
        super(props)
    }
    handleFacebookLogin = () => {
        let provider = new Firebase.auth.FacebookAuthProvider();
        let dispatch = this.props.getUserLogin;
        Firebase.auth().signInWithPopup(provider).then(function (result) {
            let user = result.user;
            let data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                profile: user.photoURL
            }
            localStorage.setItem("email", user.email)
            localStorage.setItem("uid", user.uid)
            localStorage.setItem('profile', user.photoURL)
            localStorage.setItem('name', user.displayName)
            Firebase.database().ref(`/users/${data.uid}/`).set(data)
            dispatch(data)
        }).catch(function (error) {
            console.log(error)
        });
    }
    handleGoogleLogin = () => {
        let provider = new Firebase.auth.GoogleAuthProvider();
        const dispatch = this.props.getUserLogin;
        Firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;
            let data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                profile: user.photoURL
            }
            localStorage.setItem("email", user.email)
            localStorage.setItem("uid", user.uid)
            localStorage.setItem('profile', user.photoURL)
            localStorage.setItem('name', user.displayName)
            Firebase.database().ref(`/users/${data.uid}/`).set(data)
            dispatch(data)
        }).catch(function (error) {
            console.log(error)
        });

    }
    render() {
        console.log(this.props)
        return (
            <Grid container justify="center" wrap="wrap">
                <Grid item>
                    <Grid container spacing={0} justify="center" direction="row">
                        <Grid item>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                spacing={2}
                                className="login-form"
                            >
                                <Paper
                                    variant="elevation"
                                    elevation={2}
                                    className="login-background"
                                >
                                    <Grid item>
                                        <Typography component="h1" variant="h5">
                                            Sign in
                                         </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="secondary" className="button-block" onClick={this.handleGoogleLogin}><EmailIcon /> Google Login</Button>
                                        <Button variant="contained" color="primary" className="button-block" onClick={this.handleFacebookLogin}><FacebookIcon /> Facebook Login</Button>
                                    </Grid>

                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid >

                </Grid >
            </Grid >
        )
    }
}

const mapStateToProps = (state) => ({

})


const mapDispatchToProps = dispatch => ({
    getUserLogin: (data) => dispatch({ type: 'GETLOGEDINUSER', paylod: data })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
