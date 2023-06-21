function Balance() {
    const ctx = React.useContext(UserContext); 
    const [data, setData] = React.useState('');
    const [cAccnt, setCAccnt] = React.useState('');
    const [cBal, setCBal] = React.useState('');
    const [status, setStatus] = React.useState(true);

    React.useEffect(() => {
        //if (ctx.user!=='') { 
        if (ctx.auth) {
            fetch(`/account/balance/${ctx.email}`)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    setCAccnt('Checking Account (' + data[0].accountnum + ')');
                    setCBal('Balance: $' + data[0].balance);
            });
        } else {
            setStatus('Login to see account balance');
            setTimeout(() => setStatus(''), 3000);
        }
    }, []);
  
    return (
        <Card
            bgcolor="info"
            header="Balance"
            text={data}
            caccnt={cAccnt}
            cbal={cBal}
            status={status}
            body={
                <CardForm
                    showAcctType="none"
                    showName="none"
                    showPassword="none"
                    showAmount="none"
                    showEmail="none"              
                />
            }
        />
    )
}