function Spa() {
    
    return (
        <>
        <HashRouter>
        <div>
            <UserContext.Provider value={{user:'', auth:false, name:'', email:'', password:'', balance:'0', accountnum:'0600000000'}}>
            <Footer/>
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
  