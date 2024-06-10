'use client'

import Image from 'next/image'
import TempImage from './tempEventImg.png'

export default function Home() {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex justify-center">
        <div className="flex border items-center justify-center w-[400px] h-[400px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[400px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[400px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
        <div className="flex border items-center justify-center w-[100px] h-[100px]">
          스와이프
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex border items-center justify-center w-[400px] h-[300px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[300px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[300px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex border items-center justify-center w-[400px] h-[300px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[300px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex border items-center justify-center w-[400px] h-[300px]">
          <Image
            alt="진행 중인 이벤트"
            src={TempImage}
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  )
}
