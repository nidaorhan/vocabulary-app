import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'

export default class CardsTable extends Component {
  
  static propTypes = {
    cards 			: PropTypes.array.isRequired,
    onEditCard 	: PropTypes.func.isRequired,
  }

  state = {
  	indexOfEdited: false,
  	editedItem_Title : '',
  	editedItem_Desc : ''
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
		
		let { 
			indexOfEdited,
			editedItem_Title,
			editedItem_Desc
		} = this.state

		let { onEditCard, onDeleteCard } = this.props

    return (
		
      <div className="table-container" >
				
				<h1>VOCABULARY</h1>
				<table>
					<thead>
						<tr>
								<th>#</th>
						    <th>Title</th>
						    <th>Description</th>
						    <th></th>
						    <th></th>
						</tr>
					</thead>
					<tbody>
						{
							filteredCards.map( ( card, index ) => {

								let isBeingEdited = indexOfEdited === index 

								return (
									<tr key={ `row-${index}` }>
										<td>
											{ index+1 }
										</td>
										<td>
											{ 
												isBeingEdited
												? <form 
														onSubmit={ event => {
															event.preventDefault()
															editedItem_Title 	= editedItem_Title.trim()
															editedItem_Desc 	= editedItem_Desc.trim()
															if( editedItem_Title.length && editedItem_Desc.length ){
																onEditCard( 
																	index, 
																	{ 
																		title : editedItem_Title,
																		desc  : editedItem_Desc
																	} 
																)
																this.setState({ indexOfEdited : null })
															} 
														} }
													>
														<input 
															type="text" 
															value={ editedItem_Title } 
															onChange={ event => this.setState({
																editedItem_Title : event.target.value
															}) }
														/>
													</form>
												: card.title
											}
										</td> 
										<td>
											{
												isBeingEdited
												? <form 
														onSubmit={ event => {
															event.preventDefault()
															editedItem_Title 	= editedItem_Title.trim()
															editedItem_Desc 	= editedItem_Desc.trim()
															if( editedItem_Title.length && editedItem_Desc.length ){
																onEditCard( 
																	index, 
																	{ 
																		title : editedItem_Title,
																		desc  : editedItem_Desc
																	} 
																)
																this.setState({ indexOfEdited : null })
																// this.props.onItemEdited( index, { title : '', desc : '' } )
																// props tan gelen onItemEdited fonksiyonunu cagir, 
																// index i ve title ve desc i gec
															} 
														} }
													>
														<input 
															type="text" 
															value={ editedItem_Desc } 
															onChange={ event => this.setState({
																editedItem_Desc : event.target.value
															}) }
														/>
													</form>
												: card.desc
											}
										</td>
										<td className="button-cell">
								    	<button
												className="cta"
												onClick={ event => {
													if( isBeingEdited ){
														editedItem_Title 	= editedItem_Title.trim()
														editedItem_Desc 	= editedItem_Desc.trim()
														if( editedItem_Title.length && editedItem_Desc.length ){
															onEditCard( 
																index, 
																{ 
																	title : editedItem_Title,
																	desc  : editedItem_Desc
																} 
															)
															this.setState({ indexOfEdited : null })
														}
													}else{
														this.setState({ 
															indexOfEdited 		: index,
															editedItem_Title 	: card.title,
															editedItem_Desc 	: card.desc
														})
													}
												} }
											>
												{
													isBeingEdited ? 'Save' : 'Edit'
												}
											</button>
								    </td>
								    <td className="button-cell">
								    	<button
												className="cta"
												onClick={ () => onDeleteCard(index) }
											>
												Delete
											</button>
								    </td>
								  </tr>
								)
							})
						}
					</tbody>
					
					
				</table>

      </div>
    )
  }
}

