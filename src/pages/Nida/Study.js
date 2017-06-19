import React, { Component }            from 'react'

export default class Study extends Component {
  
	state = {
		cardIndex : 0,
		showDesc  : false,
		finished  : false
	}

	componentWillUpdate(nextProps, nextState) {
		let { cardIndex } = this.state
		let { cards } 		= this.props
		if (cards.length===cardIndex+1) {
			this.setState({
				finished: true
			})
		}
	}

	onHardClicked = event => {
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

		let { showDesc, cardIndex, finished } = this.state
		
		let { title, desc } = this.getCurrentCard()

    return (
		
      <div className="study">
				
				<div
					style={{ display: finished ? 'none' : 'block' }}
					className="study-title"> 
					{ title } 
				</div>
			
				<div 
					className="study-desc"
					style={{ 
						visibility: (showDesc ? 'visible' : 'hidden'),
						display: (finished ? 'none' : 'block') 
					}}>
					{ desc }
				</div>
				
				<button
					className="cta visibility"
					disabled={ !cards.length }
					onClick={ this.onToggleDescVisibilityClicked }
					style={{ display: finished ? 'none' : 'inline-block' }}
				>
					{ showDesc ? 'Hide' : 'Show' }
				</button>
				<br/>
				<button
					className="cta hardness"
					disabled={ !cards.length || cardIndex === cards.length }
					onClick={ this.onHardClicked }
					style={{ display: finished ? 'none' : 'inline-block' }}
				>
					Hard
				</button>

				<button
					className="cta hardness"
					disabled={ !cards.length || cardIndex === cards.length }
					onClick={ this.onEasyClicked }
					style={{ display: finished ? 'none' : 'inline-block' }}
				>
					Easy
				</button>

				<div 
					className="congrats"
					style={{ display: finished ? 'block' : 'none' }}
				>
					Congratulations!
				</div>

				<button
					className="cta visibility"
					onClick={ event => {
						this.setState({
							finished:false,
							cardIndex: 0
						})
					} }
					style={{ display: finished ? 'inline-block' : 'none' }}
				>
					Study again
				</button>
				

      </div>
    )
  }
}

