import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Content } from './styles'

const Item = ({ item, type, token }) => {
  if (type === 'folder') return <Folder token={token} item={item} />
  else {
    return <File item={item} />
  }
}

const File = (item) => {
  return (
    <div>
      <img src='https://cdn.iconscout.com/icon/free/png-256/log-file-1-504262.png' height='60' /><br />
      <a href={item.url}><b>{item.item}</b></a>
    </div>
  )
}

const Folder = (props) => {
  const token = props.token
  const item = props.item
  return (
    <div>
      <img src='https://icons-for-free.com/iconfiles/png/512/folder+icon-1320191242863903371.png' height='60' /><br />
      <Link to={'/' + item}>{item}</Link>
    </div>
  )
}

const PageContent = (props) => {
  const userContent = props.userContent
  const token = props.token
  return (
    <Content>
      {
        userContent.map(obj => (
          <Item key={obj.key} token={token} item={obj.itemName} type={obj.itemType} url={obj.itemUrl} />
        ))
      }
    </Content>
  )
}

function ContentList (props) {
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
      console.log(response.data)
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
    <PageContent userContent={userContent} token={token} />
  )
}

export default ContentList
