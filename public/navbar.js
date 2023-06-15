function NavBar(){
    const ctx = React.useContext(UserContext); 

    return(
      <>
      <h1>{ctx.user}</h1>
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
              <a className="nav-link" href="#/balance/">
                Balance
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">
                AllData
              </a>
            </li>
          </ul>
          <span className="navbar-text">{ctx.user}</span>
        </div>
      </nav>
      </>
    );
}