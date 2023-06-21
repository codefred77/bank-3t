function Spa() {
    const [userValue, setUserValue] = React.useState(false);
    const [authValue, setAuthValue] = React.useState(false);
    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [balanceValue, setBalanceValue] = React.useState('0');
    const [accountNumValue, setAccountNumValue] = React.useState('0600000000');

    return (
        <>
        <HashRouter>
        <div>
            {/*<UserContext.Provider value={{user:'', auth:false, name:'', email:'', password:'', balance:'0', accountnum:'0600000000'}}>*/}
            <UserContext.Provider value={{ 
                // Context Values
                user: userValue,
                auth: authValue,
                name: nameValue,
                email: emailValue,
                password: passwordValue,
                balance: balanceValue,
                accountnum: accountNumValue,
                // Setter functions
                setUser: setUserValue,
                setAuth: setAuthValue,
                setName: setNameValue,
                setEmail: setEmailValue,
                setPassword: setPasswordValue,
                setBalance: setBalanceValue,
                setAccountNum: setAccountNumValue
                }}>
                
            
                {/* App components */}
                <NavBar/> 
                <div className="container" style={{padding: "20px"}}>
                    <Route path="/" exact         component={Home} />
                    <Route path="/CreateAccount/" component={CreateAccount} />
                    <Route path="/login/"         component={Login} />
                    <Route path="/deposit/"       component={Deposit} />
                    <Route path="/withdraw/"      component={Withdraw} />
                    <Route path="/balance/"       component={Balance} />
                    <Route path="/alldata/"       component={AllData} />
                </div>
            </UserContext.Provider>
        </div>
        </HashRouter>

        </>
    ); 
}
  
// render our single page application (SPA) at HTML "root"
ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
);
  