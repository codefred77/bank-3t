function Login (props){
    const ctx = React.useContext(UserContext); 
    const [show, setShow] = React.useState(ctx.auth ? false : true);
    const [status, setStatus] = React.useState(null);

    function handleLogin() {
      if (ctx.email!=='' && ctx.password!=='') {
        const url = `/account/login/${ctx.email}/${ctx.password}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
            if (data.length!==0) {
              //ctx.auth=true;
              ctx.setAuth (true);
              console.log('Logged in! ' + ctx.email);
              //ctx.user = ctx.email;
              //ctx.setUser = ctx.email;
              setShow(false);
            } else {
              setStatus('Login failed: Enter a valid username and password');
              setTimeout(() => setStatus(null),3000);          
            }
        })();

      } else {
        setStatus('Enter an email and password');
        setTimeout(() => setStatus(null),3000);
      }
      
    }

    function handleGoogleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // Handle successful authentication
          console.log(result.user);
          ctx.setAuth(true);
          setShow(false);
        })
        .catch((error) => {
          // Handle authentication error
          console.log(error);
          setStatus('Google sign-in failed');
          setTimeout(() => setStatus(null), 3000);
        });
    }

    function handleLogout() {
      setShow(true);
      ctx.setAuth(false);
      ctx.setUser(false);
      ctx.setName('');
      ctx.setEmail('');
      ctx.setPassword('');
      ctx.setCBal('0');
      ctx.setCNum('0000000000')
    }

      return (
        <Card
          bgcolor="primary"
          header = {show ? "Customer Login" : "Customer Logout"}
          text=""
          status={status}
          body={
            <>
              {show ? (
                <>
                  <CardForm
                    setShow={setShow}
                    showAcctType="none"
                    showName="none"
                    showXfrEmail="none"
                    showAmount="none"
                  />
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={handleGoogleLogin}
                    style={{marginLeft: '15px'}}
                  >
                    Sign in with Google
                  </button>
                </>
              ) : (
                <>
                  <h5>You are logged in!</h5>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          }
        />
      );
      
}
