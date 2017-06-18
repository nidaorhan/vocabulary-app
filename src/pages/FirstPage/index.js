import React, { Component }           from 'react';
import { connect }                    from 'react-redux';
import { bindActionCreators }         from 'redux';
import * as ExampleActions            from './redux';

@connect(
  state => ({ message : state.FirstPage.message }),
  dispatch => ({ actions : bindActionCreators(ExampleActions, dispatch) })
)
export default class FirstPage extends Component {
  
  componentDidMount() {
    this.props.actions.exampleNida()
  }

  render(){
    let { message } = this.props;
    return (
      <div>
        <h1>{ message }</h1>
        <br/>
        <button onClick={ event => this.props.actions.updateMessage() }>CHANGE THE MESSAGE</button>
      </div>
    )
  }
}
