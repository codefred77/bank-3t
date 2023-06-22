function Balance() {
    const ctx = React.useContext(UserContext); 
    const [data, setData] = React.useState('');
    const [cNum, setCNum] = React.useState('');
    const [cBal, setCBal] = React.useState('');
    const [status, setStatus] = React.useState(true);

    React.useEffect(() => {
        //if (ctx.user!=='') { 
        if (ctx.auth) {
            fetch(`/account/balance/${ctx.email}`)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    setCNum('Checking Account (' + data[0].cnum + ')');
                    setCBal('Balance: $' + data[0].cbal);
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
            cnum={cNum}
            cbal={cBal}
            status={status}
            body={
                <CardForm
                    showAcctType="none"
                    showName="none"
                    showPassword="none"
                    showAmount="none"
                    showEmail="none"
                    showXfrEmail="none"             
                />
            }
        />
    )
}