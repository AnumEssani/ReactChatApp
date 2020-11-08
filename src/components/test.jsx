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
                    <form onSubmit={this.handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    type="email"
                                    placeholder="Email"
                                    fullWidth
                                    name="username"
                                    variant="outlined"
                                    value={this.state.username}
                                    onChange={(event) =>
                                        this.setState({
                                            [event.target.name]: event.target.value,
                                        })
                                    }
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    placeholder="Password"
                                    fullWidth
                                    name="password"
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.setState({
                                            [event.target.name]: event.target.value,
                                        })
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="button-block"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                        Forgot Password?
                    </Link>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
</Grid>
