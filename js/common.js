  $(window).load(function(){
	  
	  
	  /* default slider */
	  
	  $('.iosSlider').each(function() {
			var slider = $(this).closest('.slider');
			
			var infinite = false;
			if (slider.data('infinite') == true){
				infinite = true;
			}
			
			$(this).iosSlider({
				snapToChildren: true,
				infiniteSlider: infinite,
				desktopClickDrag: true,
				navNextSelector: slider.find('.slider_nav.next'),
			    navPrevSelector: slider.find('.slider_nav.prev'),
			    navSlideSelector: slider.find('.spnav .item'),
				onSlideChange: slideChange,
				onSliderUpdate: sliderResize(slider.find('.iosSlider')),
			    autoSlideTransTimer: 2500,
				scrollbar: true,
				scrollbarHide: false,
				scrollbarDrag: true, 
				scrollbarLocation: 'bottom',
				scrollbarHeight: '6px',
				scrollbarBackground: '#000',
				scrollbarOpacity: '1',
				scrollbarContainer:  slider.find('.scrollbarWrap')
		    });
			
			function slideChange(args) {
				slider.find('.spnav .item').removeClass('active');
				slider.find('.spnav .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('active');
		    }
	   });
	  
	  
	  function sliderResize( $iosSlider ) {
			var max = -1;
			$iosSlider.find('.item').each(function() {
			    var h = $(this).outerHeight(); 
			    max = h > max ? h : max;
			});
			
			$iosSlider.css({
		        height: max
		    });
		    
			$iosSlider.find('.slider_box').css({
			    height: max
			});
		}
	  
	  $(window).resize(function(){
		  $('.iosSlider').each(function() {
			  sliderResize( $(this) );
			  $(this).iosSlider('update');
		  });
	  });	  
	  
	  
	  
	  /* photo slider */
	  
	  $('.main_photo_slider').iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
			infiniteSlider: false,
			onSliderUpdate: photoSliderResize(),
			onSliderLoaded: doubleSlider2Load,
			onSlideChange: doubleSlider2Load
	  });
		
	  $('.sldr_thumb_list .button').each(function(i) {
			$(this).bind('click', function() {
				$('.main_photo_slider').iosSlider('goToSlide', i+1);
			});
	  });
		
	  $('.sldr_thumb_list').iosSlider({
			desktopClickDrag: true,
			snapToChildren: true,
			infiniteSlider: false,
			scrollbar: true,
			scrollbarHide: false,
			scrollbarDrag: true, 
			scrollbarLocation: 'bottom',
			scrollbarHeight: '6px',
			scrollbarBackground: '#000',
			scrollbarOpacity: '1',
			scrollbarContainer:  $('.thumb_box .scrollbarWrap'),
	  });
		
	  function doubleSlider2Load(args) {
			$('.sldr_thumb_list').iosSlider('goToSlide', args.currentSlideNumber);
			
			/* update indicator */
			$('.sldr_thumb_list .button').removeClass('selected');
			$('.sldr_thumb_list .button:eq(' + (args.currentSlideNumber-1) + ')').addClass('selected');
	  }
	  
	  
	  function photoSliderResize() {
		  
		  $iosSlider = $('.main_photo_slider');
		  
			var max = -1;
			$iosSlider.find('li').each(function() {
			    var h = $(this).outerHeight(); 
			    max = h > max ? h : max;
			});
			
			$iosSlider.css({
		        height: max
		    });
		    
			$iosSlider.find('.slider').css({
			    height: max
			});
		}
	  
	  photoSliderResize();
	  
	  $(window).resize(function(){
		  photoSliderResize();
	  });
	  
	  
  });


  $(document).ready(function()
    {
     
/* INCLUDE PLUGINS */
	  
	  $(".fb").fancybox({
	    padding: 0,
	    helpers: {
		    overlay: {
		      locked: false
		    }
		  }
	  });	
	  
	  $('input[type="checkbox"], input[type="radio"], select').styler();
	  
	  if (! /mobile/i.test(navigator.userAgent)) {
		  $("input.phone").mask("+7 (999) 999-99-99");
	  }
	  
	  
/* BASE FUNCTION */
	  
	  
	  $(".open_nav_btn").click(function() {
		  $('.main_nav').fadeToggle();
    	  return false; 
      });
	  
	  $(".srv_filter li").click(function() {
		  $(this).parent().find('li').removeClass('current');
		  $(this).addClass('current');
		  
		  fltr = $(this).data('filter');
		  
		  if (fltr != 'all'){
			  $('.proj_card').each(function() {
				  if (!$(this).hasClass(fltr)){
					  $(this).addClass('hide');
				  }else{
					  $(this).removeClass('hide');
				  }
			  });  
		  }else{
			  $('.proj_card').removeClass('hide');
		  }
		  
		  pcardReDraw();
      });
	  
	  pcardReDraw();
	  
	  function pcardReDraw(){
		  psl = false;
		  pc_cointer = 1;
		  $('.proj_card').removeClass('psl');;
		  $('.proj_card:not(.hide)').each(function(i) {
			  if (psl){
				  $(this).addClass('psl');
			  }
			  
			  pc_cointer++;
			  
			  if (pc_cointer > 3){
				  pc_cointer = 1;
				  if (psl) psl = false;
				  else psl = true;
			  }
		  });
	  }
	  
	  /* tabs */
      
	  $('ul.tabs').delegate('li:not(.current)', 'click', function() {
			$(this).addClass('current').siblings().removeClass('current')
				.parents('div.tabs_box').find('div.box').hide().removeClass('visible').eq($(this).index()).show().addClass('visible');
	  });
	  
  	  $( ".tab_select select" ).change(function() {
  		  $(this).closest('.tabs_box').find(".tabs li").eq( $(this).find('option:selected').index() ).trigger( "click" );
  	  });
  	  
  	  $(".tab_select select option").change();
	  
	  
    });
  
