function Transfer() {
    const ctx = React.useContext(UserContext);
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    
    var curr_bal = 0;  

    async function validateDstUser() {
      console.log("Transfer (pt 0 of 3):");
    
      try {
        console.log("xfremail: ", ctx.xfremail);
        const response = await fetch(`/account/find/${ctx.xfremail}`);
        const data = await response.json();
        const tmpdata = await data;
        console.log("--> data: ", tmpdata);
        const len = data.length;
        console.log("--> len:", len);
    
        if (len > 0) {
          return true;
        }
    
        setStatus('User not found. Please enter a valid email.');
        setTimeout(() => setStatus(''), 3000);
        return false;
      } catch (error) {
        setStatus('Find user error occurred. Please try again later.');
        setTimeout(() => setStatus(''), 3000);
        console.error(error);
        return false;
      }
    }
    

    async function getSrcBalance() {

      console.log ("Transfer (pt 1 of 3):" + ctx.cbal);

      try {
        const response = await fetch(`/account/balance/${ctx.email}`);
        const data = await response.json();
        const balance = await data;
        curr_bal = balance[0].cbal;
        console.log("Sender's balance: ", curr_bal);
    
        if (!response.ok) {
          setStatus('Could not fetch current balance. Please try again.');
          setTimeout(() => setStatus(''), 3000);
        }
        } catch (error) {
          setStatus('Transfer error occurred. Please try again later.');
          setTimeout(() => setStatus(''), 3000);
          console.error(error);
        }
    }

    async function handleWithdrawal() {

        console.log ("Transfer (pt 2 of 3):" + ctx.cbal);

        try {
        const response = await fetch(`/account/withdraw/${ctx.email}/${ctx.cbal}`);
        const data = await response.json();
        console.log(data);

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
      if (ctx.user) {
        // Handle the case where the source user is not valid
        const isValidDstUser = await validateDstUser();
        if (!isValidDstUser) {
          setStatus ("Invalid recipient email address");
          setTimeout(() => setStatus(''), 3000);
          return;
        }

        // Check that the transfer amount is valid
        if (ctx.cbal < 0 || ctx.cbal === '') {
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

        // First get the sender's account balance
        await getSrcBalance();

        // Source account does not have sufficient funds
        if (ctx.cbal > curr_bal) {
          console.log("--ctx.cbal ", ctx.cbal);
          console.log("--curr_bal ", curr_bal);
          setStatus ("Insufficient funds");
          setTimeout(() => setStatus(''), 3000);
          return;
        }

        // First subtract amount from sender's account
        await handleWithdrawal();

        console.log ("Transfer (pt 3 of 3):" + ctx.cbal);

        try {
          const response = await fetch(`/account/deposit/${ctx.xfremail}/${ctx.cbal}`);
          const data = await response.json();
          console.log(data);
  
          if (response.ok) {
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
