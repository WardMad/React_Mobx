import React from "react";
import UniqueId from 'react-html-id';
import { inject, observer } from 'mobx-react'
import Edit from './Edit'


@inject('BooksStore')
@observer

class TodoLists extends React.Component {
    constructor(props) {
        super(props)
        UniqueId.enableUniqueIds(this);
        // this.state = {
        //     Localtodos: [
        //         { id: this.nextUniqueId(), description: 'Run 12 km', done: false },
        //         { id: this.nextUniqueId(), description: 'Buy a lamb meat', done: false }
        //     ]
        // }
    }
    handleCheckbox = (e) => {

        this.props.BooksStore.changeBox(e.target.value)
    }


    render() {
        const checkbox = <input type='checkbox' onChange={this.handleCheckbox} />
        const remove = <button className='delete' onClick={this.handleDelete} >X</button>
        const { id, description, deadline, done, changeEv } = this.props;
        console.log(id)
        return (

            <div className='list'>
                <ul>

                    <li>{checkbox} <label> {id} {description} {deadline} {done} </label>
                        {remove} <Edit value={description} />
                    </li>
                    <input type='text' onChange={changeEv} defaultValue={description} />

                </ul>

            </div>
        );
    }
}

export default TodoLists;