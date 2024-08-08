import { useState, useEffect } from "react";
import personService from "./services/persons";

const Numbers = ({ persons, filter, deletePerson }) => {
  if (!persons) return null;
  return (
    <>
      <h3>Numbers</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {persons.map((person) => {
          const nameLower = person.name.toLowerCase();
          if (!nameLower.includes(filter.toLowerCase())) return null;
          return (
            <li key={person.name}>
              {`${person.name} ${person.number}`}
              <button onClick={() => deletePerson(person)}>delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  addPerson,
  handleNameInputChange,
  handleNumberInputChange,
}) => {
  return (
    <>
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Filter = ({ filterValue, handleFilterInputChange }) => {
  return (
    <>
      filter shown with:{" "}
      <input value={filterValue} onChange={handleFilterInputChange} />
    </>
  );
};

const Notification = ({ message, error }) => {
  if (!message) return null;
  return <div className={error ? "error" : "success"}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  useEffect(() => {
    updatePersons();
  }, []);

  const setError = (error) => {
    console.log(error.message);
    setErrorMessage(error.message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const setSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const updatePersons = async () => {
    try {
      const newPersons = await personService.getPersons();
      setPersons(newPersons);
    } catch (err) {
      setError(err);
    }
  };

  const checkDuplicateEntry = () => {
    let duplicateFound = false;
    for (const person of persons) {
      if (person.name !== newName) continue;
      updatePerson(person);
      duplicateFound = true;
      break;
    }
    return duplicateFound;
  };

  const checkEmptyInput = () => {
    if (newName != "" && newNumber != "") return;
    window.alert(`please fill both fields`);
    return true;
  };

  const addPerson = async (event) => {
    try {
      event.preventDefault();
      if (checkEmptyInput()) return;
      if (checkDuplicateEntry()) return;
      await personService.addPerson({ name: newName, number: newNumber });
      setSuccess(`Added ${newName}`);
      setNewName("");
      setNewNumber("");
    } catch (err) {
      setError(err);
    }
    updatePersons();
  };

  const deletePerson = async (person) => {
    try {
      if (!window.confirm(`Delete ${person.name}?`)) return;
      await personService.deletePerson(person.id);
      setSuccess(`Deleted ${person.name}`);
    } catch (err) {
      setError(err);
    }
    updatePersons();
  };

  const updatePerson = async (person) => {
    if (
      !window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    )
      return;
    try {
      person.number = newNumber;
      await personService.updatePerson(person);
      setSuccess(`Updated ${person.name}`);
    } catch (err) {
      setError(err);
    }
    updatePersons();
    setNewName("");
    setNewNumber("");
  };

  const handleNameInputChange = (event) => {
    const input = event.target.value;
    setNewName(input);
  };

  const handleNumberInputChange = (event) => {
    const input = event.target.value;
    setNewNumber(input);
  };

  const handleFilterInputChange = (event) => {
    const input = event.target.value;
    setFilterValue(input);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage ?? successMessage}
        error={!!errorMessage}
      />
      <Filter
        filterValue={filterValue}
        handleFilterInputChange={handleFilterInputChange}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />
      <Numbers
        persons={persons}
        filter={filterValue}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
