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

      <div className="add-card-container" >
				<form onSubmit={ this.onFormSubmitted } >

					<div className="label"> Title: </div>
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

					<div className="label">Description: </div>
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
						className="cta"
						type="submit"
						onClick={ 
							event => {
								onAddCard({
									title : title,
									desc : desc
								})
								this.setState({
									title: '',
									desc: ''
								})
							}
						}
					>
						Add new card
					</button>
					
				</form>
      </div>
    )
  }
}

