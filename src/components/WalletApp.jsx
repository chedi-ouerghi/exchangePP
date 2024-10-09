// import React, { useState, useCallback, useEffect } from 'react';
// import '../App.css';

// const WalletApp = () => {
//   const [balance, setBalance] = useState(15325);
//   const [expenseItems, setExpenseItems] = useState([
//     { name: 'Apple', amount: -250, cashback: '10% Cashback' },
//     { name: 'Spotify', amount: -10, cashback: '5% Cashback' }
//   ]);

//   return (
//     <div className="wallet-app">
//       <div className="wallet-balance-card">
//         <h2 className="balance-text">Wallet Balance</h2>
//         <div className="balance-amount">$15,325</div>
//         <div className="add-button">+ Add</div>
//       </div>

//       <div className="expenses-card">
//         <h2 className="expenses-title">Expenses</h2>
//         {expenseItems.map((item, index) => (
//           <div className="expense-item" key={index}>
//             <div className="expense-name">{item.name}</div>
//             <div className="expense-amount">${item.amount}</div>
//             <div className="expense-cashback">{item.cashback}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WalletApp;
