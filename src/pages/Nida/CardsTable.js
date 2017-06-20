import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'

export default class CardsTable extends Component {
  
  static propTypes = {
    cards 			: PropTypes.array.isRequired,
    onEditCard 	: PropTypes.func.isRequired,
  }

  state = {
  	itemIndexBeingEdited: false,
  	itemBeingEdited_TitleValue : '',
  	itemBeingEdited_DescValue : ''
  }

  onEditClicked = () => {
  	this.setState({
  		//itemIndexBeingEdited: true
  	})
  }
	
	onDeleteClicked = cardIndexToBeDeleted => {
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
		
		let { 
			itemIndexBeingEdited,
			itemBeingEdited_TitleValue,
			itemBeingEdited_DescValue
		} = this.state

		let { onEditCard } = this.props

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

								let isBeingEdited = itemIndexBeingEdited === index 

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
															itemBeingEdited_TitleValue 	= itemBeingEdited_TitleValue.trim()
															itemBeingEdited_DescValue 	= itemBeingEdited_DescValue.trim()
															if( itemBeingEdited_TitleValue.length && itemBeingEdited_DescValue.length ){
																onEditCard( 
																	index, 
																	{ 
																		title : itemBeingEdited_TitleValue,
																		desc  : itemBeingEdited_DescValue
																	} 
																)
																this.setState({ itemIndexBeingEdited : null })
																// this.props.onItemEdited( index, { title : '', desc : '' } )
																// props tan gelen onItemEdited fonksiyonunu cagir, 
																// index i ve title ve desc i gec
															} 
														} }
													>
														<input 
															type="text" 
															value={ itemBeingEdited_TitleValue } 
															onChange={ event => this.setState({
																itemBeingEdited_TitleValue : event.target.value
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
															itemBeingEdited_TitleValue 	= itemBeingEdited_TitleValue.trim()
															itemBeingEdited_DescValue 	= itemBeingEdited_DescValue.trim()
															if( itemBeingEdited_TitleValue.length && itemBeingEdited_DescValue.length ){
																onEditCard( 
																	index, 
																	{ 
																		title : itemBeingEdited_TitleValue,
																		desc  : itemBeingEdited_DescValue
																	} 
																)
																this.setState({ itemIndexBeingEdited : null })
																// this.props.onItemEdited( index, { title : '', desc : '' } )
																// props tan gelen onItemEdited fonksiyonunu cagir, 
																// index i ve title ve desc i gec
															} 
														} }
													>
														<input 
															type="text" 
															value={ itemBeingEdited_DescValue } 
															onChange={ event => this.setState({
																itemBeingEdited_DescValue : event.target.value
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
														itemBeingEdited_TitleValue 	= itemBeingEdited_TitleValue.trim()
														itemBeingEdited_DescValue 	= itemBeingEdited_DescValue.trim()
														if( itemBeingEdited_TitleValue.length && itemBeingEdited_DescValue.length ){
															onEditCard( 
																index, 
																{ 
																	title : itemBeingEdited_TitleValue,
																	desc  : itemBeingEdited_DescValue
																} 
															)
															this.setState({ itemIndexBeingEdited : null })
															// this.props.onItemEdited( index, { title : '', desc : '' } )
															// props tan gelen onItemEdited fonksiyonunu cagir, 
															// index i ve title ve desc i gec
														}
													}else{
														this.setState({ 
															itemIndexBeingEdited 				: index,
															itemBeingEdited_TitleValue 	: card.title,
															itemBeingEdited_DescValue 	: card.desc
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
												onClick={ () => this.onDeleteClicked( index ) }
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

