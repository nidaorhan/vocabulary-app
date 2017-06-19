import React, { Component }            from 'react'

export default class Study extends Component {
  
	state = {
		cardIndex : 0,
		showDesc  : false
	}

	getCurrentCard = () => {
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

	onEasyClicked = () => {
		let { cardIndex } = this.state

		this.setState({
			cardIndex : cardIndex + 1,
			showDesc  : false
		})
	}

	onHardClicked = () => {
		let { cardIndex } = this.state
		let { cards, onAddCard } 		= this.props

		let hardWord = {
			title: cards[ cardIndex ][ 'title' ],
			desc : cards[ cardIndex ][ 'desc' ],
			hardWord : true
		}
		onAddCard(hardWord)

		this.setState({
			cardIndex : cardIndex + 1,
			showDesc  : false
		})
	}

	onStudyAgainClicked = () => {
		this.setState({
			finished:false,
			cardIndex: 0
		})
	}

	onToggleDescVisibilityClicked = event => {
		let { showDesc } = this.state

		this.setState({ showDesc: !showDesc })
	}

  render() {

  	let { cards } = this.props

		let { showDesc, cardIndex } = this.state
		
		let { title, desc } = this.getCurrentCard()

		let finishedCards = cards.length === cardIndex 

		let disabled = !cards.length || finishedCards

    return (
		
      <div className="study-container">

				{
					!finishedCards &&
					<div className="card">
						<div className="study-title">{ title }</div>
						<div 
							className="study-desc"
							style={{ visibility: (showDesc ? 'visible' : 'hidden')}}>
							{ desc }
						</div>
	      	</div>
				}

				{
					!finishedCards &&
					<div className="buttons-container">
		      	<button
							className="cta visibility"
							disabled={ disabled }
							onClick={ this.onToggleDescVisibilityClicked }
						>
							{ showDesc ? 'Hide' : 'Show' }
						</button>

						<br/>

						<button
							className="cta hardness"
							disabled={ disabled }
							onClick={ this.onHardClicked }
						>
							Hard >
						</button>

						<button
							className="cta hardness"
							disabled={ disabled }
							onClick={ this.onEasyClicked }
						>
							Easy >
						</button>
	      	</div>
				}
      	
				{
					finishedCards &&
					<div className="congrats">Congratulations!</div>
				}

				{
					finishedCards &&
					<button
						className="cta visibility"
						onClick={ this.onStudyAgainClicked }
					>
						Study again
					</button>
				}

      </div>
    )
  }
}

