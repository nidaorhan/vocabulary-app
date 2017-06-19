import React, { Component }       from 'react'
import { bindActionCreators }     from 'redux'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'

import * as nidaActions           from './redux'
import AddCard                    from './AddCard'
import ShowCards                  from './ShowCards'
import Study                      from './Study'

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

  state = {
  	showStudy: false
  }
	
	onAddCard = ( cardObject = {} ) => {
		let { cards } = this.props.nidaState
		let { nidaActions } = this.props
		nidaActions.setRootReduxStateProp(
			'cards', 
			[ ...cards, cardObject ]
		)
	}

	onDeleteCard = ( cardIndexToBeDeleted = '' ) => {
		let { cards } = this.props.nidaState
		let { nidaActions } = this.props
		var newCards = cards.filter( item => item !== cards[ cardIndexToBeDeleted ] )
		nidaActions.setRootReduxStateProp(
			'cards', 
			newCards
		)
	}

	onSettingsClicked = event => {
		this.setState({showStudy: false})
	}

	onStudyClicked = event => {
		this.setState({showStudy: true}) 
	}

  render() {
		
		let { cards } = this.props.nidaState
		let { showStudy } = this.state

    return (

      <div id="main-wrapper" >

      	<div className="tabs-wrapper">
					<button
	      		className={"tabs " + (!showStudy ? 'active' : '')}
						onClick={ event => this.onSettingsClicked() }
					>
						SETTINGS
					</button>
					<button
						className={"tabs " + (showStudy ? 'active' : '')}
						onClick={ event => this.onStudyClicked() }
					>
						STUDY
					</button>
      	</div>

				<div>

					<div 
						className="settings-container"
						style={{display: showStudy ? 'none' : 'block' }} >
						<AddCard onAddCard={ this.onAddCard } /> 
					</div>
					<div 
						className="table-container"
						style={{display: showStudy ? 'none' : 'block' }} >
						<ShowCards cards={ cards } /> 
					</div>
					<div 
						className="study-container"
						style={{display: showStudy ? 'flex' : 'none'}} >
						<Study onAddCard={ this.onAddCard } cards={ cards } /> 
					</div>
					
				</div>
				
      </div>
    )
  }
}

