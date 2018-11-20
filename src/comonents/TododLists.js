import React from "react";

import UniqueId from 'react-html-id';
import { inject, observer } from 'mobx-react'



@inject('BooksStore')
@observer

class TodoLists extends React.Component {
    constructor(props) {
        super(props)
        UniqueId.enableUniqueIds(this);
        this.state = {
            Localtodos: [
                { id: this.nextUniqueId(), description: 'Run 12 km', done: false },
                { id: this.nextUniqueId(), description: 'Buy a lamb meat', done: false }
            ]
        }
    }

    render() {

        // let listData = this.state.Localtodos.map(item => (
        //     <li key={item.id}>
        //         Locals <br />
        //         {item.id}<br />
        //         description >>{item.description}<br />
        //         done>> {item.done}
        //         {/* // handleClick={this.handleClick}  */}
        //     </li>
        // ));

        const { id, description, done, changeEv } = this.props;

        return (
            <div className='list'>
                <ul>
                    <li>  <span>{id}  {description} {done} </span></li>
                    <input type='text' onChange={changeEv} defaultValue={description} />
                    {/* {listData} */}

                </ul>

            </div>
        );
    }
}

export default TodoLists;