import { observable, computed, action, runInAction } from 'mobx';


class BooksStore {
    @observable books = [
        // {
        //     "id": 1,
        //     "description": "Get out of bed",
        //     "deadline": "2019-09-11",
        //     "done": true
        // },
        // {
        //     "id": 2,
        //     "description": "Brush teeth",
        //     "deadline": "2022-09-10",
        //     "done": false
        // },
        // {
        //     "id": 3,
        //     "description": "Eat breakfast",
        //     "deadline": "2018-12-09",
        //     "done": false
        // }
    ];
    @observable todo = [];
    @observable elem = []
    //callback
    @observable posts = {
        data: [],
        satatus: ['loading']
    }

    @action addBook = (task) => {
        this.todo.push(task)
    }
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

    @action async addPosts() {
        this.addPosts.data = [];
        this.posts.status = 'loading';
        try {
            const posts = await this.getPosts();
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

    // @action inputPosts(data) {
    //     return fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(json => {
    //             this.posts.data.push(data)
    //         })
    // }

    getPosts() {

        return fetch('https://hyf-react-api.herokuapp.com/todos')
            .then(response => response.json())
    }
}

const store = new BooksStore();
export default store;