import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'

export default class CardsTable extends Component {
  
  static propTypes = {
    cards: PropTypes.array.isRequired
  }

  state = {
  	editing: false
  }
	
	deleteCard = cardIndexToBeDeleted => {
		let { onDeleteCard } = this.props
		onDeleteCard(cardIndexToBeDeleted)
	}

	getFilteredCards = () => {
		let { cards } = this.props

		let filteredCards = cards.filter( item => {
			return Object.keys(item).length === 2
		})

		return {filteredCards}
	}

  render() {

  	let { filteredCards } = this.getFilteredCards()
		
		let { editing } = this.state

    return (
		
      <div className="table-container" >
				
				<h1>VOCABULARY</h1>
				<table>
					<thead>
						<tr>
								<th>#</th>
						    <th>Title</th>
						    <th>Description</th>
						</tr>
					</thead>
					<tbody>
						{filteredCards.map((card,i) => {
							return (
								<tr key={'row' + i}>
									<td key={'#' + i+1} >{ i+1 }</td>
							    <td key={'title' + i+2} >{ card.title }</td> 
							    <td key={'desc' + i+3}>{ card.desc }</td>
							    <td>
							    	<button
											className="cta"
										>
											Edit
										</button>
							    </td>
							    <td>
							    	<button
											className="cta"
											onClick={ () => this.deleteCard(i) }
										>
											Delete
										</button>
							    </td>
							  </tr>
							)
						})}
					</tbody>
					
					
				</table>

      </div>
    )
  }
}

