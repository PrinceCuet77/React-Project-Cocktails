import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
	let { setSearchTerm } = useGlobalContext()
	let searchValue = React.useRef('')

	React.useEffect(() => {
		searchValue.current.focus()
	}, [])

	let searchCocktail = () => {
		setSearchTerm(searchValue.current.value)
	}

	let handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<section className='section search'>
			<form className='search-form' onSubmit={handleSubmit}>
				<div className='form-control'>
					<label htmlFor='name'>search your favourite cocktail</label>
					<input
						type='text'
						id='name'
						ref={searchValue}
						onChange={searchCocktail}
					/>
				</div>
			</form>
		</section>
	)
}

export default SearchForm
