import '../index.html'
import '../styles/components/header.scss'
import '../styles/components/welcome.scss'
import '../styles/components/about.scss'

$(document).ready(function(){
  $('.slider').slick({
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  });
})