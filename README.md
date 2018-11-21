# google maps 使用

### 一、引入依赖Javascript文件
给大家介绍两种引入js文件的方式
##### 第一种，简单暴力的方式，通过script标签引入。如下代码
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Google Map</title>
  <!-- 用script标签引入 -->
  <script src="//maps.googleapis.com/maps/api/js?key=you_api_key&libraries=places&language=en&callback=initMap"></script>
</head>
<body>

</body>
</html>
```
##### 第二种，创建script标签，按需引入（推荐）
```
/**
 * 插入google map 文件
 */
function insertMap () {
  var googleMap = document.getElementById('google-map-script');
  if(!googleMap){
    var myScript= document.createElement('script');
    myScript.type = 'text/javascript';
    myScript.src= '//maps.googleapis.com/maps/api/js?key=you_api_key&libraries=places&language=en&callback=initMap';
    myScript.defer = true;
    myScript.async = true;
    myScript.id = 'google-map-script';
    document.body.appendChild(myScript);
  }
}

insertMap();
```
> javascript文件url参数详解
+ key: key
+ libraries:
+ language: 地图显示的语言
+ callback: Javascript文件加载完成后的回调函数方法名

> you_api_key如果不知道的朋友可以点击查看：https://developers.google.com/maps/documentation/javascript/get-api-key

### 二、确保JS文件加载后再执行你的代码
*在引入js url中有一个callback的参数，这个所带的名称就是js文件加载完成后的回调方法*
```
//url: maps.googleapis.com/maps/api/js?key=you_api_key&libraries=places&language=en&callback=initMap

/**
 * js加载完成后的回调函数方法，方法名称与url中callback的值对应
 */
function initMap (){
  console.log('加载完成');
}
```

### 三、初始化地图
一切准备就绪，接下来我们创建google map应用，直接上代码
##### HTML 部分
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Google Map</title>
  <!-- 用script标签引入 -->
  <script src="//maps.googleapis.com/maps/api/js?key=you_api_key&libraries=places&language=en&callback=initMap"></script>
  
  <style>
    #map-google {
      width: 800px;
      height: 500px;
    }
  </style>
</head>
<body>
  <!-- 初始化地图应用的容器 -->
  <div id="map-google"></div>
</body>
</html>
```

##### Javascript部分
```
/**
 * js加载完成后的回调函数方法
 */
function initMap() {
  // 创建google map
  new google.maps.Map(document.getElementById('map-google'), {
    center: {lng: 9.3004587, lat: 56.2128591},  // 地图初始化中心点
    zoom: 4,    // 分辩率缩放级别
    mapTypeControl: false,
    streetViewControl: false, // 是否开启街景功能
    fullscreenControl: false, // 是否开启全屏功能
    scaleControl: true
    //styles: googleMapStyle,   // 自定义google map样式
    //scrollwheel: false    // 滚轮是否控制地图滚动，默认是false:不启用
  });
}
```
*以上google map options参数例举了常用的几个，如果有其它需求可以查看：https://developers.google.com/maps/documentation/javascript/tutorial*

##### zoom：大致缩放细节
+ 1：世界
+ 5：陆地/大陆
+ 10：城市
+ 15：街道
+ 20：建筑物


### 四、创建自定义按钮
```
/**
 * 为地图添加自定义按钮方法
 * @param map       地图对象
 * @param marker    标注对象
 */
function addYourCustomBtn(map, marker) {
  var oControlDiv = document.createElement('div');  // 自定义按钮容器
  var oBtn = document.createElement('button');  // button元素
  var oIcon = document.createElement('i');  // 按钮icon
  
  // oBtn对象样式
  oBtn.style.width = '40px';
  oBtn.style.height = '40px';
  oBtn.style.border = 'none';
  oBtn.style.outline = 'none';
  oBtn.style.borderRadius = '2px';
  
  // oIcon对象样式
  oIcon.style.display = 'block';
  oIcon.style.margin = 'auto';
  oIcon.style.width = '18px';
  oIcon.style.height = '18px';
  oIcon.style.backgroundImage = 'url(//maps.gstatic.com/tactile/mylocation/mylocation-sprite-cookieless-v2-2x.png)';
  oIcon.style.backgroundSize = '180px 18px';
  oIcon.style.backgroundPosition = '0px 0px';
  oIcon.style.backgroundRepeat = 'no-repeat';
  
  oBtn.appendChild(oIcon);
  oControlDiv.appendChild(oBtn);
  
  // 将按钮添加到地图（核心部分）
  map.setZoom(tmobileOptions.storeData.zoom || 11);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(oControlDiv);
  
  // 给按钮添加点击事件
  oBtn.addEventListener('click', function() {
      // 点击自定义按钮
      // your code
  })
}
```
*以上是创建自定义按钮的方法，主要分为三个步骤，以下对此过程进行详细分解*
1. 创建自定义按钮容器
2. 创建按钮对象
3. 将容器添加至地图中

