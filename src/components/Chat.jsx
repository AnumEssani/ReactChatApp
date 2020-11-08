import React, { Component } from 'react';
import { connect } from 'react-redux';
import Firebase from '../FirebaseConfig'
import {
    Divider,
    AppBar,
    Toolbar,
    Typography,
    Button,
    List,
    Container,
    Grid,
    Paper,
    Avatar,
    IconButton,
    TextField
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SendIcon from '@material-ui/icons/Send';

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatUser: {},
            chats: [],
            message: ""
        }
    }
    onChatClick = (data) => {
        this.setState({ chatUser: data })
        let currentUser = localStorage.getItem('uid');
        let merge_uid = this.uid_merge(currentUser, data.uid);
        this.getMessage(merge_uid)
    }
    getMessage = (uid) => {
        Firebase.database().ref(`chats/${uid}`).on('child_added', snapshot => {
            this.state.chats.push(snapshot.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }
    send_message = () => {
        let user = localStorage.getItem('uid');
        let chat_user = this.state.chatUser;
        let merge_uid = this.uid_merge(user, chat_user.uid);
        Firebase.database().ref(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: localStorage.getItem('name'),
            uid: localStorage.getItem('uid'),
        })
        this.setState({
            message: ""
        })
    }
    uid_merge = (a, b) => {
        console.log(a + b)
        if (a < b) {
            return a + b
        } else {
            return b + a
        }

    }

    Logout = () => {
        Firebase.auth().signOut();
        localStorage.clear()
    }
    render() {
        console.log(this.state.chats)
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <Avatar alt={localStorage.getItem('name')} src={localStorage.getItem('profile')} />
                        <Typography variant="h6" style={{ flexGrow: 1 }}>

                            {localStorage.getItem('name')}
                        </Typography>
                        <Button color="inherit" onClick={this.Logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <main style={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    marginTop: '7%'
                }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={3}>
                                <Paper style={{
                                    display: 'flex',
                                    overflow: 'auto',
                                    flexDirection: 'column',
                                }}>
                                    {Object.values(this.props.Users).map((data, i) => data.uid !== localStorage.getItem('uid') &&
                                        (<><List key={data.name + i} style={{ display: 'flex', alignItems: 'center', padding: '5%' }} >
                                            <Avatar src={data.profile} /> <Typography style={{ marginLeft: '4%' }} variant="h5">
                                                {data.name}
                                            </Typography>
                                            <IconButton onClick={() => this.onChatClick(data)}><ChevronRightIcon /></IconButton>
                                        </List><Divider />
                                        </>))}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                {Object.keys(this.state.chatUser).length ?
                                    <Paper style={{
                                        display: 'flex',
                                        overflow: 'auto',
                                        flexDirection: 'column',
                                        minHeight: 500
                                    }}>
                                        <div style={{ background: '#3f51b5' }}>
                                            <Toolbar>
                                                <Avatar alt={this.state.chatUser.name} src={this.state.chatUser.profile} />
                                                <Typography variant="h6" style={{ flexGrow: 1, color: 'white' }}>

                                                    {this.state.chatUser.name}
                                                </Typography>
                                            </Toolbar>
                                        </div>
                                        <div style={{ height: '412px', overflowY: 'scroll' }}>
                                            {this.state.chats.map((v, i) => {
                                                return (
                                                    <div className={v.uid !== localStorage.getItem('uid') ? 'otherUser' : 'currentUser'}> <p>{v.message}</p></div>
                                                )

                                            })}
                                        </div>
                                        <div style={{ display: 'flex', padding: '20px 20px', background: 'lightgray' }}> <TextField label="Type Your Massage ....." fullWidth value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} /> <IconButton onClick={this.send_message}><SendIcon /></IconButton></div>
                                    </Paper>
                                    : null}
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    Users: state.user,
    currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
