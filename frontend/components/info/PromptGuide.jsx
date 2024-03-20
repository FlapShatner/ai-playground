import React from 'react'
import Modal from 'react-modal'
import Help from '../icons/Help'
import CloseIcon from '../icons/CloseIcon'
import { useEffect } from 'react'
import { useLockedBody } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { promptGuideAtom } from '../atoms'

function PromptGuide({ setIsOpen, isOpen }) {
 const [locked, setLocked] = useLockedBody(false, 'root')
 const [promptGuide, setPromptGuide] = useAtom(promptGuideAtom)
 useEffect(() => {
  setLocked(promptGuide)
  return () => setLocked(false)
 }, [promptGuide])
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
    isOpen={promptGuide}
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    onRequestClose={() => setPromptGuide(false)}>
    <div className='flex justify-between p-4 px-8'>
     <CloseIcon
      onClick={() => setPromptGuide(false)}
      className=' cursor-pointer absolute right-2 top-2'
     />
     <p className='text-4xl text-accent mt-2'>Ink Monkey “FonzAI” AI Design System User Guide: Crafting Decals with Artistic Flair</p>
    </div>
    <div className='flex flex-col p-8 gap-4'>
     <div className='flex flex-col gap-1'>
      <p className='text-2xl font-bold'>Introduction to the Ink Monkey “FonzAI” AI Design System</p>
      <p>
       Welcome to the world of Ink Monkey FonzAI Artificial Intelligence Design System! This innovative tool empowers you to create unique and captivating
       decals using a wide range of art styles. Whether you're decorating your space, personalizing items, or creating for business, Ink Monkey FonzAI is your
       go-to for artistic expression.
      </p>
     </div>
     <div className='flex flex-col gap-1'>
      <p className='text-2xl font-bold'>Getting Started</p>
      <p>
       Before you begin, ensure you're familiar with the Ink Monkey FonzAI Artificial Intelligence Design System interface. Take a moment to explore the various
       features and settings available to you.
      </p>
     </div>
     <div className='flex flex-col gap-1'>
      <p className='text-2xl font-bold'>Mastering Prompts for Decal Creation</p>
      <p>
       The essence of Ink Monkey “FonzAI” Artificial Intelligence Design System lies in its ability to transform your text prompts into visual art. A
       well-crafted prompt is the key to generating the perfect decal.
      </p>
     </div>
     <div className='flex flex-col gap-1'>
      <p className='text-xl'>Tips for Effective Prompting</p>
      <ul className='list-disc list-inside'>
       <li className='mt-2'>
        <span className='font-bold'>Clarity is Key:</span>
        <p className='ml-6'>Clearly describe the decal you envision. The more precise your prompt, the better the outcome.</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Specify Art Styles:</span>
        <p className='ml-6'>Incorporate specific art styles like “Retro,” “Minimalist,” or “Gothic” to define the aesthetic of your decal.</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Add Context and Mood: </span>
        <p className='ml-6'>Use descriptive words to set the tone, such as “whimsical,” “elegant,” or “bold.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Color Choices Matter: </span>
        <p className='ml-6'>Mention if you prefer “vibrant hues,” “earth tones,” or “neon colors” in your design.</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>White Border Thickness: </span>
        <p className='ml-6'>Mention if you prefer “thick,” “medium,” or “thin white stroke around main image” in your design.</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Backgrounds Count: </span>
        <p className='ml-6'>
         Even though the vast majority of your “FonzAI” decal designs will come out with a black background and a white border around your art work, it is still
         a good idea to tell “FonzAI” to use something like “with a pitch black background.” at the end of your descriptive prompt.
        </p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Adding Text: </span>
        <p className='ml-6'>
         You can add custom text to your design using a prompt like this: (Snarling Wolf, Highly Realistic Illustrative Design, Thin White border around image,
         add the text ‘Lone Wolf’ above the image, pitch black background.) Just be sure to use ‘ ‘ before and after your text.
        </p>
       </li>
      </ul>
     </div>
     <div className='flex flex-col gap-1'>
      <p className='text-2xl font-bold'>Prompt Ideas for Various Art Styles</p>
      <p>To kickstart your creativity, here are some prompt ideas tailored for decal creation in different art styles:</p>
      <ul className='list-disc list-inside'>
       <li className='mt-2'>
        <span className='font-bold'>Retro:</span>
        <p className='ml-6'>: “A classic diner scene with neon signs in a Retro style for a car decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Minimalist:</span>
        <p className='ml-6'> “A sleek, minimalist fox design for a laptop decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Gothic:</span>
        <p className='ml-6'>“An intricate Gothic cathedral window pattern for a wall decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Watercolor:</span>
        <p className='ml-6'>“A delicate floral arrangement in a watercolor style for a phone case decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Geometric:</span>
        <p className='ml-6'>“A modern geometric abstract design for a skateboard decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Vintage:</span>
        <p className='ml-6'>“A vintage travel poster style for a suitcase decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Pop Art: </span>
        <p className='ml-6'>“A vibrant pop art portrait for a custom t-shirt decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Graffiti: </span>
        <p className='ml-6'>“A colorful graffiti tag design for an urban-style decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Cartoon:</span>
        <p className='ml-6'>“A cute cartoon animal character for a children’s room decal.”</p>
       </li>
       <li className='mt-2'>
        <span className='font-bold'>Street Art: </span>
        <p className='ml-6'> “A powerful street art mural design for a statement wall decal.”</p>
       </li>
      </ul>
     </div>
     <div className='flex flex-col gap-1'>
      <p className='text-2xl font-bold'>Expanding Your Creativity</p>
      <p>
       As you grow more comfortable with Ink Monkey FonzAI Artificial Intelligence Design System, experiment with blending styles, adding unique elements, or
       creating thematic series. Try prompts like “A steampunk robot in a graffiti style for a laptop decal” or “A serene Japanese garden scene in watercolor
       for a window decal.”
      </p>
     </div>
     <div className='flex flex-col gap-1 '>
      <p className='text-2xl font-bold'>Conclusion</p>
      <p>
       With Ink Monkey FonzAI Artificial Intelligence Design System, your imagination is the only limit. Dive into the world of decal design, mix and match
       styles, and watch as your ideas transform into stunning art. Happy designing!
      </p>
     </div>
    </div>
   </Modal>
  </>
 )
}

export default PromptGuide
