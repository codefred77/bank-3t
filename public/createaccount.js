function CreateAccount(props){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');

    const ctx = React.useContext(UserContext); 

    function generateAccountNumber() {
        // Note: all checking account numbers start with "06"
        const randomNumber = Math.floor(Math.random() * 10000000000); // Generate a random 10-digit number
        const formattedNumber = `06${randomNumber.toString().padStart(8, '0')}`; // Add leading zeros if necessary
        
        // TBD - check that the newly generated number does not match and existing one

        return formattedNumber;
    }

    async function addUser() {
        try {
          const response = await fetch(`/account/find/${ctx.email}`);
          const data = await response.json();
          console.log(data);
      
          if (data.length === 0) {
            ctx.setUser = true;
          }
      
          // TBD - is ctx.user really needed? Just use data.length as above
          if (ctx.user === true) {
            ctx.accountnum = generateAccountNumber();
            const url = `/account/create/${ctx.name}/${ctx.email}/${ctx.password}/${ctx.balance}/${ctx.accountnum}`;
            const res = await fetch(url);
            const createdData = await res.json();
            console.log(createdData);
      
            ctx.setUser = false;
            setShow(false);
          } else {
            ctx.setUser = false;
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
  