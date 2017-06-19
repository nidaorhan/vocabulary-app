import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'

export default class ShowCards extends Component {
  
  static propTypes = {
    cards: PropTypes.array.isRequired
  }
	
  render() {

  	let { cards } = this.props
		let filteredCards = cards.filter( item => {
			return Object.keys(item).length === 2
		})
    return (
		
      <div>
				
				<h1>CARD LIST</h1>
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
								<tr key={i}>
									<td key={i+1} >{ i+1 }</td>
							    <td key={i+2} >{ card.title }</td>
							    <td key={i+3}>{ card.desc }</td>
							  </tr>
							)
						})}
					</tbody>
					
					
				</table>

      </div>
    )
  }
}

