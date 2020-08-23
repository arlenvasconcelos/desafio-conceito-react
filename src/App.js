import React, {useEffect, useState} from "react";

import  api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
      title: `Projeto ${Date.now()}`
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`)

    setRepositories(repositories.filter((repository) => {
      if (repository.id !== id)
        return repository
    }))
    

  }

  //Effects
  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }

        </ul>
        

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
