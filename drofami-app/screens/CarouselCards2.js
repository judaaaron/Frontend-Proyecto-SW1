import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'



const CarouselCards2 = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const data = [
    {
      title: "Aciclovirax",
      body: "Infecciones Herpéticas de todo tipo: Herpes simple 1 y 2, Herpes Zoster, Varicela.",
      imgUrl:
        "https://www.ancalmo.com/wp-content/uploads/2017/04/Aciclo-120ml.jpg",
    },
    {
      title: "Aciclovirax 200 mg",
      body: "Infecciones herpéticas de todo tipo: Herpes simple 1 y 2, Herpes Zoster y Varicela",
      imgUrl:
        "https://www.ancalmo.com/wp-content/uploads/2020/08/Aciclovirax-200mg-2020.png",
    },
    {
      title: "Aciclovirax 400mg",
      body: "Infecciones herpéticas de todo tipo: Herpes simple 1 y 2 y Herpes Zoster",
      imgUrl:
        "https://www.ancalmo.com/wp-content/uploads/2020/08/Aciclovirax-400mg-2020-2.png",
    },
  ];

  return (
    <View>
      <Carousel
        // layout="stack"
        layoutCardOffset={19}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        autoplay={true}
        loop={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 1,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        autoplay={true}
        loop={true}
      />
    </View>

  )
}

export default CarouselCards2