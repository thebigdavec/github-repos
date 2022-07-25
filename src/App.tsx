import { Route, Routes } from 'solid-app-router'
import { Component, createEffect, createSignal } from 'solid-js'
import Nav from './components/Nav'
import Home from './pages/Home'
import SavedRepos from './pages/SavedRepos'

const [username, setUsername] = createSignal(
  localStorage.getItem('username')
    ? JSON.parse(localStorage.getItem('username') || '')
    : 'thebigdavec'
)
const [repos, setRepos] = createSignal([])

createEffect(async () => {
  const res = await fetch(
    `https://api.github.com/users/${username()}/repos?sort=created`
  )
  setRepos(await res.json())
})
const App: Component = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/savedrepos" element={<SavedRepos />} />
      </Routes>
    </>
  )
}

export { username, setUsername, repos }
export default App
