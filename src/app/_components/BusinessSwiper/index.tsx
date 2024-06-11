import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import { Pagination, Autoplay } from 'swiper/modules'
import TempImg from '../../tempEventImg.png'

function BusinessSwiper() {
  return (
    <div className="w-3/4 h-[150px]">
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 1500 }}
        modules={[Pagination, Autoplay]}
        loop
        className="mySwiper"
      >
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
        <SwiperSlide>
          <Image alt="업소 사진" src={TempImg} width={400} height={400} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
export default BusinessSwiper
