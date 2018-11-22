import React from "react";
import { observable, computed, action, runInAction } from 'mobx';
import UniqueId from 'react-html-id'

class BooksStore extends React.Component {
    constructor() {
        super()
        // UniqueId.enableUniqueIds(this);
    }
    // @observable books = [
    //     {
    //         "id": this.nextUniqueId(),
    //         "description": "Edgar Alan Po",
    //         "deadline": "2019-09-11",
    //         "done": true
    //     }
    // ];
    @observable todo = [];

    @observable elem = []
    //callback
    @observable posts = {
        data: [],
        status: ['loading']
    }

    // @action addBook = (task) => {
    //     this.todo.push(task)
   
    // }
    @action deleteBook = (id) => {

        this.todo.forEach((todo, index) => {
            console.log(todo + index)
            if (index === 0) {
                index = -1
                this.todo.splice(index, 1)
            }
        })
    }

    @action changeBox = () => {
        this.books.forEach(todo => {
            if (todo.done === true) {
                todo.done = !todo.done;
            }
        });
    }

    @computed get numberOfTodos() {
        return this.todo.length;
    }

    @action async showPosts() {
        this.posts.data = [];
        this.posts.status = 'loading';
        try {
            const posts = await this.getPosts();
            console.log(posts)
            runInAction(() => {
                this.posts.data = posts;
                this.posts.status = 'done';
            })
        } catch (error) {
            runInAction(() => {
                this.posts.status = 'error)';
            })

        }
    }

    @action addPosts(data) {
console.log(JSON.stringify(data))
        return fetch('https://hyf-react-api.herokuapp.com/todos/create', {
            method: 'POST',
            body: JSON.stringify({ description: data, deadline: new Date() }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.posts.data.push(json)
                })
            })

    }

    getPosts() {

        return fetch('https://hyf-react-api.herokuapp.com/todos')
            .then(response => response.json())

    }
}

const store = new BooksStore();
export default store;