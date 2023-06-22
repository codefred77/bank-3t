function CreateAccount(props){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [user, setUser] = React.useState(false);
    const ctx = React.useContext(UserContext); 

    function generateAccountNumber() {
        // Note: all checking account numbers start with "06"
        const randomNumber = Math.floor(Math.random() * 10000000000); // Generate a random 10-digit number
        const formattedNumber = `06${randomNumber.toString().padStart(8, '0')}`; // Add leading zeros if necessary
        console.log("Random acct num: " + formattedNumber);
        // TBD - check that the newly generated number does not match and existing one

        return formattedNumber;
    }

    async function addUser() {
        let random_cnum;

        try {
          var response = await fetch(`/account/find/${ctx.email}`);
          var data = await response.json();
          console.log("Does user already exist? " + data);
      
          if (data.length === 0) {
            setUser(true);
            ctx.setUser(true);

            random_cnum = generateAccountNumber();
            ctx.setCNum(random_cnum);

            const url = `/account/create/${ctx.name}/${ctx.email}/${ctx.password}/${ctx.cbal}/${random_cnum}`;
            const res = await fetch(url);
            const createdData = await res.json();
            
            setUser(false);  
            ctx.setUser(false);
            setShow(false);
          } else {
            setUser(false);
            ctx.setUser(false);
            setStatus('User already exists with that email');
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          console.error(error);
        }
      }
      
    return (
        <Card
            bgcolor="primary"
            header="Create Account"
            text=""
            status={status}
            body={
                <>
                {show ? 
                    <>
                    <CardForm 
                        setShow={setShow}
                        showAcctType="none"
                        showXfrEmail="none"
                        showAmount="none"
                    /> 
                    {<button 
                        type="submit"
                        className="btn btn-light"
                        onClick={addUser}
                     >
                        Create Account
                     </button>
                    }
                    </>
                : 
                    <Success setShow={setShow}/>}
                </>
            }
        />      
    );
}

function Success(props) {
    return (
        <>    
        <h5>Success!</h5><br/>
        <button type="submit" 
            className="btn btn-light" 
            onClick={() => props.setShow(true)}>Add another account</button>
        </>
    )
}
  