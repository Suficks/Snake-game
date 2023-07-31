import $ from 'jquery'
import 'slick-slider'

$('.slider').slick({
  dots: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  varibleWidth: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }

    }
  ]
});
