import Image from 'next/image'
import React from 'react'

const TitleHeader = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-3 mt-2'>
        <Image src="/stethoscope.svg" width={38} height={38} alt={"Logo Klinik"} />
        <h1 className='text-[24px] font-semibold'>Klinik Anugerah</h1>
    </div>
  )
}

export default TitleHeader