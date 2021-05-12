import React from 'react'
import Dropzone from 'react-dropzone'
import { DropContainer, UploadMessage } from './styles'

export default function Upload (props) {
  function renderDragMessage (isDragActive, isDragReject) {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos...</UploadMessage>
    }

    if (isDragReject) {
      // precisa arrumar ainda
      return <UploadMessage type='error'>Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type='success'>Solte os arquivos</UploadMessage>
  };
  const { onUpload } = props
  return (
    <Dropzone onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  )
}
