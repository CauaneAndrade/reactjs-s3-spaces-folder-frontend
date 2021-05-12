import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import api from '../../services/api'
import ContentList from './ContentList'

function ModalSwitch (props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={'/' + props.path}><ContentList token={props.token} path={props.path} /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default function FolderFiles (props) {
  const path = props.path
  const token = props.token
  const [userContent, setUserContent] = useState([])
  useEffect(() => {
    async function setUploaded () {
      const response = await api.request({
        method: 'GET',
        url: 'content',
        // data: { path: path },
        headers: { 'auth-token': token }
      })
      setUserContent(
        response.data.map(obj => ({
          key: obj.key,
          itemName: obj.itemName,
          itemType: obj.itemType,
          itemUrl: obj.itemUrl
        }))
      )
    }
    setUploaded()
  }, [])
  return (
    <ModalSwitch key='' path='' token={token} />
  )
}
