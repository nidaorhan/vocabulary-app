import React, { Component }       from 'react'
import { bindActionCreators }     from 'redux'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'

import * as nidaActions           from './redux'
import AddCard                    from './AddCard'
import CardsTable                 from './CardsTable'
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

	onDeleteCard = ( cardIndexToBeDeleted ) => {
		let { cards } = this.props.nidaState
		let { nidaActions } = this.props
		var newCards = cards.filter( (item, index) => index !== cardIndexToBeDeleted )
		nidaActions.setRootReduxStateProp(
			'cards', 
			newCards
		)
	}

	onSettingsClicked = () => {
		this.setState({showStudy: false})
	}

	onStudyClicked = () => {
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
						onClick={ this.onSettingsClicked }
					>
						SETTINGS
					</button>
					<button
						className={"tabs " + (showStudy ? 'active' : '')}
						onClick={ this.onStudyClicked }
					>
						STUDY
					</button>
      	</div>

				<div>

					{
						!showStudy &&
						<div className="settings" >
							<CardsTable 
								onDeleteCard={ this.onDeleteCard } 
								cards={ cards } /> 
							<AddCard onAddCard={ this.onAddCard } /> 
						</div>
					}

					{
						showStudy &&
						<Study 
							onAddCard={ this.onAddCard } 
							cards={ cards } /> 
					}
							
				</div>
      </div>
    )
  }
}

