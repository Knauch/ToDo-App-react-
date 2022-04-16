import React, { Component } from 'react';


import HeadLine from '../head-line';
import SearchLine from '../search-line';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../add-item-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData : [
                
                this.createTodoItem('Example: Drink Coffee'),
                this.createTodoItem('Example: Check the mail'),
                this.createTodoItem('Enter NEW Task below')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important : false,
            done: false,
            id: this.maxId++
        }
    }
    
deleteItem = (id) => {
    this.setState( ({todoData}) => {
        const idx = todoData.findIndex( (el) => el.id === id);
       
        const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
        ];

        return {
            todoData: newArray 
        }; 
    } );

};

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState( ({todoData}) => {
            const newArr = [
                ... todoData,
                newItem
            ];

            return {
                todoData :newArr
            };
        });
    };

    onToggleProperties(arr, id, propName){
        const idx = arr.findIndex( (el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {... oldItem, 
                         [propName]: !oldItem[propName]};
        return [
            ... arr.slice(0, idx), 
            newItem, 
            ... arr.slice(idx+1)
        ];
        
    };


    //set or updates state of the object (make line bold as important or 'checked' crossed-out line)
    onToggleImportant = (id) => {
        this.setState( ({todoData}) => {
            return {
                todoData: this .onToggleProperties(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState( ({todoData}) => {
            
            return { 
            todoData: this.onToggleProperties(todoData, id, 'done')
            };
        });         
    }; 

    search(items, term) {
        if(term.length ===0) {
            return items
        };

        return items.filter( (item) => {
            return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1
        });
    };

    searchChange = (term) => {
        this.setState( { term } );
    };

filter(items, filter) {
    switch(filter) {
        case 'all': 
            return items;
        case 'active': 
            return items.filter( (item) => !item.done);
        case 'done': 
            return items.filter( (item) => item.done);
        
    };
}

onFilterChange = (filter) => {
    this.setState({ filter });
};

   render() {

    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter( 
    this.search(todoData, term), filter);

    const doneCount = todoData
                      .filter( (el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
        <div className='todo-app'>
        <HeadLine toDo ={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
        <SearchLine 
            onSearchChange = {this.searchChange}/>
        <ItemStatusFilter filter={filter}
                          onFilterChange={this.onFilterChange}/>
        </div>

        <TodoList 
        todos ={visibleItems}
        onDeleted ={ this.deleteItem }
        onToggleImportant = {this.onToggleImportant}
        onToggleDone = {this.onToggleDone} />
        <ItemAddForm onItemAdded = { this.addItem } 
        /> 
        </div>  
        
    );
};

};

