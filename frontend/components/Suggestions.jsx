import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

import { useLockedBody } from 'usehooks-ts'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    padding: '0',
    top: '60%',
    left: '50%',
    maxWidth: '80%',
    maxHeight: '70%',
    backgroundColor: '#1A1A1A',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10000,
  },
}

function Suggestions({ modalIsOpen, setModalIsOpen }) {
  return (
    <Modal style={customStyles} isOpen={modalIsOpen} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={() => setModalIsOpen(false)}>
      <h1>Suggestions:</h1>
    </Modal>
  )
}

export default Suggestions
