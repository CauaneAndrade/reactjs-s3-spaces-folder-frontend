// import React from 'react'
// import Main from './components/Main/Main'
// import Login from './components/Login/Login'

// import useToken from './components/Login/UseToken'
// import ContentList from './components/Folder/ContentList'
// import NewFolderButton from './components/Folder/NewFolder'

// function App () {
//   const { token, setToken } = useToken()
//   if (!token) {
//     return <Login setToken={setToken} />
//   }

//   return (
//     <div className='wrapper'>
//       <Main token={token} />
//       <NewFolderButton token={token} id='' />
//       <ContentList path='' token={token} />
//     </div>
//   )
// }

import Login from './components/Login/Login'
import useToken from './components/Login/UseToken'
import FolderFiles from './components/Folder/Content'
import Main from './components/Main/Main'

function App () {
  const { token, setToken } = useToken()
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className='wrapper'>
      <Main token={token} />
      <FolderFiles path='' token={token} />
    </div>
  )
}

export default App
