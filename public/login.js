function Login (props){
    const ctx = React.useContext(UserContext); 
    const [currUser, setCurrUser] = React.useState('');
    const [show, setShow]         = React.useState(ctx.auth ? false : true);
    const [status, setStatus]     = React.useState(null);

    function handleLogin() {
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

    function handleLogout() {
      setShow(true);
      setCurrUser('');
      ctx.auth=false;
      ctx.email='';
      ctx.password='';
      ctx.user='';
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
                <CardForm setShow={setShow} showName="none" showAmount="none"/>
                  {<button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>}
                </>
            ) : (
                <>    
                <h5>You are logged in!</h5><br/>
                <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button>
                </>
            )}
            </>
          }
        />
      );
      
}
