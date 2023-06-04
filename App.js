import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import {Board} from './Board';

let _columnId = 0;
let _cardId = 0;

const initialCards = Array.from({length: 0}).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`,
}));

const initialColumns = ['Backlog', 'Ready', 'In Progress', 'finishd'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 4, i * 4 + 4).map(card => card.id),
}));

class App extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = {id: ++_cardId, title};
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? {...column, cardIds: [...column.cardIds, newCard.id]}
            : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          
          ids =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds),
      })),
    }));
  };



  render() {
    return (
      <div className="App">
         
      <div className="head">
         <div className="Awesome"><p>Awesome Kanban Board</p></div>
         <div className="Profil">
              
         </div>
         
      </div>

      <div className="main">
      
          <Board 
          cards={this.state.cards}
          columns={this.state.columns}
          moveCard={this.moveCard}
          addCard={this.addCard}
          />
        
      </div>
      <div className="footer">
         <div className="Awesome_2">
          <p>Active tasks: {Array.cardId}</p>
          <p>Finished tasks:</p>
         
         </div>
      </div>

    </div>
  );     
    
  }

  
 
  
}

export default DragDropContext(HTML5Backend)(App);
