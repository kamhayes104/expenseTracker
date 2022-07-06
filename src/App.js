import { useState, useEffect } from "react";
import "./App.css";
import Expense from "./components/Expense";
import ExpensesCard from "./components/ExpensesCard";
import Modal from "./components/Modal";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const res = await fetch("api/");
      if (!res.ok) {
        throw new Error(
          `The request couldn't be completed. Error status ${res.status}`
        );
      }
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addExpenseHandler(expense) {
    try {
      const res = await fetch("api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (!res.ok) {
        throw new Error(
          `The request couldn't be completed. Error status ${res.status}`
        );
      }

      const data = await res.json();
      setExpenses((prevExpenses) => [...prevExpenses, data]);
    } catch (err) {
      console.log(err);
    }
  }

  function filterExpensesHandler(event) {
    setSearchFilter(event.target.value);
    setFilteredExpenses(
      expenses.filter((expense) =>
        expense.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    console.log(event.target.value);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="App">
      <h1 className="app-header">Expenses</h1>
      <ExpensesCard>
      <div className="header">
        <button className="btn" onClick={openModal}>
          + Add Expense
        </button>
        <input
          className="search-bar"
          type="text"
          placeholder="Filter expenses..."
          onInput={filterExpensesHandler}
        ></input>
      </div>
        {searchFilter !== "" &&
          filteredExpenses.map((expense) => {
            return (
              <Expense
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={new Date(expense.date)}
              />
            );
          })}
        {searchFilter !== "" && filteredExpenses.length < 1 && (
          <div>No results found</div>
        )}
        {searchFilter === "" &&
          expenses.map((expense) => {
            return (
              <Expense
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={new Date(expense.date)}
              />
            );
          })}
      </ExpensesCard>
      <Modal
        show={showModal}
        onAddExpense={addExpenseHandler}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
