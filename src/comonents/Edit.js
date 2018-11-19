import React from 'react';
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

@inject('BooksStore')
@observer

class Edit extends React.Component {
    state = {
        edit: false
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleUpdate = (e) => {
        this.props.BooksStore.todo = [e.target.value]
    }

    handleSave = (e) => {
        this.props.BooksStore.elem = [e.target.value]
        this.props.BooksStore.elem = []
    }

    canCel = (e) => {
        this.props.BooksStore.elem = []

    }
    render() {
        const { BooksStore } = this.props;
        // console.log(toJS(BooksStore.elem))

        // const editItems = BooksStore.elem.map((item, index) => (
        //     <div key={index}>
        //         {item}{index}
        //     </div>
        // ));
        // console.log(editItems)
        return (
            <div>
                {this.state.edit ? [<input type='text' placeholder={'type to update'}
                    onChange={this.handleUpdate} />,
                <button className='edit' type="button" onClick={this.handleSave}> Save</button >,
                <button className='edit' type="button" onClick={this.canCel} > Cancel</button >] : null}
                <div>

                    <button id='btnE' type="button" onClick={this.toggleEdit}> Edit </button >
                </div>
            </div>

        )
    }
}

export default Edit; 