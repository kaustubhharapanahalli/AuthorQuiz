import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";

import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from "./AddAuthorForm";
import * as serviceWorker from "./serviceWorker";
import { sample, shuffle } from "underscore";

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"],
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/josephconrad.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Heart of Darkness"],
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/authors/jkrowling.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerers Stone"],
  },
  {
    name: "Stephen King",
    imageUrl: "images/authors/stephenking.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"],
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/authors/charlesdickens.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two City"],
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/authors/williamshakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"],
  },
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}

const state = {
  turnData: getTurnData(authors),
  highlight: "none",
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />;
}

const AuthorWrapper = withRouter(({ history }) => (
  <AddAuthorForm
    onAddAuthor={(author) => {
      authors.push(author);
      history.push("/");
    }}
  />
));

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={App} />
          <Route path="/add" component={AuthorWrapper} />
        </Fragment>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
