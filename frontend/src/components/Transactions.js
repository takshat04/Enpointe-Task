import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get('http://localhost:5000/api/transactions', {
                headers: { Authorization: localStorage.getItem('accessToken') }
            });
            setTransactions(response.data);
        };
        fetchTransactions();
    }, []);

    return (
        <div>
            <h1>Transaction History</h1>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.transaction_type}: ${transaction.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;