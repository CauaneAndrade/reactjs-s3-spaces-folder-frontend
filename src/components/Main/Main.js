import React, { useState, useEffect } from 'react'
import { uniqueId } from 'lodash'
import filesize from 'filesize'

import api from '../../services/api'

import GlobalStyle from '../../styles/global'
import { Container, Content } from './styles'

import Upload from '../Upload'
import FileList from '../FileList'
import SearchAppBar from '../MenuBar'

const Main = (token) => {
  const [uploadedFiles, setUploadedFiles] = useState([])

  useEffect(() => {
    async function setUploaded () {
      const response = await api.get('files', {
        headers: {
          'auth-token': token.token
        }
      })
      setUploadedFiles(
        response.data.map(file => ({
          id: file._id,
          name: file.name,
          readableSize: filesize(file.size),
          preview: file.url,
          uploaded: true,
          url: file.url
        }))
      )
    }
    setUploaded()
  }, [])

  const handleUpload = files => {
    const upFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    setUploadedFiles(uploadedFiles.concat(upFiles))
    upFiles.forEach(processUpload)
  }
  const path = window.location.pathname
  const processUpload = async uploadedFile => {
    const data = new FormData()
    data.append('file', uploadedFile.file, uploadedFile.name)
    data.append('path', path)

    const response = await api
      .post('files', data, {
        headers: { 'auth-token': token.token },
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total))
          updateFile(uploadedFile.id, { progress })
        }
      })
    updateFile(uploadedFile.id, {
      uploaded: true,
      id: response.data._id,
      url: response.data.url
    })
  }

  const updateFile = (id, data) => {
    setUploadedFiles(
      uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile
      })
    )
  }

  const handleDelete = async id => {
    await api.delete(`files/${id}`, {
      headers: {
        'auth-token': token.token
      }
    })
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
  }

  return (
    <>
      <SearchAppBar />
      <Container>
        <Content>
          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={handleDelete} />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    </>
  )
}

export default Main
