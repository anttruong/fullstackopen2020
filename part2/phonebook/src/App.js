import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Persons = ({ phonebook, search, Delete }) => {
  return phonebook
    .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    .map(person => (<div key={person.name}>
      {person.name} {person.number}
      <button type="button" value={person}
        onClick={() => Delete(person)}>delete</button>
    </div>))
}

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = event => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.map(person => person.name).includes(newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService.create(newPerson).then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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

  const Delete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteId(person.id).then(response => {
        setPersons(persons.filter(x => x.id !== person.id))
      }).catch(error => {
        alert(`the name ${person.name} was already deleted from the server`)
        setPersons(persons.filter(x => x.id !== person.id))
      })
    }
  }

  useEffect(() => {
    personService.getAll().then(response => {
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
      <Persons phonebook={persons} search={newSearch} Delete={Delete} />
    </div>
  )
}

export default App