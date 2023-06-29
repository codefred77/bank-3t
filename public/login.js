
function Login (props){
    const ctx = React.useContext(UserContext); 
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState(null);
  
    React.useEffect(() => {
      setShow(!ctx.user);
    }, [ctx.user]);
    
    /****************************************************************
    const { initializeApp } = require("firebase-app");

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBGEcz9e7yzBF-kE3DkZ4yBCbSYSaCwoBM",
      authDomain: "gauth-714.firebaseapp.com",
      projectId: "gauth-714",
      storageBucket: "gauth-714.appspot.com",
      messagingSenderId: "632673277868",
      appId: "1:632673277868:web:e2fde4d047af56f2130c09"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    ****************************************************************/

    function handleLogin() {
      if (ctx.email!=='' && ctx.password!=='') {
        const url = `/account/login/${ctx.email}/${ctx.password}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log("Login component - data: ", data);
            if (data.length!==0) {
              ctx.setUser (true);
              console.log("Logged in!", ctx.email);
              if (data[0].admin) {
                ctx.setAuth(true);
                console.log("User is admin");
              }
              console.log("Context :", ctx);
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

    /****************************************************************
    function handleGoogleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // Handle successful authentication
          console.log(result.user);
          ctx.setUser(true);
        })
        .catch((error) => {
          // Handle authentication error
          console.log(error);
          setStatus('Google sign-in failed');
          setTimeout(() => setStatus(null), 3000);
        });
    } 
    ****************************************************************/

    function handleLogout() {
      console.log("Context :", ctx);
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
                    onClick={handleLogin}
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
