function Deposit() {
    const ctx = React.useContext(UserContext);
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
  
    async function handleDeposit() {

      // The user is logged in; proceed with the deposit
      //if (ctx.user) {
      if (ctx.auth) {
        console.log ("Deposit:" + ctx.cbal);
        // Check that the deposit amount is valid
        if (ctx.cbal < 0 || ctx.cbal === null) {
            setStatus ("Please enter positive numbers only");
            setTimeout(() => setStatus(''), 3000);
            return;
        }
        // TBD - probably not needed since the form input type is 'number'
        if (isNaN(ctx.cbal)) {
            setStatus ("Please enter numerical values only");
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        try {
          const response = await fetch(`/account/deposit/${ctx.email}/${ctx.cbal}`);
          const data = await response.json();
          console.log(data);
  
          if (response.ok) {
            setStatus('');
            setShow(false);
          } else {
            setStatus('Deposit failed. Please try again.');
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          setStatus('An error occurred. Please try again later.');
          setTimeout(() => setStatus(''), 3000);
          console.error(error);
        }

      // No user logged in
      } else {
        setStatus('Login to make a deposit');
        setTimeout(() => setStatus(''), 3000);
      }
    }

    
    function handleOneMore () {
      setShow(true);
    }
  
    // TBD - disable submit button if empty amount?
    return (
      <Card
        bgcolor="success"
        header="Deposit"
        text=""
        status={status}
        body={
          show ? (
            <>
              <CardForm
              showAcctType="none"
              showName="none" 
              showEmail="none"
              showXfrEmail="none"
              showPassword="none"
              />

              <button
                type="submit"
                className="btn btn-light"
                onClick={handleDeposit}
              >
                Deposit
              </button>
            </>
          ) : (
            <>
              <h5>Deposit successful!</h5><br/>
              <button 
                type="submit"
                className="btn btn-light"
                onClick={handleOneMore}
              >
                Make another deposit
              </button>
            </>
          )
        }
      />
    );
}