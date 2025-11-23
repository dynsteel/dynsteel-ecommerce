import { createContext, useContext, useReducer, useEffect } from 'react'

const FavoritesContext = createContext()

// Favorites reducer
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      const exists = state.items.find(item => item.id === action.payload.id)
      if (exists) {
        return state // Zaten favorilerde
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        items: []
      }

    case 'LOAD_FAVORITES':
      return {
        ...state,
        items: action.payload
      }

    default:
      return state
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, {
    items: []
  })

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(savedFavorites) })
      }
    }
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(state.items))
    }
  }, [state.items])

  const addToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product })
  }

  const removeFromFavorites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId })
  }

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' })
  }

  const isFavorite = (productId) => {
    return state.items.some(item => item.id === productId)
  }

  const value = {
    items: state.items,
    favorites: state.items, // Alias for items
    totalItems: state.items.length,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

