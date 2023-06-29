

function Withdraw() {
    const ctx = React.useContext(UserContext);
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');

    async function handleWithdrawal() {

        var curr_bal = 0;

        // First get the current balance
        try {
          const response = await fetch(`/account/balance/${ctx.email}`);
          const data = await response.json();
          curr_bal = data[0].cbal;
  
          if (!response.ok) {
              setStatus('Could not fetch current balance. Please try again.');
              setTimeout(() => setStatus(''), 3000);
          }
          } catch (error) {
          setStatus('Withdrawal error occurred. Please try again later.');
          setTimeout(() => setStatus(''), 3000);
          console.error(error);
          }

        // The user is logged in; proceed with the deposit
        if (ctx.user) {
          // Check that the withdraw amount is valid
          if (ctx.cbal < 0 || ctx.cbal === '') {
              setStatus ("Please enter positive numbers only");
              setTimeout(() => setStatus(''), 3000);
              return;
          }

          // Withdrawal amount is greater than current balance
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
    
            if (response.ok) {
              setStatus('');
              setShow(false);
            } else {
              setStatus('Withdrawal failed. Please try again.');
              setTimeout(() => setStatus(''), 3000);
            }
          } catch (error) {
            setStatus('An error occurred. Please try again later.');
            setTimeout(() => setStatus(''), 3000);
            console.error(error);
          }
  
        // No user logged in
        } else {
          setStatus('Login to make a withdrawal');
          setTimeout(() => setStatus(''), 3000);
        }
    }
      
    function handleOneMore () {
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="danger"
        header="Withdraw"
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
                className="btn btn-dark"
                onClick={handleWithdrawal}
              >
                Withdraw
              </button>
            </>
          ) : (
            <>
              <h5>Withdrawal successful!</h5><br/>
              <button 
                type="submit"
                className="btn btn-dark"
                onClick={handleOneMore}
              >
                Make another withdrawal
              </button>
            </>
          )
        }
      />
    );
}