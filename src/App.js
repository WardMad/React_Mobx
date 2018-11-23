import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { inject, observer } from 'mobx-react'
import Edit from './comonents/Edit';
import TodoLists from './comonents/TodoLists'


@inject('BooksStore')
@observer

class App extends Component {
    constructor(props) {
        super(props)
        this.props.BooksStore.showPosts();

    }
    handlAdd = (e) => {
        e.preventDefault()
        let inputText = this.newTodo.value
        this.props.BooksStore.addPosts(inputText)

        this.newTodo.value = ''   //es maqruma inputn
    }

    handleCheckbox = (id) => {

        this.props.BooksStore.changeBox(id.target)
    }

    changeItem = (id, e) => {
        let index = this.props.BooksStore.posts.data.findIndex((task) => {
            return task.id === id

        })
        let indexOfTask = this.props.BooksStore.posts.data[index]
        indexOfTask.description = e.target.value  //voncvor ba chi anum

        let descriptionItem = this.props.BooksStore.posts.data
        descriptionItem[index] = indexOfTask
        this.props.BooksStore.posts.data = descriptionItem
    }
    render() {
        const { BooksStore } = this.props;
        // const remove = <button className='delete' onClick={this.handleDelete} >X</button>
        // const checkBox = <input type='checkbox' onChange={this.handleCheckbox} />

        // // const addTodo = BooksStore.todo.map((item, index) => (

        //     <li key={index}>
        //         {checkBox}
        //         <label>  {item} {remove} > </label>  <Edit value={item} changeEv={this.changeItem} /></li>
        // ));

        const listOfData = BooksStore.posts.data.map((item, index) => (
            <div key={index}>  <TodoLists

                id={item.id}
                description={item.description}
                deadline={item.deadline}
                done={item.done}
                changeEv={this.changeItem.bind(this, item.id)}

            /></div>
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
                        {/* {addTodo} */}

                        {listOfData}

                    </ul>

                </header>
            </div>
        );
    }
}

export default App;