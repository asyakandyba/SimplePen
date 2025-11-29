import { bookService } from '../services/book.service.js'
import { getValidValues } from '../services/util.service.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function useSearchParamsFilter(setFilterBy) {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const filterFromSearchPrms =
      bookService.getFilterFromSearchParams(searchParams)
    setFilterBy(filterFromSearchPrms)
  }, [])

  function setExistingSearchPrms(filterBy) {
    setSearchParams(getValidValues(filterBy))
  }

  return setExistingSearchPrms
}
