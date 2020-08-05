import React, { Component } from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import CustomModal from './components/CustomModal'
import Input from './components/Input'
import { connect } from "react-redux";
import { addTodo, updateTodo, deleteTodo, getTodos } from './store/actions'
import { isEmpty, RECORD_OPERATION_MESSAGE } from './utils'

import { Icon } from 'react-icons-kit';
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever';
import { edit } from 'react-icons-kit/fa/edit';

const ICON_SIZE = 24;

class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            operation: null,
            loading: false,
            records: [],
            isConfirmModalOpen: false,
            todo: {}
        }
    }

    handleTodo = (type, e) => {
        let { todo } = this.state
        todo[type] = e.target.value

        this.setState({
            todo
        })
    }

    componentDidMount(){
        this.fetchRecord()
    }
    initAddRecord = () => {
        this.toggleModal(true, 'Add');
    }

    toggleModal = (isModalOpen, operation = null) => {
        this.setState({
            isModalOpen,
            operation
        });

        if (!isModalOpen) {
            this.setState({ todo: {} });
        }
    };

    processForm = event => {
        event.preventDefault();
        if (this.state.operation === 'Add') {
            this.addRecord();
        } else if (this.state.operation === 'Edit') {
            this.editRecord();
        } else if (this.state.operation === 'Delete') {
            this.deleteRecord();
        }
    }

    addRecord = () => {
        this.props.addTodo(this.state.todo)
        this.toggleModal(false);
        this.setState({ todo: {} })
    }

    initEditRecord = (e, record) => {
        this.setState({ todo: record });
        this.toggleModal(true, "Edit");
    }

    initDeleteRecord = (e, record) => {
        this.setState({
            todo: record
        }, () => this.toggleConfirmModal(true, 'Delete'));
    }

    toggleConfirmModal = (isConfirmModalOpen, operation = null) => {
        this.setState({
            isConfirmModalOpen,
            operation
        });

        if (!isConfirmModalOpen) {
            this.setState({ todo: {} });
        }
    }

    editRecord = () => {
        const { todo } = this.state;
        this.props.updateTodo(todo)
        this.toggleModal(false);
        this.setState({ todo: {} })
    }

    deleteRecord = (e) => {
        const { todo } = this.state
        this.props.deleteTodo(todo._id);
        this.fetchRecord();
        this.toggleConfirmModal(false);
    }
    fetchRecord = () => {
        this.props.getTodos()
    }

    render() {
        let { todo } = this.state
        let columns = isEmpty(this.props.todos) && this.props.todos.length > 0
        ? [
            {
                Header: "Name",
                accessor: "name"
            }, {
                Header: "Description",
                accessor: "description"
            },{
                Header: <b>Action</b>, 
                accessor: '_id', 
                sortable: false,
                Cell: ({ original }) => {
                    return (
                        <div>
                            <Icon size={ICON_SIZE} className="icon_class" icon={edit} title="Edit Program" onClick={(e) => this.initEditRecord(e, original)} />
                            <Icon size={ICON_SIZE} className="icon_class" icon={ic_delete_forever} title="Delete Program" onClick={(e) => this.initDeleteRecord(e, original)} />
                        </div>
                    );
                },
                width: 100
            }
        ] : [];

        return (
            <div className="Section">
                <h1>Todos</h1>
                <div className="Records">
                    <div style={{ paddingBottom: '16px' }}>
                        <button className="AddButton btn_auth" 
                        onClick={this.initAddRecord}>
                            Add Todo
                        </button>
                    </div>

                    <div>
                        {
                            isEmpty(this.props.todos) && this.props.todos.length > 0
                            ? (
                                <ReactTable 
                                    filterable
                                    data={this.props.todos} 
                                    columns={columns}
                                />
                            )
                            : null
                        }
                        
                    </div>
                </div>
                <CustomModal 
                    show={this.state.isModalOpen} 
                    modalClosed={() => this.toggleModal(false)} 
                    title={this.state.operation}
                >
                    <form onSubmit={this.processForm}>
                        <div>
                            <Input
                                required={true}
                                placeholder="Name"
                                type="text"
                                value={isEmpty(todo) && isEmpty(todo.name) ? todo.name: ""}
                                changed={(e) => this.handleTodo("name", e)}
                            />
                            <Input
                                placeholder="Description"
                                required={true}
                                type="textarea"
                                value={isEmpty(todo) && isEmpty(todo.description) ? todo.description: ""}
                                changed={(e) => this.handleTodo("description", e)}
                            />
                        </div>
                        <div className="flex ModalButtons">
                            <button className="btn_auth" onClick={() => this.toggleModal(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn_auth">
                                {this.state.operation}
                            </button>
                        </div>
                    </form>
                </CustomModal>
                <CustomModal show={this.state.isConfirmModalOpen} modalClosed={() => this.toggleConfirmModal(false)} >
                    <form onSubmit={this.processForm}>
                        <h3>{RECORD_OPERATION_MESSAGE.DELETE_CONFIRM}</h3>
                        <div className="flex ModalButtons" style={{ paddingTop: '16px' }}>
                            <button className="btn_auth" onClick={() => this.toggleConfirmModal(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn_auth">
                                {this.state.operation}
                            </button>
                        </div>
                    </form>
                </CustomModal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTodo: data => dispatch(addTodo(data)),
        updateTodo: data => dispatch(updateTodo(data)),
        deleteTodo: id => dispatch(deleteTodo(id)),
        getTodos: () => dispatch(getTodos())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)