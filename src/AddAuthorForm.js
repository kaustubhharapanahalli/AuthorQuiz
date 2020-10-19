import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./AddAuthorForm.css";

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      bookTemp: "",
      books: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onAddAuthor({
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      books: this.state.books,
    });
    this.setState({
      name: "",
      imageUrl: "",
      bookTemp: "",
      books: [],
    });
  }

  handleAddBook(event) {
    this.setState({
      books: [...this.state.books, this.state.bookTemp],
      bookTemp: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="AddAuthorForm_input">
          <label htmlFor="name">
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="AddAuthorForm_input">
          <label htmlFor="imageUrl">
            <strong>Image URL:</strong>
          </label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </div>
        <div className="AddAuthorForm_input">
          <label htmlFor="bookTemp">
            <strong>Book Name:</strong>
          </label>
          {this.state.books.map((book) => (
            <p key={book}>{book}</p>
          ))}
          <input
            type="text"
            name="bookTemp"
            value={this.state.bookTemp}
            onChange={this.handleChange}
          />
          <input type="button" value="+" onClick={this.handleAddBook} />
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    );
  }
}

function AddAuthorForm({ match, onAddAuthor }) {
  return (
    <div className="container AddAuthorForm">
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch, props) {
  return {
    onAddAuthor: (author) => {
      dispatch({ type: "ADD_AUTHOR", author });
      props.history.push("/");
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddAuthorForm)
);
