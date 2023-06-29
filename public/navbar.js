function NavBar() {
  const ctx = React.useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = React.useState(ctx.user);
  
  React.useEffect(() => {
    setIsLoggedIn(ctx.user);
  }, [ctx.user, ctx.admin, ctx.email]);
  
  function handleLogout() {
    console.log("Context :", ctx);
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Ultramar Bank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#/CreateAccount/">
                    Create Account
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/login/">
                    Login
                  </a>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#/balance/">
                    Balance
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/deposit/">
                    Deposit
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/withdraw/">
                    Withdraw
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/transfer/">
                    Transfer
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/login/">
                    Logout
                  </a>
                </li>
              </>
            )}
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">
                AllData
              </a>
            </li>
          </ul>
          {isLoggedIn && (
            <span className="navbar-text" style={{ color: 'hotpink' }}>{ctx.email}</span>
          )}
        </div>
      </nav>
  );
}
