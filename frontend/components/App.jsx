import { cn } from './utils'
import { ToastContainer } from 'react-toastify'
import useIsSmall from './hooks/useIsSmall'
import Gallery from './history/Gallery'
import Prompt from './prompt/Prompt'
import Image from './image/Image'
import Form from './form/Form'
import Suggestions from './suggestions/Suggestions'
import Banner from './banner/Banner'
import { useAtomValue } from 'jotai'
import { generatedAtom, isOrderingAtom } from './atoms'
import 'react-toastify/dist/ReactToastify.css'
import SignUp from './signup/signup'

export default function App({ home, sectionId }) {
 const generated = useAtomValue(generatedAtom)
 const isOrdering = useAtomValue(isOrderingAtom)
 console.log(sectionId)
 const isSmall = useIsSmall()

 const isWindow = generated?.shape?.id == 'window'

 return (
  <div className='bg-bg-primary w-full max-w-[1200px] 2xl:max-w-[1400px] m-auto relative'>
   <ToastContainer
    pauseOnHover={false}
    theme='colored'
    hideProgressBar
   />
   {/* <Banner /> */}
   {/* <div className='w-full m-auto h-auto flex bg-bg-primary '>
                <img
                    className='w-full max-w-[900px] m-auto my-4 px-8'
                    src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706647115/Fonzie_Logo_6in_PNG_xuwf99.png'
                    alt='Fonzie AI Generator Logo'
                />
            </div> */}
   <div
    id='appTop'
    className='bg-bg-primary w-full m-auto flex '>
    <div className='w-full gap-4 flex flex-col-reverse lg:flex-row justify-center p-4 pb-2 m-auto'>
     <div className={cn('flex flex-row gap-4 w-full justify-center', isSmall && 'flex-col-reverse')}>
      {isOrdering && !isWindow ? <Form /> : <Prompt />}
      <Image />
     </div>
    </div>
   </div>
   {/* <SignUp /> */}
   <Suggestions />
   <Gallery />
   <p className='w-full text-end text-xs opacity-30'>v.3.02</p>
   <div className='w-full h-[2px] bg-accent'></div>
  </div>
 )
}
