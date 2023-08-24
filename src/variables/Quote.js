import { Box } from '@chakra-ui/react'
import React from 'react'

const Quote = () => {
  return (
    <div>
        <Box
          color={'white'}
          fontSize={'sm'}
          fontFamily={'monospace'}
          position={'fixed'}
          zIndex={1}
          top={5}
          right={-300} 
          p={6}
          justifyContent={'center'}
          alignItems={'center'}
          rounded={'3xl'}
          bgGradient="linear(to-br, rgba(148, 20, 78, 0.6), rgba(0, 0, 255, 0.5))"
          transition="right 0.5s ease-out"
          onMouseEnter={(e) => { e.currentTarget.style.right = '5px' }} 
          onMouseLeave={(e) => { e.currentTarget.style.right = '-300px' }}
        >
          Learn from a glass of liquor, <br />
          The sweet and bitter are still enjoyed!. <br />
          Likewise with life, bright or even gloomy, keep living it.
        </Box>
        <Box
          color={'white'}
          fontSize={'sm'}
          fontFamily={'monospace'}
          position={'fixed'}
          zIndex={1}
          top={24}
          mt={'11'}
          right={-300}
          p={6}
          justifyContent={'center'}
          alignItems={'center'}
          rounded={'3xl'}
          bgGradient="linear(to-br, rgba(66, 225, 78, 0.9), rgba(0, 0, 255, 0.5))"
          transition="right 0.5s ease-out" 
          onMouseEnter={(e) => { e.currentTarget.style.right = '5px' }} 
          onMouseLeave={(e) => { e.currentTarget.style.right = '-300px' }} 
        >
          Alcohol is perhaps man's worst enemy. <br />
          But the Bible says, love your enemies. <br />
          so do not let the brain sober, Cheers🍻....
        </Box>
    </div>
  )
}

export default Quote