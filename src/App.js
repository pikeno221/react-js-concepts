import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories () {
      const response = await api.get('repositories')
      setRepositories(response.data)
      console.log(response.data);
      console.log(repositories);

    }
    loadRepositories();
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);

    console.log(repositories);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filteredRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(filteredRepositories);
    

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map(repository => (

            <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>

          ))
        }

      </ul>

      <button onClick={(handleAddRepository)}>Adicionar</button>
    </div>
  );
}

export default App;
