function jsonLoaded(response){
    $("#date").append(
      response.results.collection2[0].date + 'の当番医です。'
    );

    var len = response.results.collection1.length;
    var WindowHeight = $(window).height();
    var k = 0;
    var cat = [];
    var cat_check = '*****';

    for (var i = 0; i < len; i++) {
      // \nは  「スペース,改行」ではなく。なぜか「文字コード160と改行」
      cat[i] = response.results.collection1[i].category.replace(" \n" , "" ) ;
      if (cat_check != cat[i]) {
        cat_check = cat[i];
        k++;
      };
    };
    var accordion_height = WindowHeight / k;
    if(k > 5){
        if (accordion_height < 100) {
            accordion_height = 100;
        };
    };
    cat_check = '*****';

    var accordion_element = $("#accordion");
    var accordion_text = '';
    var list_text = '';
    var j = 1;
    for (var i = 0; i < len; i++) {
        var collection = response.results.collection1[i]
        var category = cat[i];
        if (cat_check != category) {

            if (list_text.length > 0) {
              accordion_text += createInsertElement(accordion_height, cat_check, j, list_text);
              list_text = '';
              if(j==1)j=0;
              else if(j!=1)j=1;
            }

            cat_check = category;
        };
        list_text += '<ul><li class="name">' + collection.name + "</li>" + '<li class="category">' + collection.category + "</li>" + '<li class="time">' + collection.time + "</li>" + ' <a href="tel:' + collection.tel + '"><li class="tel">' + '<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> ' + collection.tel + "</li></a>" + '<a href="http://maps.google.co.jp/maps?hl=ja&ie=UTF8&q=' + collection.address + '"><li class="address"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>' + collection.address + "</li></a> " + '</ul>';
    };

    if (list_text) {
      accordion_text += createInsertElement(accordion_height, cat[len-1], j, list_text);
    }

    accordion_element.append(accordion_text);

    $(".panel").on("shown.bs.collapse", function() {
        scrollToElement(this)
    })

}
function createInsertElement(accordion_height, category, category_index, list_text) {
  var insertElement = '<div class="panel panel-default">' +
    '<a data-toggle="collapse" data-parent="#accordion" href="#' + category + '">' +'<div class="panel-heading c' + category_index + '"style="height:' + accordion_height + 'px" >' + '<h4 class="panel-title">' +
    category + '</h4></div></a>' +
    '<div id="' + category + '" class="panel-collapse collapse"><div class="panel-body"><div>' + list_text + '</div><div class="check">必ず電話で医療機関に確認のうえ受診して下さい。</div></div></div></div>';

  return insertElement;
}

$.ajax({
  url:"https://www.kimonolabs.com/api/99zbfmcw?apikey=e0cab1ea62558e9f07e4d1109a9eaf59&kimmodify=1",
  crossDomain: true,
  dataType: "json",
  success: function (response) {
    jsonLoaded(response)
  },
  error: function (xhr, status) {
    alert(status)
//    local test
    var json={"name":"holiday_doctor","count":8,"frequency":"Daily","version":6,"newdata":true,"lastrunstatus":"success","thisversionstatus":"success","nextrun":"Thu Nov 12 2015 07:50:52 GMT+0000 (UTC)","thisversionrun":"Wed Nov 11 2015 07:50:51 GMT+0000 (UTC)","results":{"collection1":[{"name":"斉藤小児科医院","address":"白山市馬場二丁目16番地","tel":"076-275-3110","category":"小児科","time":"9:00～12:00","index":4,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?a=3"},{"name":"医療法人社団大倉外科医院","address":"野々市市本町3丁目7-12","tel":"076-248-3263","category":"外科","time":"9:00～12:00","index":1,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?a=3"},{"name":"医療法人社団　長尾医院","address":"白山市美川永代町ソ248","tel":"076-278-2156","category":"内科 \n外科","time":"9:00～12:00","index":6,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?p=2&a=3"},{"name":"織田内科クリニック","address":"白山市鶴来本町3丁目ヲ11","tel":"076-273-9100","category":"内科","time":"9:00～12:00","index":2,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?a=3"},{"name":"喜多内科医院","address":"野々市市横宮町7-20","tel":"076-248-0020","category":"内科","time":"9:00～12:00","index":3,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?a=3"},{"name":"てらしま内科クリニック","address":"白山市中奥町91-3","tel":"076-274-8666","category":"内科","time":"9:00～12:00","index":5,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?a=3"}],"collection2":[{"date":"11月15日 （日）","index":7,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?a=3"},{"date":"11月15日 （日）","index":8,"url":"http://i-search.pref.ishikawa.jp/toban/index.php?p=2&a=3"}]}}
    jsonLoaded(json)

  }
});


