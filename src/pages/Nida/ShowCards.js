import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'

export default class ShowCards extends Component {
  
  static propTypes = {
    name: PropTypes.string
  }
	
	state = {
		cardIndex : 0,
		showDesc : false
	}

	increaseCardIndex = () => {
		let { cards } = this.props
		let cardIndex = this.state.cardIndex
		if (cards.length>cardIndex) {
			this.setState({
				cardIndex: cardIndex+1
			})
		}
	}

  render() {
		
		let { cards } = this.props
		let cardIndex = this.state.cardIndex
		
		console.log('cardIndex: ' + cardIndex )
    return (
		
      <div>
				<h1>SHOW CARDS</h1>
				<p>Title: </p>
				<p style={{color:'grey',fontSize:'15px'}}> 
					{ cards[cardIndex] && cards[cardIndex].title } 
				</p>

				<p>Description: </p>
				<p style={{color:'grey',fontSize:'15px'}}>
					{ this.state.showDesc && cards[cardIndex] && cards[cardIndex].desc}
				</p>

				<button
					onClick={
						event => {
							this.increaseCardIndex()
						}
					}
				>
					Next
				</button>
				<button
					onClick={
						event => {
							this.setState({
								showDesc: !this.state.showDesc,
							})
						}
					}
				>
				{ this.state.showDesc ? 'Hide Description' : 'Show Description' }
				</button>

      </div>
    )
  }
}

