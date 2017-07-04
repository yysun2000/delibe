var delibe = (function(){
  var lists = {
    focuson : [],
    banner : [],
    feed : [],
    gallery : []
  } // private

  var setting = [
      {
        DataURL : "./admin/json/banner.json",
        templateSelector : '#bannerTemplate',
        stateProcessor : function(data){
          delibe.state.Banner.setList(data);
        },
        targetSelector : "#banner"
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
        targetSelector : "#feed"
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
