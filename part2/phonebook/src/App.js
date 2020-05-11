import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({ phonebook, search }) => (
  phonebook
    .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    .map(person => (<div key={person.name}>{person.name} {person.number}</div>)))

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = event => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.map(person => person.name).includes(newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
      <div>
        debug: {newName}
      </div>
    </form>)
}

const Filter = ({ newSearch, setNewSearch }) => {
  const handleSearchChange = event => {
    setNewSearch(event.target.value)
  }

  return (<div>filter shown with <input value={newSearch}
    onChange={handleSearchChange} /></div>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const url = 'http://localhost:3001/persons'
  useEffect(() => {
    axios.get(url).then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons phonebook={persons} search={newSearch} />
    </div>
  )
}

export default App