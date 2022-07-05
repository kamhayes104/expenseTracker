import React from "react";
import "./Expense.css";

const Expense = (props) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="expense-card">
      <div className="expense-amount">${props.amount}</div>
      <h1 className="expense-title">{props.title}</h1>
      <div className="expense-date">
        <p className="expense-month">{month[props.date.getUTCMonth()]}</p>
        <p className="expense-day">{props.date.getUTCDate()}</p>
        <p className="expense-year">{props.date.getUTCFullYear()}</p>
      </div>
    </div>
  );
};

export default Expense;
