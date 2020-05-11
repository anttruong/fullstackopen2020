import React, { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newSearch, setNewSearch] = useState('')

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