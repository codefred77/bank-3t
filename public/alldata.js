function AllData() {
    const [data, setData] = React.useState([]);
  
    React.useEffect(() => {
      // fetch all accounts from API
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
          console.log(data);
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
        <h2>Bank Users</h2>
  
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Account</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <TableRow
                key={i}
                name={data[i].name}
                email={data[i].email}
                password={data[i].password}
                account={data[i].cnum}
                balance={data[i].cbal}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  