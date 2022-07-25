import { Component, For } from 'solid-js'
import { setUsername, repos, username } from '../App'
import RepoCard, { Repo } from '../components/RepoCard'

const Home: Component = () => {
  const changeUsername = (event: Event) => {
    event.preventDefault()

    // Get the data from the form
    const formData = new FormData(
      event.target as EventTarget as HTMLFormElement
    )
    const newName = formData.get('usernameInput')

    // Early return if no name was submitted
    if (!newName) return

    // Update the username in state
    setUsername(newName as string)
    localStorage.setItem('username', JSON.stringify(newName as string))

    // Empty the input element (in the most convoluted fashion I've ever seen)
    const target = event.target as EventTarget as HTMLFormElement
    const input = target.querySelector('input') as HTMLInputElement
    input.value = ''
  }

  return (
    <div>
      <form class="form" onSubmit={changeUsername}>
        <input name="usernameInput" />
        <button class="btn btn-dark">Fetch</button>
      </form>
      <h2>Github repos for {username()}</h2>
      <div class="repos">
        {repos().length ? (
          <For each={repos()}>{(repo: Repo) => <RepoCard repo={repo} />}</For>
        ) : (
          <p>No repos found</p>
        )}
      </div>
    </div>
  )
}

export default Home
