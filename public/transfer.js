function Transfer() {
    const ctx = React.useContext(UserContext);
    const [status, setStatus] = React.useState('');
  

    async function handleWithdrawal() {

        console.log ("Transfer (pt 1 of 2):" + ctx.balance);
        // Check that the withdraw amount is valid
        if (ctx.balance < 0 || ctx.balance === null) {
            setStatus ("Please enter positive numbers only");
            setTimeout(() => setStatus(''), 3000);
            return;
        }
        // TBD - probably not needed since the form input type is 'number'
        if (isNaN(ctx.balance)) {
            setStatus ("Please enter numerical values only");
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        try {
        const response = await fetch(`/account/withdraw/${ctx.email}/${ctx.balance}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setStatus(`$${ctx.balance} withdrawal part of transfer successful!`);
            setTimeout(() => setStatus(''), 3000);
        } else {
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

        console.log ("Transfer (pt 2 of 2):" + ctx.balance);
        // Check that the transfer amount is valid
        if (ctx.balance < 0 || ctx.balance === null) {
            setStatus ("Please enter positive numbers only");
            setTimeout(() => setStatus(''), 3000);
            return;
        }
        // TBD - probably not needed since the form input type is 'number'
        if (isNaN(ctx.balance)) {
            setStatus ("Please enter numerical values only");
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        try {
          const response = await fetch(`/account/deposit/${ctx.xfremail}/${ctx.balance}`);
          const data = await response.json();
          console.log(data);
  
          if (response.ok) {
            setStatus(`$${ctx.balance} transfer successful!`);
            setTimeout(() => setStatus(''), 3000);
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
  
    // TBD - disable submit button if empty amount?
    return (
      <Card
        bgcolor="warning"
        header="Transfer Funds"
        text="Transfers are limited to checking-to-checking"
        status={status}
        body={
          <>
            <CardForm 
                showAcctType="none"
                showName="none" 
                showEmail="none"
                showPassword="none" 
            />
            <button 
                type="submit" 
                className="btn btn-light" 
                onClick={handleTransfer}>
                Transfer
            </button>
          </>
        }
      />
    );
}