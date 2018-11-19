import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { inject, observer } from 'mobx-react'
import Edit from './comonents/Edit';
import TodoLists from './comonents/TododLists'
// import UniqueId from 'react-html-id'

@inject('BooksStore')
@observer

class App extends Component {
  constructor(props) {
    super(props)
    this.props.BooksStore.addPosts()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const inputText = this.newTodo.value
    this.props.BooksStore.addBook(inputText)

    this.newTodo.value = ''   //es maqruma inputn
  }

  handleDelete = (e) => {
    this.props.BooksStore.deleteBook()
  }

  handleCheckbox = (id) => {

    this.props.BooksStore.changeBox(id.target)
  }

  render() {
    const { BooksStore } = this.props;
    const remove = <button className='delete' onClick={this.handleDelete} >X</button>
    const checkBox = <input type='checkbox' onChange={this.handleCheckbox} />

    // const stock = BooksStore.books.map((book, index) => (
    //   <li key={index}>
    //     <input type="checkbox" defaultChecked={book.done} onChange={this.handleCheckbox} />
    //     <label >  {book.description}  {book.deadline}  {book.done} {remove}   </label> </li>
    // ));


    const addTodo = BooksStore.todo.map((item, index) => (

      <li key={index}>
        {checkBox}
        <label>  {item} {remove} > </label>  <Edit /></li>
    ));

    const getPosts = BooksStore.posts.data.map((item, index) => (
      <li key={index} >
        {checkBox}
        <label >  {item.description} {item.deadline} {item.done} {remove} > </label>  <Edit /></li>

    ));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h3>you have {BooksStore.numberOfTodos} task</h3>

          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input placeholder='add your task' ref={input => this.newTodo = input} />
            <button id='add'> Add</button>
          </form>

          <ul >
            <TodoLists />
            {/* {stock} */}
            {addTodo}
            <mark>  HYF data {getPosts}</mark>
          </ul>

        </header>
      </div>
    );
  }
}

export default App;
