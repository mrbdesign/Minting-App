import localFont from 'next/font/local'

export const basePixelFont = localFont({
  src: [
    {
      path: '../../public/fonts/BasePixel-HighResolution.otf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-basepixel'
})
