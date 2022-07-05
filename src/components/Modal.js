import React, { useState, useReducer, useRef, useEffect } from "react";
import "./Modal.css";

const initialTitle = { value: "", isValid: true };
function titleReducer(state, action) {
  switch (action.type) {
    case "input":
      return { value: action.value, isValid: action.value.trim() !== "" };
    case "blur":
    case "submit":
      return { value: state.value, isValid: state.value.trim() !== "" };
    default:
      return initialTitle;
  }
}

const initialAmount = { value: "", isValid: true };
function amountReducer(state, action) {
  switch (action.type) {
    case "input":
      return {
        value: action.value,
        isValid: action.value.trim() !== "" && !isNaN(action.value),
      };
    case "blur":
    case "submit":
      return { value: state.value, isValid: state.value.trim() !== "" && !isNaN(state.value) };
    default:
      return initialAmount;
  }
}

const initialDate = { value: "", isValid: true }
function dateReducer(state, action) {
  switch (action.type) {
    case "input":
      return {
        value: action.value,
        isValid: action.value !== initialDate,
      };
    case "blur":
    case "submit":
      return { value: state.value, isValid: state.value !== initialDate.value};
    default:
      return initialAmount;
  }

}

const Modal = (props) => {
  const [titleState, dispatchTitle] = useReducer(titleReducer, initialTitle);
  const [amountState, dispatchAmount] = useReducer(amountReducer, initialAmount);
  const [dateState, dispatchDate] = useReducer(dateReducer, initialDate);
  const [enteredDate, setEnteredDate] = useState(new Date());
  const [formIsValid, setformIsValid] = useState(false);

  const titleInputRef = useRef();
  const amountInputRef = useRef();

  useEffect(() => {
    console.log(enteredDate)
  })

  // useEffect(() => {
  //   setformIsValid(titleState.value.trim() !== "" && amountState.isValid);
  // }, [titleState.value, amountState.isValid]);

  function titleChangeHandler(event) {
    dispatchTitle({ type: "input", value: event.target.value });
    console.log(event.target.value);
  }

  function amountChangeHandler(event) {
    dispatchAmount({ type: "input", value: event.target.value });
    console.log(event.target.value);
  }

  function dateChangeHandler(event) {
    setEnteredDate(event.target.value);
    console.log(event.target.value);
  }

  function validateTitleHandler() {
    dispatchTitle({ type: "blur" });
  }

  function validateAmountHandler() {
    dispatchAmount({ type: "blur"})
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    dispatchTitle({ type: "submit" });
    dispatchAmount({ type: "submit" });
    if (formIsValid) {
      const newExpense = {
        title: titleState.value,
        amount: amountState.value,
        date: enteredDate,
      };
      props.onAddExpense(newExpense);
      props.onClose();
    } else if (!titleState.isValid) {
      titleInputRef.current.focus();
    } else if (!amountState.isValid) {
      amountInputRef.current.focus();
    }
  }

  if (!props.show) {
    return null;
  }

  return (
    <>
      <div className="backdrop" onClick={props.onClose} />
      <form onSubmit={formSubmitHandler}>
        <div className="modal">
          <header className="modal-header">
            <h3>Add Expense</h3>
          </header>
          <hr />
          <div className="modal-body">
            <div className="modal-input">
              <label htmlFor="title">Title: </label>
              <input
                ref={titleInputRef}
                className={
                  titleState.isValid ? "data-input" : "data-input-errors"
                }
                type="text"
                name="title"
                id="title"
                value={titleState.value}
                onChange={titleChangeHandler}
                onBlur={validateTitleHandler}
              >
              </input>
              {!titleState.isValid && (
              <div className="error-message">Entered title cannot be empty</div>
              )}
            </div>
            <div className="modal-input">
              <label htmlFor="amount">Amount: </label>
              <input
                ref={amountInputRef}
                className={
                  amountState.isValid ? "data-input" : "data-input-errors"
                }
                type="text"
                name="amount"
                id="amount"
                value={amountState.value}
                onChange={amountChangeHandler}
                onBlur={validateAmountHandler}
              ></input>
              {!amountState.isValid && (
              <div className="error-message">Entered amount must be a number</div>
              )}
            </div>

            <div className="modal-input">
              <label htmlFor="date">Date: </label>
              <input
                className="data-input"
                type="date"
                name="date"
                id="date"
                value={dateState.value}
                onChange={dateChangeHandler}
              ></input>
            </div>
          </div>
          <footer className="modal-footer">
            <button className="btn" type="button" onClick={props.onClose}>
              Cancel
            </button>
            <button className="btn" type="submit">
              Submit
            </button>
          </footer>
        </div>
      </form>
    </>
  );
};

export default Modal;
