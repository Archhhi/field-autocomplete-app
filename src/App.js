import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState(false)
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${search}`
        )
        const companies = await data.json()
        setOptions(companies)
      } catch (error) {
        console.log(error)
      }
    }

    search && display && fetchData()
  }, [search])

  function onSelectCompany(nameCompany) {
    setSearch(nameCompany)
    setDisplay(false)
  }

  return (
    <div className={'app'}>
      <div className={'formWrapper'}>
        <label htmlFor={'nameCompany'}>Компания</label>
        <div className={'form'}>
          <input
            type={'text'}
            id={'auto'}
            placeholder={'Начните вводить название компании'}
            value={search}
            autoFocus
            onClick={() => setDisplay(true)}
            onChange={(e) => setSearch(e.target.value)}
          />
          {display && (
            <div className={'autoContainer'}>
              {options.map((company) => {
                return (
                  <div
                    key={company.name}
                    className={'option'}
                    onClick={() => onSelectCompany(company.name)}
                  >
                    <img src={company.logo} />
                    <div className={'optionDetails'}>
                      <span>{company.name}</span>
                      <span>{company.domain}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
