function AllData() {
    const ctx = React.useContext(UserContext);
    const [data, setData] = React.useState([]);
  
    React.useEffect(() => {
      // fetch all accounts from API
      if (!ctx.auth) {
        alert ("To view all data you must have admin privileges. Please log out and log in using the following credentials -- Email address: admin & Password: admin. Please ensure that you enter the correct email address and password to access the necessary privileges.");
        setTimeout(() => setStatus(null),5000); 
      }
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
          console.log("Users DB: ", data);
          // Format the cbal values as currency
          const formattedData = data.map(user => ({
            ...user,
            cbal: parseFloat(user.cbal).toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            }),
          }));
          setData(formattedData);
        });
    }, []);
  
    return (
      <>
        <h3 style={{
            color:'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>Bank Users</h3>
  
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Account Number</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <TableRow
                key={i}
                name={data[i].name}
                email={data[i].email}
                password= {ctx.auth ? data[i].password : "Must be admin"}
                account={ctx.auth ? data[i].cnum : "Must be admin"}
                balance={data[i].cbal}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  