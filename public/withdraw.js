function Withdraw() {
    const ctx = React.useContext(UserContext);
    const [status, setStatus] = React.useState('');

    async function handleWithdrawal() {

        // The user is logged in; proceed with the deposit
        if (ctx.user) {
          console.log ("Whitdraw:" + ctx.balance);
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
            const response = await fetch(`/account/withdraw/${ctx.user}/${ctx.balance}`);
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
              setStatus(`$${ctx.balance} withdrawal successful!`);
              setTimeout(() => setStatus(''), 3000);
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

    function withdrawAmount() {
      if (ctx.user !== '') {
        setStatus(`$${ctx.balance} withdrawal successful!`);
        setTimeout(() => setStatus(''), 3000);
  
        const url = `/account/withdraw/${ctx.email}/${ctx.balance}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error('Withdrawal failed:', error);
          });
      } else {
        setStatus('Login to make a withdrawal');
        setTimeout(() => setStatus(''), 3000);
      }
    }
  
    return (
      <Card
        bgcolor="danger"
        header="Withdraw"
        text=""
        status={status}
        body={
          <>
            <CardForm
              showName="none"
              showPassword="none"
              showEmail="none"
              handleBalanceChange={(e) => (ctx.balance = e.currentTarget.value)}
            />
            <button type="button" className="btn btn-light" onClick={handleWithdrawal}>
              Withdraw
            </button>
          </>
        }
      />
    );
}