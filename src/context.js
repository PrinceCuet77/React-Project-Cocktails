import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

// api
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	let [loading, setLoading] = useState(true)
	let [searchTerm, setSearchTerm] = useState('a')
	let [cocktails, setCocktails] = useState([])

	let fetchDrinks = useCallback(async () => {
		setLoading(true)
		try {
			// fetching data 
			let response = await fetch(`${url}${searchTerm}`)
			let data = await response.json()

			let { drinks } = data
			if (drinks) {
				let newCocktails = drinks.map((item) => {
					let {
						idDrink,
						strDrink,
						strDrinkThumb,
						strAlcoholic,
						strGlass
					} = item // object destructing

					return { // alias 
						id: idDrink,
						name: strDrink,
						image: strDrinkThumb,
						info: strAlcoholic,
						glass: strGlass
					}
				})
				setCocktails(newCocktails)
			} else {
				setCocktails([])
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}, [searchTerm])

	useEffect(() => {
		fetchDrinks()
	}, [searchTerm, fetchDrinks])

	return (
		<AppContext.Provider
			value={{
				loading,
				searchTerm,
				cocktails,
				setSearchTerm
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

// custom hook 
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
