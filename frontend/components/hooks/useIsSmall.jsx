import { useWindowSize } from 'usehooks-ts'

function useIsSmall() {
  const { width } = useWindowSize()
  let isSmall = width < 950
  return isSmall
}

export default useIsSmall