### 五、创建或设置标注（Marker）
##### 创建标记
```
function createMarker(map) {
  new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,  // 标记出场动画，此方法是从顶部掉落
    position: { // 标记所在的位置
      lng: 2.3120407,
      lat: 48.8588536
    }
  })
}
```
*创建标记对象方法是 ==new google.maps.Marker(options)==, 以上代码中只有写了几个属性，更多options请自行查看[google api](https://developers.google.com/maps/documentation/javascript/markers)*

##### 创建自动义标记
```
function createMarker(map) {
  new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,  // 标记出场动画，此方法是从顶部掉落
    position: { // 标记所在的位置
      lng: 2.3120407,
      lat: 48.8588536
    },
    icon: { // 标记的图标
      scaledSize: new google.maps.Size(32,32),
      url: 'https://image01.oneplus.net/shop/201810/24/1758/aaee094c06bae019dd4b05fcba2dbab2.svg'
    }
  })
}
```
*大家可以发现此方法就是上面创建标记的方法，不同之处是有一个icon参数，这个里面就是定义自己的图标，可以是svg或者jpg*

##### 设置标记
```
/**
 * 设置标记
 * @param markers   标记数组
 * @param map       
 */
function setMapMarkers(markers, map){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// 清空标记
setMapMarkers(markers, null);

// 设置标记
var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
var mapOptions = {
  zoom: 4,
  center: myLatlng
};
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
setMapMarkers(markers, map);
```

##### 设置标记动画
```
/**
 * 设置标记动画
 * @param markers
 * @param index
 */
function toggleBounce(markers, index) {
  markers.forEach(function(marker, i){
    if(index === i && marker.getAnimation() === null){
      marker.setAnimation(google.maps.Animation.BOUNCE);    // 此参数动画为从顶部降落
    else{
      marker.setAnimation(null);
    }
  })
}
```

### 六、初始化消息窗口（InfoWindow）
*有些项目有这样的需求，比如点击标记时会展示标记处的详细信息，接下来为大家讲解如何处理些需求，代码如下*
##### HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Google Map</title>
  <!-- 用script标签引入 -->
  <script src="//maps.googleapis.com/maps/api/js?key=you_api_key&libraries=places&language=en&callback=initMap"></script>
</head>
<body>
  <div id="map"></div>
  
  <div id="infowindow-content">
    <h3>Title</h3>
    <p>内容内容内容内容内容内容内容内容</p>
  </div>
</body>
</html>
```

#### Javascript
```
new google.maps.InfoWindow({
  content: document.getElementById('infowindow-content'),
  maxWidth: 280
})
```
*在你的项目中加入此段代码，点击标记时会弹出消息框，当然，内容和样式及结构你都可以自己定义，弹框的内容也可用JS自行拼接，如下*
```
var sHTML = `<div>
                <h3>Title</h3>
                <p>内容内容内容内容内容内容内容内容</p>
            </div>`
new google.maps.InfoWindow({
  content: sHTML,
  maxWidth: 280
})
```
*效果图如下：*
![image](https://note.youdao.com/yws/api/personal/file/WEB90ae0254d67955665e2fcded48d3528a?method=download&shareKey=8ec0b1ce79680a7112e8806e540170c7)

### 七、初始化Google Map搜索框
*本节只列举一种方法来实现google map 搜索，大致的思想如下*
+ 创建一个input输入框，利用定位将输入框位定在你想要的位置
+ 输入框输入内容时调用google map 的搜索服务
+ 搜索完成点击结果列表获取到当前位置的信息，如：经纬度、地址等
+ 使用google map 得到的经纬度向后端服务请求数据

*注：本文中用的方法是前端利用google map拿到经纬度，然后使用[geohash-js](https://github.com/davetroy/geohash-js)将经度和纬度转为一个编码，然后拿编码以及一个精度值给后端，后端服务将数据查询出来并返回给前端。geohash本文就不详解，请自行了解。细心的同学会注意到，数据排序怎么处理呢？*

以下为大家讲解查询到的数据排序问题：
1. 服务端查询到数据
2. 将前端传过来的code转换成经纬度
3. 查询来的数据的经纬度与转换的经纬度进行计算（方法请看后面文章）

### 八、使用geohash算法来算出两点之前的距离
```
// 方法定义 lat,lng 
function GetDistance( lat1,  lng1,  lat2,  lng2){
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
// 调用 return的距离单位为km
GetDistance(10.0,113.0,12.0,114.0)
```

### 九、自动定位功能
*在地图中，有些业务需求需要支持当前定位的功能，此功能非常简单，主要用到navigator对象上的geolocation，这时如果浏览器支持，会提示用户是否允许访问定位。*
```
// 核心代码
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        console.log('lat', lat, 'lng', lng);
    });
}
else{
    console.log('不支持');
}
```

### 完整代码如下
*下载链接：https://github.com/314833234/googlemaps*

##### HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>google map</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }

    .map-warp {
      position: relative;
    }

    #map {
      width: 100vw;
      height: 100vh;
    }

    .map-search {
      position: absolute;
      left: 50px;
      top: 50px;
    }

    .map-input {
      display: none;
      padding: 0 45px 0 5px;
      width: 350px;
      height: 40px;
      border: 1px solid #999;
      border-radius: 3px;
      outline: none;
      font-size: 14px;
      box-sizing: border-box;
    }

    .map-infowindow-title {
      line-height: 32px;
    }

    .close {
      height: 40px;
      line-height: 36px;
      width: 40px;
      color: #666;
      text-align: center;
      font-size: 28px;
      font-style: inherit;
      cursor: pointer;
    }

    .close::before {
      content: "\00D7";
    }

    .close {
      top: 0;
      right: 0;
      position: absolute;
    }
  </style>
</head>
<body>
  <div class="map-warp">
    <div id="map"></div>
    <div class="map-search">
      <input class="map-input" type="text" placeholder="地址、城市、邮编">
      <i class="close"></i>
    </div>
  </div>

  <div class="map-infowindow">
    <h3 class="map-infowindow-title">详细信息</h3>
    <p>
      <span class="map-infowindow-province"></span>
      <span class="map-infowindow-city"></span>
    </p>
  </div>

  <script src="index.js"></script>
</body>
</html>
```

