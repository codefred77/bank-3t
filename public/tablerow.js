function TableRow(props) {
  console.log (`Rendering Row ${props.key}`);

  return (
    <tr>
      <th scope="row">{props.name}</th>
      <td>{props.email}</td>
      <td>{props.password}</td>
      <td>{props.account}</td>
      <td>{props.balance}</td>
    </tr>
  )
}
