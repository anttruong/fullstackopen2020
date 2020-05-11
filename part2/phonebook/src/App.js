import React, { useState } from 'react'

const Display = ({ phonebook, search }) => (
  phonebook
    .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    .map(person => (<div key={person.name}>{person.name} {person.number}</div>)))

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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

  const handleSearchChange = event => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newSearch}
        onChange={handleSearchChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
        <div>
          debug: {newName}
        </div>
      </form>
      <h2>Numbers</h2>
      <Display phonebook={persons} search={newSearch}/>
    </div>
  )
}

export default App