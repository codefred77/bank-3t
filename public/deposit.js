function Deposit() {
    const ctx = React.useContext(UserContext);
    const [status, setStatus] = React.useState('');
  
    async function handleDeposit() {

      // The user is logged in; proceed with the deposit
      if (ctx.user) {
        console.log ("Deposit:" + ctx.balance);
        // Check that the deposit amount is valid
        if (ctx.balance < 0 || ctx.balance === null) {
            setStatus ("Please enter positive numbers only");
            setTimeout(() => setStatus(''), 2000);
            return;
        }
        // TBD - probably not needed since the form input type is 'number'
        if (isNaN(ctx.balance)) {
            setStatus ("Please enter numerical values only");
            setTimeout(() => setStatus(''), 2000);
            return;
        }

        try {
          const response = await fetch(`/account/deposit/${ctx.user}/${ctx.balance}`);
          const data = await response.json();
          console.log(data);
  
          if (response.ok) {
            setStatus(`$${ctx.balance} deposit successful!`);
            setTimeout(() => setStatus(''), 2000);
          } else {
            setStatus('Deposit failed. Please try again.');
            setTimeout(() => setStatus(''), 2000);
          }
        } catch (error) {
          setStatus('An error occurred. Please try again later.');
          setTimeout(() => setStatus(''), 2000);
          console.error(error);
        }

      // No user logged in
      } else {
        setStatus('Login to make a deposit');
        setTimeout(() => setStatus(''), 2000);
      }
    }
  
    // TBD - disable submit button if empty amount?
    return (
      <Card
        bgcolor="success"
        header="Deposit"
        text=""
        status={status}
        body={
          <>
            <CardForm 
                showName="none" 
                showPassword="none" 
                showEmail="none" />
            <button 
                type="submit" 
                className="btn btn-light" 
                onClick={handleDeposit}>
                Deposit
            </button>
          </>
        }
      />
    );
}