##### JS部分
```
window.addEventListener('load', function(){
  var googlemapUrl = 'https://maps.googleapis.com/maps/api/js?key=you_api_key&libraries=places&language=en&callback=initMap';
  var currIconUrl = 'https://image01.oneplus.net/shop/201810/31/1913/1719888e143a5ba9c3868a0103752352.svg';
  var storeIconUrl = 'https://image01.oneplus.net/shop/201810/24/1758/aaee094c06bae019dd4b05fcba2dbab2.svg';
  var infowindowProv = document.querySelector('.map-infowindow-province');
  var infowindowCity = document.querySelector('.map-infowindow-city');
  var oSearchInput = document.querySelector('.map-input');
  var oClearSearch = document.querySelector('.map-search .close');
  var country = 'cn'; // 国家
  var mapObj = null;      // google map对象
  var markerObj = null;   // google marker对象
  var mapGeocoderObj = null;  // google geocoder对象
  var infowindowObj = null;
  var initMapCenter = {lng: 116.2573782, lat: 39.9387995};  // 初始化地图中心位置
  var zoom = 11;      // 地图缩放值
  var currIcon = {};  // 当前位置的图标设置
  var storeIcon = {}; // 其它数据的图标设置
  var mapMarkers = [];
  var mapData = [
    {
      "province": "广东省",
      "city": "广州市",
      "url": null,
      "longitude": "113.23",
      "latitude": "23.16"
    },
    {
      "province": "广东省",
      "city": "深圳市",
      "url": null,
      "longitude": "114.07",
      "latitude": "22.62"
    },
    {
      "province": "广东省",
      "city": "东莞市",
      "url": null,
      "longitude": "113.75",
      "latitude": "23.04"
    },
    {
      "province": "广东省",
      "city": "珠海市",
      "url": null,
      "longitude": "113.52",
      "latitude": "22.3"
    }
  ];

  // [1] 插入google server
  insertMap();

  // [2] 当google js 加载完成后调用initMap函数
  window.initMap = initMap;


  oClearSearch.addEventListener('click', function(){
    oSearchInput.value = '';
    setMarkers(null);
  });

  /**
   * 插入google map 文件
   */
  function insertMap() {
    var googleMap = document.getElementById('google-map-script');
    if(!googleMap){
      var myScript= document.createElement('script');
      myScript.type = 'text/javascript';
      myScript.src= googlemapUrl;
      myScript.defer = true;
      myScript.async = true;
      myScript.id = 'google-map-script';
      document.body.appendChild(myScript);
    }
  }

  /**
   * 初始化地图
   */
  function initMap() {
    currIcon = {
      scaledSize: new google.maps.Size(20,20),
      url: currIconUrl
    };
    storeIcon = {
      scaledSize: new google.maps.Size(32,32),
      url: storeIconUrl
    };

    // google map对象
    mapObj = new google.maps.Map(document.querySelector('#map'), {
      center: initMapCenter || {lng: 116.2573782, lat: 39.9387995},
      zoom: 4,
      mapTypeControl: false,
      streetViewControl: false, // 是否开启街景功能
      fullscreenControl: false, // 是否开启全屏功能
      scaleControl: true
    });

    // 初始化infowindow对象
    infowindowObj = new google.maps.InfoWindow({
      content: document.querySelector('.map-infowindow'),
      maxWidth: 280
    });

    // google marker对象
    markerObj = new google.maps.Marker({
      map: mapObj,
      animation: google.maps.Animation.DROP,
      position: initMapCenter,
      icon: storeIcon
    });

    // 添加实时定位按钮
    addLocationBtn(mapObj, markerObj);

    // google geocoder对象
    mapGeocoderObj = new google.maps.Geocoder();

    // 初始化搜索功能
    initAutocomplete();
  }

  /**
   * 实现当前住置
   * @param map
   * @param marker
   */
  function addLocationBtn(map, marker) {
    var that = this;
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '40px';
    firstChild.style.height = '40px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = 'auto';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(//maps.gstatic.com/tactile/mylocation/mylocation-sprite-cookieless-v2-2x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'dragend', function() {
      document.querySelector('#you_location_img').style.backgroundPosition = '0px 0px';
    });

    // 点击时实定位按钮，执行定位功能
    firstChild.addEventListener('click', function() {
      var imgX = '0';
      var oLocationImg = document.querySelector('#you_location_img');
      var animationInterval = setInterval(function(){
        if(imgX == '-18') {
          imgX = '0';
        }
        else {
          imgX = '-18';
        }
        oLocationImg.style.backgroundPosition = imgX+'px 0px'
      }, 500);
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          marker.setPosition(latlng);
          marker.setIcon(that.currIcon);
          map.setZoom(zoom || 11);
          map.setCenter(latlng);
          clearInterval(animationInterval);
          oLocationImg.style.backgroundPosition = '-144px 0px';
        });
      }
      else{
        console.log('不支持时实定位功能');
        clearInterval(animationInterval);
        oLocationImg.style.backgroundPosition = '0px 0px';
      }
    });

    controlDiv.index = 1;
    marker.setIcon(currIcon);
    map.setZoom(zoom || 11);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }

  /**
   * 初始化google map search功能
   */
  function initAutocomplete(){
    // 地图加载时显示输入框
    oSearchInput.style.display = 'block';

    // 创建autocomplete对象
    var autocomplete = new google.maps.places.Autocomplete(oSearchInput, {
      types: ['geocode'],
      componentRestrictions: {country: country || 'cn'}
    });

    // autocomplete对象 监听地址改变事件
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();

      infowindowObj.close();
      if (!place.place_id) return;

      mapGeocoderObj.geocode({'placeId': place.place_id}, function (results, status) {
        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }

        // 设置地图中心点和放大级别
        mapObj.setZoom(zoom || 11);
        mapObj.setCenter(results[0].geometry.location);

        // 设置当前位置icon
        var lat = results[0].geometry.location.lat(),
          lng = results[0].geometry.location.lng(),
          latlng = new google.maps.LatLng(lat, lng);

        markerObj.setPosition(latlng);
        markerObj.setIcon(currIcon);

        // 你的业务逻辑
        initMarkers();
      });
    });
  }

  /**
   * 初始化标注
   */
  function initMarkers() {
    mapMarkers = [];
    mapData.forEach(function(item, index){
      var mapLatlng = {
        lat: Number(item.latitude),
        lng: Number(item.longitude)
      };

      mapMarkers[index] = new google.maps.Marker({
        map: mapObj,
        position: mapLatlng,
        icon: storeIcon
      });

      // 标具点击事件
      mapMarkers[index].addListener('click', function() {
        infowindowProv.innerHTML = item.province;
        infowindowCity.innerHTML = item.city;
        infowindowObj.open(mapObj, mapMarkers[index]);
      });
    })
  }

  /**
   * 设置标注
   * @param map
   */
  function setMarkers(map){
    for (var i = 0; i < mapMarkers.length; i++) {
      mapMarkers[i].setMap(map);
    }
  }
});
```

##### 效果图
![image](https://note.youdao.com/yws/api/personal/file/WEB8878e341982d25918fb48102a1f80b02?method=download&shareKey=8fd6e0be8e5f01cc25718be6028ab3b0)

*google maps功能远远不止这些，本文中只例举了常用的功能部分，如果需要用到其它功能请自行查看google api，也可以与本人交流相互学习。*
