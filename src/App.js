import React from 'react';
import {cloneDeep} from 'lodash';

import './App.css';
import './bootstrap.min.css';

import ToDoList from './ToDoList.js';
import NewToDoList from './NewToDoList.js';
import {Button} from 'react-bootstrap'

const axios = require('axios').default

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    axios.get('/lists').then((response) => {
      this.updateLists(response.data)
    })
  }

  updateLists(newLists) {
    let newState = cloneDeep(this.state)
    newState.lists = newLists
    this.setState(newState)
  }

  updateList(index, newList) {
    let newState = cloneDeep(this.state)
    newState.lists[index] = newList
    this.setState(newState)
  }

  deleteList(index) {
    axios.delete(`/lists/${index}`).then((response) => {
      let newState = cloneDeep(this.state)
      newState.lists.splice(index, 1)
      this.setState(newState)
    })
  }

  appendList(newListName) {
    axios.post('/lists/add', {name: newListName}).then((response) => {
      let newState = cloneDeep(this.state)
      newState.lists.push(response.data)
      this.setState(newState)
    })
  }

  deleteAllList(){
    axios.post(`/overwrite_database`,[]).then(() =>{
      this.setState({ lists: []})
      })

  }

  render () {
    return (
      <div className="App">
        <div className="Header">
          <NewToDoList appendList={this.appendList.bind(this)}/>
          <Button>Number of lists: {this.state.lists.length}</Button>
          <Button onClick = {this.deleteAllList.bind(this)}>Click me</Button>
        </div>
        <div className="ListsWrapper">
          {this.state.lists.map((list, i) => <ToDoList key={i} listId={i} list={list} deleteList={this.deleteList.bind(this, i)} updateList={this.updateList.bind(this, i)}/>)}
        </div>
      </div>
    );
  }
}
