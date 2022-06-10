import React, { useState, useEffect } from 'react'
import { View, Dimensions, FlatList, Animated, Text } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'


const { width, heigth } = Dimensions.get('window')
let flatList

function infiniteScroll(dataList) {
  const numberOfData = dataList.length
  let scrollValue = 0, scrolled = 0

  setInterval(function () {
    scrolled++
    if (scrolled < numberOfData)
      scrollValue = scrollValue + width

    else {
      scrollValue = 0
      scrolled = 0
    }

    this.flatList.scrollToOffset({ animated: true, offset: scrollValue })

  }, 3000)
}

const CarouselCards = (props) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)


  return (
    <View>
      <Carousel
        // layout="stack"
        layoutCardOffset={19}
        ref={isCarousel}
        data={props.data}
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


export default CarouselCards
