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
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState('');

  const handleNameChange = (e) => {
    setName(e.currentTarget.value);
    ctx.name = e.currentTarget.value;
  };

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value);
    ctx.email = e.currentTarget.value;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
    ctx.password = e.currentTarget.value;
  };

  const handleBalanceChange = (e) => {
    setBalance(e.currentTarget.value);
    ctx.balance = e.currentTarget.value;
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here using the form data (name, email, password, balance)
    // Use the state values (name, email, password, balance) or pass them as arguments to a function
    // Reset the form fields if needed
    setName('');
    setEmail('');
    setPassword('');
    setBalance('');
  };
  */

  
  return (
    <>
      <div style={{ maxWidth: "18rem" }}>
        <div className="name-field" style={{ display: props.showName }}>
          Name<br />
          <input
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


/*
const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Card(props){

    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{maxWidth: "18rem"}}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>  
      </div>      
    );    
}
  
function CardForm(props) {
    const ctx = React.useContext(UserContext);  

    return (
      <>
      <div style={{maxWidth: "18rem"}}>
      <div className="name-field" style={{display: props.showName}}>
        Name<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter name" 
          onChange={e => ctx.name=e.currentTarget.value} /><br/>
      </div>

      <div className="email-field" style={{display: props.showEmail}}>
        Email address<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter email" 
          onChange={e => ctx.email=e.currentTarget.value}/><br/>
      </div>

      <div className="password-field" style={{display: props.showPassword}}>
        Password<br/>
        <input type="password" 
          className="form-control" 
          placeholder="Enter password" 
          onChange={e => ctx.password=e.currentTarget.value}/><br/>
      </div>

      <div className="amount-field" style={{display: props.showAmount}}>
        Amount<br/>
        <input type="number" 
          className="form-control" 
          placeholder="Enter amount"
          value={ctx.balance}
          onChange={e => ctx.balance=e.currentTarget.value}/><br/>
      </div>
      </div>
      </>
    )
}
*/