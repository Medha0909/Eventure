import React from "react";
import '../styles/hello.css';
export default function Hello()

{
  return(
  <div className="container">
  <h2>Responsive Table</h2>            
  <table className="table">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="first-name">John</td>
        <td data-label="last-name">Doe</td>
        <td data-label="email">john@example.com</td>
      </tr>
      <tr>
        <td data-label="first-name">Mary</td>
        <td data-label="last-name">Moe</td>
        <td data-label="email">mary@example.com</td>
      </tr>
      <tr>
        <td data-label="first-name">July</td>
        <td data-label="last-name">Dooley</td>
        <td data-label="email">july@example.com</td>
      </tr>
    </tbody>
  </table>
</div>
);
}
