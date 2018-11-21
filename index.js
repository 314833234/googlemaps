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