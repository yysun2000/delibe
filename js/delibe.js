var delibe = (function(){
  var lists = {
    topmenu : [],
    focuson : [],
    banner : [],
    feed : [],
    gallery : []
  } // private


  var setting = [
      {
        DataURL : "./admin/json/topmenu.json",
        templateSelector : '#TopMenuTemplate',
        stateProcessor : function(data){
          delibe.state.TopMenu.setList(data);
        },
        targetSelector : "#topmenu",
        afterEvent : function(){
          $('nav li').click(function(){
            $('nav li').each(function(){
              $(this).children().css("background-color","");
            })
            $('.submenu').show();
          })
          $('.brand').mouseover(function(){
            $('nav li').each(function(){
              $(this).children().css("background-color","white");
            })
            $('.submenu').hide();

          })
          $('section').mouseover(function(){
            $('nav li').each(function(){
              $(this).children().css("background-color","white");
            })
            $('.submenu').hide();
          })
        }
      },
      {
        DataURL : "./admin/json/banner.json",
        templateSelector : '#bannerTemplate',
        stateProcessor : function(data){
          delibe.state.Banner.setList(data);
        },
        targetSelector : "#banner",
        afterEvent : function(){
          var inner = $("#banner .inner");
          var left = $("#banner .left");
          var right = $("#banner .right");
          var bannerLength = inner.children().length;
          var innerWidth = 995 * bannerLength;
          var idx = 0;

          var str = inner.html();
          str.replace('&nbsp;', '');
          str.replace('\r\n', '');
          inner.html(str);

          inner.css("width",innerWidth);
          inner.css({ "left": "50%","margin-left": -(955/2)});
          $(window).resize(function(){
              inner.css({ "left": "50%","margin-left": -(955/2)});
          })
          right.click(function(){
          //  if(inner.css("margin-left").replace("px","")*1 > -(innerWidth-955)){
          if(inner.css("margin-left").replace("px","")*1 > -(innerWidth-955)){
              inner.animate({ "margin-left": "-=955px" }, "slow" );
              idx++;
            }else{
              inner.animate({ "left": "50%","margin-left": -(955/2)}, "slow");
              idx = 0;
            }
            console.log(idx);
          })
          left.click(function(){
          //  if(inner.css("margin-left").replace("px","")*1 < -600){
          if(inner.css("margin-left").replace("px","")*1 < -600){
              inner.animate({ "margin-left": "+=955px" }, "slow" );
              idx--;
            }else{
              inner.animate({ "left": "50%","margin-left": -(innerWidth-955+477)}, "slow");
              idx = bannerLength -1;
            }
            console.log(idx);
          })
        }
      },
      {
          DataURL : "./admin/json/focuson.json",
          templateSelector : "#focusonTemplate",
          stateProcessor : function(data){
            delibe.state.FocusOn.setList(data);
          },
          targetSelector : "#focus-on"
      },
      {
        DataURL : "./admin/json/feed.json",
        templateSelector : "#feedTemplate",
        stateProcessor : function(data){
          delibe.state.Feed.setList(data);
        },
        targetSelector : "#feed",
        afterEvent : function(){
          $('#media').carousel({
            pause: false,
            interval: false,
            dots: false,
            arrows: false,
            prevArrow: false,
            nextArrow: false
          });
          $(".carousel-cut > img").each(function(){
            var w = $(this).width();
            var h = $(this).height();
            $(this).parent().width(w);
            $(this).parent().height(h);
          })
        }
      },
      {
        DataURL : "./admin/json/gallery.json",
        templateSelector : "#galleryTemplate",
        stateProcessor : function(data){
          delibe.state.Gallery.setList(data);
        },
        targetSelector : "#gallery"
      },
      {
        templateSelector : "#shoplistTemplate",
        targetSelector : "#shoplist"
      }
    ];


  return {

    state : {


      TopMenu : {
        setList : function(_list){
          lists.gallery = _list
        },
        getList : function(){
          return lists.gallery;
        }
      },

      Banner : {
        setList : function(_list){
          lists.banner = _list
        },
        getList : function(){
          return lists.banner;
        }
      },


      FocusOn : {
        setList : function(_list){
          lists.focuson = _list
        },
        getList : function(){
          return lists.focuson;
        }
      },

      Feed : {
        setList : function(_list){
          lists.feed = _list
        },
        getList : function(){
          return lists.feed;
        }
      },

      Gallery : {
        setList : function(_list){
          lists.gallery = _list
        },
        getList : function(){
          return lists.gallery;
        }
      }


    },

    render : {

      json : function(param){

        /*
        DataURL : "url",
        templateSelector : "#template",
        stateProcessor : function(data){

        },
        targetSelector : "#output"
        */
        if(param.DataURL){

          $.ajax({
                type:"GET",
                url:param.DataURL,
                dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
                success : function(data) {
                      var templateHtml = $(param.templateSelector).html();
                      param.stateProcessor(data);
                      $(param.targetSelector).append(_.template( templateHtml )());
                      if(param.afterEvent)
                      try{
                        param.afterEvent();
                      }catch(e){
                        console.log(e);
                      }
                },
                complete : function(data) {
                      // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
                      // TODO
                },
                error : function(xhr, status, error) {
                      alert("에러발생"+status);
                }
          });
        }else{
          var templateHtml = $(param.templateSelector).html();
          $(param.targetSelector).append(_.template( templateHtml )());
        }
      },
      start : function(){
        for(var i=0;i<setting.length;i++){
          delibe.render.json(setting[i])
        }
      }

    }


  }

})()
