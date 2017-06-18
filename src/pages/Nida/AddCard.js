import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'

export default class AddCard extends Component {
  
  static propTypes = {
    name: PropTypes.string
  }

	state = {
		title: '',
		desc: ''
	}

	onFormSubmitted = event => {
		event.preventDefault() // not to reload the page
	}

  render() {
		
		let { onAddCard } = this.props
		let { title, desc } = this.state

    return (

      <div>
				
				<h1>ADD NEW CARD</h1>
				
				<form onSubmit={ this.onFormSubmitted } >

					<p>Title: </p>

					<input 
						type="text"
						value={ title }
						onChange={
							event => {
								this.setState({
									title: event.target.value
								})
							}
						}
					/>

					<br/><br/>

					<p>Description: </p>

					<input 
						type="text"
						value={ desc }
						onChange={
							event => {
								this.setState({
									desc: event.target.value
								})
							}
						}
					/>

					<br/><br/>

					<button
						type="submit"
						onClick={ event => {
							onAddCard({
								title : title,
								desc : desc
							})
							this.setState({
								title: '',
								desc: ''
							})
						}}
					>
						Add new card
					</button>
					
				</form>

      </div>
    )
  }
}

