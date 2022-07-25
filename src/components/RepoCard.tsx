import { Component } from 'solid-js'
import { savedRepos, setSavedRepos } from '../pages/SavedRepos'

export type Repo = {
  id: string
  html_url: string
  name: string
  description: string
  stargazers_count: string
  owner: {
    login: string
  }
}

interface Props {
  repo: Repo
}

const saveRepo = (repo: Repo) => {
  setSavedRepos([repo, ...savedRepos()])
  localStorage.setItem('savedRepos', JSON.stringify(savedRepos()))
}

const unSaveRepo = (repoId: string) => {
  setSavedRepos(savedRepos()?.filter(repo => repo.id !== repoId))
  localStorage.setItem('savedRepos', JSON.stringify(savedRepos()))
}

const isRepoSaved = (repoId: string): boolean => {
  return savedRepos()?.some(repo => repo.id === repoId)
}

const RepoCard: Component<Props> = ({ repo }) => {
  return (
    <div class="card">
      <div class="card-header">
        <div>&#11088; stars: {repo.stargazers_count}</div>
        <div>
          {isRepoSaved(repo.id) ? (
            <button class="btn btn-danger" onClick={() => unSaveRepo(repo.id)}>
              Un-Save
            </button>
          ) : (
            <button class="btn btn-success" onClick={() => saveRepo(repo)}>
              Save
            </button>
          )}
        </div>
      </div>
      <div class="card-body">
        <a href={repo.html_url} target="blank" rel="noreferrer">
          <strong>{repo.owner?.login}</strong>/{repo.name}
        </a>
        {repo.description && <p class="card-text">{repo.description}</p>}
      </div>
    </div>
  )
}

export default RepoCard
