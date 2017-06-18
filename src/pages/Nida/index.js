import React, { Component }       from 'react'
import { bindActionCreators }     from 'redux'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'

import * as nidaActions           from './redux'
import AddCard                    from './AddCard'
import ShowCards                  from './ShowCards'

@connect(
  state => ({
    nidaState : state.Nida
  }),
  dispatch => ({
  	nidaActions : bindActionCreators( nidaActions, dispatch )
  })
)
export default class NidaContent extends Component {
  
  static propTypes = {
    name: PropTypes.string
  }
	
	onAddCard = ( cardObject = {} ) => {
		let { cards } = this.props.nidaState
		let { nidaActions } = this.props
		nidaActions.setRootReduxStateProp(
			'cards', 
			[ ...cards, cardObject ]
		)
	}

  render() {
		
		let { cards } = this.props.nidaState

    return (

      <div>
				<div style={{float:'left', marginRight:100+'px'}}>
					<AddCard onAddCard={ this.onAddCard } />
				</div>
				<div style={{float:'left', marginRight:100+'px'}}>
					<ShowCards cards={ cards } />
				</div>
				
				

      </div>
    )
  }
}

