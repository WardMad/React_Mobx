import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { inject, observer } from 'mobx-react'
import Edit from './comonents/Edit';
import TodoLists from './comonents/TododLists'
import UniqueId from 'react-html-id'

@inject('BooksStore')
@observer

class App extends Component {
    constructor(props) {
        super(props)

        this.props.BooksStore.addPosts();
        UniqueId.enableUniqueIds(this);
    }

    handlAdd = (e) => {
        e.preventDefault()
        let inputText = this.newTodo.value

        this.props.BooksStore.addBook(inputText)
        console.log(inputText)

        this.newTodo.value = ''   //es maqruma inputn
    }

    handleDelete = (e) => {
        this.props.BooksStore.deleteBook()
    }

    handleCheckbox = (id) => {

        this.props.BooksStore.changeBox(id.target)
    }

    changeItem = (id, e) => {
        let index = this.props.BooksStore.books.findIndex((task) => {
            return task.id === id

        })
        let indexOfTask = this.props.BooksStore.books[index]
        indexOfTask.description = e.target.value

        let descriptionItem = this.props.BooksStore.books
        descriptionItem[index] = indexOfTask
        this.props.BooksStore.books = descriptionItem
    }
    render() {
        const { BooksStore } = this.props;
        const remove = <button className='delete' onClick={this.handleDelete} >X</button>
        const checkBox = <input type='checkbox' onChange={this.handleCheckbox} />

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

        let listData = BooksStore.books.map(item => (
            <TodoLists
                key={item.id}
                id={item.id}
                description={item.description}
                done={item.done}
                changeEv={this.changeItem.bind(this, item.id)}
            // removeItem={this.removeItem}
            />

        ));

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <h3>you have {BooksStore.numberOfTodos} task</h3>

                    <form onSubmit={(e) => this.handlAdd(e)}>
                        <input placeholder='add your task' ref={input => this.newTodo = input} />
                        <button id='add'> Add</button>
                    </form>

                    <ul >
                        {addTodo}

                        {listData}
                        <mark>  HYF data {getPosts}</mark>
                    </ul>

                </header>
            </div>
        );
    }
}

export default App;
