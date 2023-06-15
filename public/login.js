function Login (props){
    const ctx = React.useContext(UserContext); 
    const [currUser, setCurrUser] = React.useState('');
    const [show, setShow]         = React.useState(ctx.auth ? false : true);
    const [status, setStatus]     = React.useState(null);

    function login() {
      if (ctx.email!=='' && ctx.password!=='') {
        const url = `/account/login/${ctx.email}/${ctx.password}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
            if (data.length!==0) {
              ctx.auth=true;
              console.log('Logged in! ' + ctx.email);
              setCurrUser(ctx.email);
              ctx.user = ctx.email;
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

    return (
        <Card
          bgcolor="primary"
          header="Customer Login"
          text=""
          status={status}
          body={
            <>

            {show ? (
                <>
                {status}
                <CardForm setShow={setShow} showName="none" showAmount="none"/>
                {<button type="submit" className="btn btn-light" onClick={login}>Login</button>}
                </>
            ) : (

                <>    
                <h5>You are logged in!</h5><br/>
                <button type="submit" 
                    className="btn btn-light" 
                    onClick={() => {setShow(true); setCurrUser(''); ctx.auth=false; ctx.email=''; ctx.password=''; ctx.user='';}}>Logout</button>
                </>
            )}
            </>
          }
        />
      );
      
}

function LoggedIn(props) {
    const ctx = React.useContext(UserContext); 
  
    return (
        <>    
        <h5>You are logged in!</h5><br/>
        <button type="submit" 
            className="btn btn-light" 
            onClick={() => {props.setShow(true); props.setCurrUser(''); ctx.auth=false; ctx.email=''; ctx.password=''; ctx.user='';}}>Logout</button>
        </>
    )
}