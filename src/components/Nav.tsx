import { NavLink } from 'solid-app-router'
import { Component } from 'solid-js'
import { savedRepos } from '../pages/SavedRepos'

const Nav: Component = () => {
  return (
    <nav class="nav">
      <NavLink href="/" class="btn-bigger" end activeClass="active-link">
        Home
      </NavLink>
      <NavLink href="/savedrepos" class="btn-bigger" activeClass="active-link">
        Saved ~ {savedRepos().length}
      </NavLink>
    </nav>
  )
}

export default Nav
