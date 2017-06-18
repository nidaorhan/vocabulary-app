import React, { Component }            from 'react'

export default class Study extends Component {
  
	state = {
		cardIndex : 0,
		showDesc  : false
	}

	onHardClicked = event => {
		let { cardIndex } = this.state
		let { cards, onAddCard } 		= this.props
		let hardWord = {
			title: cards[ cardIndex ][ 'title' ],
			desc : cards[ cardIndex ][ 'desc' ]
		}
		onAddCard(hardWord)
		this.setState({
			cardIndex : cardIndex + 1,
			showDesc  : false
		})
	}

	onEasyClicked = event => {
		let { cardIndex } = this.state
		this.setState({
			cardIndex : cardIndex + 1,
			showDesc  : false
		})
	}


	getCurrentCard(){
		let title = '' 
		let desc 	= ''

		let { cards } 		= this.props
		let { cardIndex } = this.state

		if( cards.length && cardIndex + 1 <= cards.length ){
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
				
				<h1>STUDY</h1>

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
					disabled={ !cards.length }
					onClick={ this.onHardClicked }
				>
					Hard
				</button>

				<button
					disabled={ !cards.length || cardIndex + 1 === cards.length }
					onClick={ this.onEasyClicked }
				>
					Easy
				</button>
				<br/>
				<button
					disabled={ !cards.length }
					onClick={ this.onToggleDescVisibilityClicked }
				>
					{ showDesc ? 'Hide Description' : 'Show Description' }
				</button>

      </div>
    )
  }
}

