const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Card(props) {
  function getClasses() {
    const bg = props.bgcolor ? ' bg-' + props.bgcolor : '';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3' + bg + txt;
  }

  return (
    <div className={getClasses()} style={{ maxWidth: "18rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.caccnt && <p className="card-text">{props.caccnt}</p>}
        {props.cbal && <p className="card-text">{props.cbal}</p>}
        {props.status ? (
          <div id="createStatus">{props.status}</div>
        ) : (
          <br/>
        )}
        {props.body}
        <br/>
      </div>
    </div>
  );
}

function CardForm(props) {
  const ctx = React.useContext(UserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [xfremail, setXfrEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [selectedAccounts, setSelectedAccounts] = React.useState([]);

  const handleNameChange = (e) => {
    setName(e.currentTarget.value);
    ctx.setName(e.currentTarget.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value);
    ctx.setEmail(e.currentTarget.value);
  };

  const handleXfrEmailChange = (e) => {
    setXfrEmail(e.currentTarget.value);
    ctx.setXfrEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
    ctx.setPassword(e.currentTarget.value);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.currentTarget.value);
    ctx.setBalance(e.currentTarget.value);
  };

  const handleAccountChange = (e) => {
    const selectedAccount = e.currentTarget.value;
    const isChecked = e.currentTarget.checked;

    if (isChecked) {
      setSelectedAccounts((prevSelectedAccounts) => [
        ...prevSelectedAccounts,
        selectedAccount,
      ]);
    } else {
      setSelectedAccounts((prevSelectedAccounts) =>
        prevSelectedAccounts.filter((account) => account !== selectedAccount)
      );
    }
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here using the form data (name, email, password, balance, selectedAccounts)
    // Use the state values (name, email, password, balance, selectedAccounts) or pass them as arguments to a function
    // Reset the form fields if needed
    setName('');
    setEmail('');
    setPassword('');
    setBalance('');
    setSelectedAccounts([]);
  };
  */

  return (
    <>
      <div style={{ maxWidth: '20rem' }}>

      <div className="account-field" style={{ display: props.showAcctType }}>
          Account Type (check at least one):<br />
          <label>
            <input
              type="checkbox"
              value="savings"
              checked={selectedAccounts.includes('savings')}
              onChange={handleAccountChange}
            />
            Savings
          </label>

          <label style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              value="checking"
              checked={selectedAccounts.includes('checking')}
              onChange={handleAccountChange}
            />
            Checking
          </label>
        </div>

        <div className="name-field" style={{ display: props.showName }}>
          Name<br />
          <input
            id="name"
            type="input"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
          />
          <br />
        </div>

        <div className="email-field" style={{ display: props.showEmail }}>
          Email address<br />
          <input
            type="input"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
        </div>

        <div className="email-field" style={{ display: props.showXfrEmail }}>
          Recipient's email address<br />
          <input
            type="input"
            className="form-control"
            placeholder="Enter recepient's email"
            value={xfremail}
            onChange={handleXfrEmailChange}
          />
          <br />
        </div>

        <div className="password-field" style={{ display: props.showPassword }}>
          Password<br />
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
        </div>

        <div className="amount-field" style={{ display: props.showAmount }}>
          Amount<br />
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={balance}
            onChange={handleBalanceChange}
          />
          <br />
        </div>
      </div>
    </>
  );
}

