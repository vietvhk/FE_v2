
$('.slider-section-1').owlCarousel({
    loop:true,
    margin:40,
    nav:true,
    loop:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})
$('.slider-section-2').owlCarousel({
    loop:true,
    margin:40,
    nav:true,
    loop:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:2
        }
    }
})
$(window).scroll(function(){
    var sticky = $('.head-page, .section-head'),
        scroll = $(window).scrollTop();

    if (scroll >= 500) sticky.addClass('scroll-to-top');
    else sticky.removeClass('scroll-to-top');
});
$('.open-menu').on( "click", function() {
    $('#header-mobile').hide();
    $('.menu-mobile').show();
});
$('.close-menu').on( "click", function() {
    $('#header-mobile').show();
    $('.menu-mobile').hide();
});
$('.btn-open-search').on( "click", function() {
    $('.btn-open-search').hide();
    $('.input-search').attr( "style", "display:flex !important;" );
    $('.search-list-user').attr( "style", "display:block !important;" );
    $('.search-list-user .btn-default').attr( "style", "margin-top:10px" );
});
$('#attribute-type').on( "change", function() {
    $('.tab-item').removeClass('show');
    let id=$(this).val()
    $(id).addClass('show');
});
$('.list-user .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
let timeout;

function timeOut() {
  timeout = setTimeout(openModalCookie, 1000);
}

function openModalCookie() {
  $('#cookieModal').modal('show');
}
window.addEventListener("load", (event) => {
    timeOut();
  });
  $(document).ready(function(){
    $("#filter").keyup(function(){
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
        $(".container-archive").each(function(){
        let count_archive=0;
        // Loop through the comment list
        $(this).find(".listing-grid .bg-blue-shadow").each(function(){
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count_archive++;
            }
        });
        if(count_archive<=0){
            $(this).find(".title-archive").hide();
        }
        else{
            $(this).find(".title-archive").show();
            count++;
        }
    });
    if(count<=0){
        $(".not-found").show();
    }
    else{
        $(".not-found").hide();
    }
    });
});