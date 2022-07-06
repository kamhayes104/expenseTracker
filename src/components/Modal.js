import React, { useReducer, useRef } from "react";
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
      return {
        value: state.value,
        isValid: state.value.trim() !== "" && !isNaN(state.value),
      };
    default:
      return initialAmount;
  }
}

const initialDate = { value: "", isValid: true };
function dateReducer(state, action) {
  switch (action.type) {
    case "input":
      return {
        value: action.value,
        isValid: action.value !== initialDate.value,
      };
    case "blur":
    case "submit":
      return { value: state.value, isValid: state.value !== initialDate.value };
    default:
      return initialDate;
  }
}

const Modal = (props) => {
  const [titleState, dispatchTitle] = useReducer(titleReducer, initialTitle);
  const [amountState, dispatchAmount] = useReducer(amountReducer, initialAmount);
  const [dateState, dispatchDate] = useReducer(dateReducer, initialDate);

  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  function titleChangeHandler(event) {
    dispatchTitle({ type: "input", value: event.target.value });
  }

  function amountChangeHandler(event) {
    dispatchAmount({ type: "input", value: event.target.value });
  }

  function dateChangeHandler(event) {
    dispatchDate({ type: "input", value: event.target.value });
  }

  function validateTitleHandler() {
    dispatchTitle({ type: "blur" });
  }

  function validateAmountHandler() {
    dispatchAmount({ type: "blur" });
  }

  function validateDateHandler() {
    dispatchDate({ type: "blur" });
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    dispatchTitle({ type: "submit" });
    dispatchAmount({ type: "submit" });
    dispatchDate({ type: "submit" });
    if (!titleState.isValid) {
      titleInputRef.current.focus();
    } else if (!amountState.isValid) {
      amountInputRef.current.focus();
    } else if (!dateState.isValid) {
      dateInputRef.current.focus();
    }
    else {
      const newExpense = {
        title: titleState.value,
        amount: amountState.value,
        date: dateState.value,
      };
      props.onAddExpense(newExpense);
      props.onClose();
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
              ></input>
              {!titleState.isValid && (
                <div className="error-message">
                  Entered title cannot be empty
                </div>
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
                <div className="error-message">
                  Entered amount must be a number
                </div>
              )}
            </div>

            <div className="modal-input">
              <label htmlFor="date">Date: </label>
              <input
                ref={dateInputRef}
                className={
                  dateState.isValid ? "data-input" : "data-input-errors"
                }
                type="date"
                name="date"
                id="date"
                value={dateState.value}
                onChange={dateChangeHandler}
                onBlur={validateDateHandler}
              ></input>
              {!dateState.isValid && (
                <div className="error-message">
                  Enter a valid date
                </div>
              )}
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
