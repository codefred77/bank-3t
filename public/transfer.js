function Transfer() {
    const ctx = React.useContext(UserContext);
    const [show, setShow] = React.useState(true);
    const [srcBal, setSrcBal] = React.useState('');
    const [status, setStatus] = React.useState('');
  

    async function handleWithdrawal() {

        var curr_bal = 0;  
      
        console.log ("Transfer (pt 1 of 2):" + ctx.cbal);

        // First get the current balance for the source account
        try {
          const response = await fetch(`/account/balance/${ctx.email}`);
          const data = await response.json();
          curr_bal = data[0].cbal;
  
          if (!response.ok) {
              setStatus('Could not fetch current balance. Please try again.');
              setTimeout(() => setStatus(''), 3000);
          }
          } catch (error) {
          setStatus('Transfer error occurred. Please try again later.');
          setTimeout(() => setStatus(''), 3000);
          console.error(error);
          }

        
        // Check that the withdraw amount is valid
        if (ctx.cbal < 0 || ctx.cbal === null) {
            setStatus ("Please enter positive numbers only");
            setTimeout(() => setStatus(''), 3000);
            return;
        }
        // Source account does not have sufficient funds
        if (ctx.cbal > curr_bal) {
            setStatus ("Insufficient funds");
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
        const response = await fetch(`/account/withdraw/${ctx.email}/${ctx.cbal}`);
        const data = await response.json();
        console.log(data);
        setSrcBal(data.cbal);

        if (!response.ok) {
            setStatus('Withdrawal part of transfer failed. Please try again.');
            setTimeout(() => setStatus(''), 3000);
        }
        } catch (error) {
        setStatus('Code 001: An error occurred. Please try again later.');
        setTimeout(() => setStatus(''), 3000);
        console.error(error);
        }

    }
    
    async function handleTransfer() {
      // The user is logged in; proceed with the deposit
      if (ctx.auth) {
        // First subtract amount from sender's account
        handleWithdrawal();

        console.log ("Transfer (pt 2 of 2):" + ctx.cbal);
        // Check that the transfer amount is valid
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
          const response = await fetch(`/account/deposit/${ctx.xfremail}/${ctx.cbal}`);
          const data = await response.json();
          console.log(data);
  
          if (response.ok) {
            //setStatus(`$${ctx.cbal} transfer successful!`);
            //setTimeout(() => setStatus(''), 3000);
            setStatus('');
            setShow(false);
          } else {
            setStatus('Transfer failed. Please try again.');
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          setStatus('Code 002: An error occurred. Please try again later.');
          setTimeout(() => setStatus(''), 3000);
          console.error(error);
        }

      // No user logged in
      } else {
        setStatus('Login to make a transfer');
        setTimeout(() => setStatus(''), 3000);
      }
    }

    function handleOneMore () {
      setShow(true);
    }
  
    // TBD - disable submit button if empty amount?
    return (
      <Card
        bgcolor="warning"
        header="Transfer Funds"
        text=""
        status={status}
        body={
          show ? (
            <>
              <CardForm
                showAcctType="none"
                showName="none"
                showEmail="none"
                showPassword="none"
                showAmount="block"
              />

              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleTransfer}
              >
                Transfer
              </button>
            </>
          ) : (
            <>
              <h5>Transfer successful!</h5><br/>
              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleOneMore}
              >
                Make another transfer
              </button>
            </>
          )
        }
      />
    );
}
