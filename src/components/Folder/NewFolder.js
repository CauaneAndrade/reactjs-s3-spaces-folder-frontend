import React from 'react'
import api from '../../services/api'

const NewFolderButton = (props) => {
  const token = props.token
  let id = props.id
  if (id) {
    id = id + '/'
  } else {
    id = ''
  }
  const createNewFolder = async () => {
    const name = document.getElementById(id + 'inputFolderName')
    const path = window.location.pathname
    const data = {
      path: path,
      name: name.value
    }
    await api.request({
      method: 'POST',
      url: 'folder',
      data: data,
      headers: { 'auth-token': token }
    })
  }
  return (
    <form onSubmit={() => createNewFolder()}>
      <label>
        <input
          defaultValue=''
          id={id + 'inputFolderName'}
          type='text'
        />
      </label>
      <input type='submit' value='Criar pasta' />
    </form>
  )
}

export default NewFolderButton
