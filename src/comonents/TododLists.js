import React from "react";
// import "./TodoLists.css";
import UniqueId from 'react-html-id'


class TodoLists extends React.Component {
    constructor() {
        super()
        UniqueId.enableUniqueIds(this);
        this.state = {
            todos: [
                { id: this.nextUniqueId(), description: 'Run 12 km', done: false },
                { id: this.nextUniqueId(), description: 'Buy a lamb meat', done: false }
            ]
        }
        console.log(this.state)
    }

    render() {

        let { id, description, done } = this.props;

        let listData = this.state.todos.map(item => (
            <li key={item.id}>

                {item.id}<br />
                description >>{item.description}<br />
                done>> {item.done}
                {/* // handleClick={this.handleClick}  */}
            </li>

        ));


        return (
            <div className="list">

                <ul>


                    <button type="button" defaultChecked={done}>TodoLists</button>

                    {listData}


                </ul>

            </div>
        );
    }
}

export default TodoLists;