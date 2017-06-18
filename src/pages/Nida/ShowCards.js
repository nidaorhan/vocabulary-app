import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'

export default class ShowCards extends Component {
  
  static propTypes = {
    cards: PropTypes.array.isRequired
  }
	
	state = {
		cardIndex : 0,
		showDesc : false
	}

	onShowPreviousCardClicked = event => {
		let { cardIndex } = this.state
		this.setState({
			cardIndex : cardIndex - 1,
			showDesc  : false
		})
	}

	onShowNextCardClicked = event => {
		let { cardIndex } = this.state
		this.setState({
			cardIndex : cardIndex + 1,
			showDesc  : false
		})
	}

	onDeleteButtonClicked = event => {
		let { onDeleteCard } 		= this.props
		let { cardIndex } = this.state
		onDeleteCard(cardIndex)
		this.setState({
			cardIndex : cardIndex - 1,
			showDesc  : false
		})
	}

	getCurrentCard(){
		
		let title = '' 
		let desc 	= ''

		let { cards } 		= this.props
		let { cardIndex } = this.state

		if( cards.length ){
			title = cards[ cardIndex ][ 'title' ]
			desc 	= cards[ cardIndex ][ 'desc' ]
		}

		return { title, desc }
	}

	onToggleDescVisibilityClicked = event => {
		let { showDesc } = this.state
		this.setState({ showDesc: !showDesc })
	}

  render() {

  	let { cards } = this.props

		let { showDesc, cardIndex } = this.state
		
		let { title, desc } = this.getCurrentCard()

    return (
		
      <div>
				
				<h1>SHOW CARDS</h1>

				<p>
					Title: 
				</p>
				<p style={{color:'grey',fontSize:'15px'}}> 
					{ title } 
				</p>

				<p>
					Description: 
				</p>
				{
					showDesc &&
					<p style={{color:'grey',fontSize:'15px'}}>
						{ desc }
					</p>
				}
				
				<button
					disabled={ !cards.length || cardIndex === 0 }
					onClick={ this.onShowPreviousCardClicked }
				>
					Previous
				</button>

				<button
					disabled={ !cards.length || cardIndex + 1 === cards.length }
					onClick={ this.onShowNextCardClicked }
				>
					Next
				</button>

				<button
					disabled={ !cards.length }
					onClick={ this.onToggleDescVisibilityClicked }
				>
					{ showDesc ? 'Hide Description' : 'Show Description' }
				</button>

				<button
						disabled={ !cards.length }
						onClick={ this.onDeleteButtonClicked }
					>
						Delete
					</button>

      </div>
    )
  }
}

