import { Component, createSignal, For } from 'solid-js'
import RepoCard, { Repo } from '../components/RepoCard'

const reposFromLocalStore = JSON.parse(
  localStorage.getItem('savedRepos') || '[]'
)
const [savedRepos, setSavedRepos] = createSignal(reposFromLocalStore as Repo[])

const SavedRepos: Component = () => {
  return (
    <div>
      <h2>Your save repos</h2>
      <div class="repos">
        {savedRepos().length ? (
          <For each={savedRepos()}>
            {(repo: Repo) => <RepoCard repo={repo} />}
          </For>
        ) : (
          <p>You have no saved repos</p>
        )}
      </div>
    </div>
  )
}

export { savedRepos, setSavedRepos }
export default SavedRepos
