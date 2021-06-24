import React from 'react'
import {connect} from 'react-redux'

export const Home = props => {
  const {username} = props

  return(
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  )
}

const mapState = staet => {
  return {
    username: staet.auth.username
  }
}

export default connect(mapState)(Home)
