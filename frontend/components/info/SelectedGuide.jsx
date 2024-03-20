import React from 'react'
import Modal from 'react-modal'
import Help from '../icons/Help'
import CloseIcon from '../icons/CloseIcon'
import { useEffect } from 'react'
import { useLockedBody } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { selectedGuideAtom } from '../atoms'

function SelectedGuide() {
 const [locked, setLocked] = useLockedBody(false, 'root')
 const [selectedGuide, setSelectedGuide] = useAtom(selectedGuideAtom)
 useEffect(() => {
  setLocked(selectedGuide)
  return () => setLocked(false)
 }, [selectedGuide])
 const customStyles = {
  overlay: {
   backgroundColor: 'rgba(0,0,0,0.8)',
   zIndex: 999,
  },
  content: {
   padding: '0',
   top: '50%',
   left: '50%',
   maxWidth: '900px',
   maxHeight: '80%',
   backgroundColor: '#1A1A1A',
   right: 'auto',
   bottom: 'auto',
   marginRight: '-50%',
   transform: 'translate(-50%, -50%)',
   zIndex: 1000,
  },
 }
 return (
  <>
   <Modal
    style={customStyles}
    isOpen={selectedGuide}
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    onRequestClose={() => setSelectedGuide(false)}>
    <div className='flex justify-between p-4 px-8'>
     <CloseIcon
      onClick={() => setSelectedGuide(false)}
      className=' cursor-pointer absolute right-2 top-2'
     />
     <div className='flex flex-col gap-2'>
      <div>
       <p className='text-xl font-bold text-accent'>Make Variations:</p>
       <p>
        This feature will use the selected image as a base to generate 4 more variations of the design. You can always come back to this image by clicking on
        the thumbnail in the History section.
       </p>
      </div>
      <div>
       <p className='text-xl font-bold text-accent'>Upscale:</p>
       <p>
        This feature will generate a higher resolution version of the selected image, suitable for printing. You will have the option to add it to your cart as
        a product or keep prompting for more designs.
       </p>
      </div>
     </div>
    </div>
   </Modal>
  </>
 )
}

export default SelectedGuide
