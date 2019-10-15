//开发区配置
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
 
//地图上数据点
var geoCoordMap = {
    '南昌':[115.8673095703125,28.69058765425071],
    '抚州':[116.47705078125,27.196014383173306],
	'赣州':[115.2795,25.8124],
	'吉安':[114.884,26.9659],
	'上饶':[117.8613,28.7292],
	'九江':[115.4224,29.3774],
	'宜春':[115.0159,28.3228],
	'景德镇':[117.334,29.3225],
	'萍乡':[113.9282,27.4823],
	'鹰潭':[117.0813,28.2349],
	'新余':[114.95,27.8174]
}

var jiangxiData = [
    [{name:'南昌'},{name:'抚州',value:90}],
	[{name:'南昌'},{name:'赣州',value:80}],
	[{name:'南昌'},{name:'吉安',value:80}],
	[{name:'南昌'},{name:'上饶',value:80}],
	[{name:'南昌'},{name:'九江',value:80}],
	[{name:'南昌'},{name:'宜春',value:80}],
	[{name:'南昌'},{name:'景德镇',value:80}],
	[{name:'南昌'},{name:'萍乡',value:80}],
	[{name:'南昌'},{name:'鹰潭',value:80}],
	[{name:'南昌'},{name:'新余',value:80}]

];
var convertData = function (data) {
    var res =[];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};


//初始化地图对象 
var mapChart = echarts.init(document.getElementById('main'));

 

echarts.registerMap('jiangxi', jiangxi);

mapChart.clear();
var option = {
    title: {
        text: '江西省地图',
        x: 'right',
        y: 'bottom',
        textStyle: {
            fontWeight: 'bolder',
            fontSize: '35',
            color: 'black',
            top: '%'
        }
    },
    geo: {
        map: 'jiangxi',
        zoom: 1.2,

        show: true,
        itemStyle: {
            normal: {
                areaColor: 'rgba(113,183,238,0.5)',
                borderColor: '#90d2ed',
            },
            emphasis: {
                areaColor: 'rgba(113,183,238,0.2)',
            }
        },
        label: {
            normal: {
                show: false//隐藏名称
            }
        }
    },
    series: [{
        name: '开发区数',
        type: 'scatter',
        coordinateSystem: 'geo',

    }]
};

//添加迁徙线和被攻击点效果
var lineData = [jiangxiData];
lineData.forEach(function(item,i){
    option.series.push({//运动迁徙线
        name: '线条测试',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
        },
        lineStyle: {
            normal: {
                color: '#ffc107',
                width: 1,
                opacity: 0.6,
                curveness: 0.2
            }
        },
        data: convertData(item)
    },{//被攻击点效果
        name: '被攻击点效果',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 4,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        itemStyle: {
            normal: {
                color: '#ffc107'
            }
        },
        markPoint:{
            symbol:'pin',
            data:[
            {name:'南昌开发区数',coord:[115.8233642578125,28.5941685062326],value:9,itemStyle:{color:'#c23531'}},
            {name:'抚州开发区数',coord:[116.47705078125,27.196014383173306],value:11,itemStyle:{color:'#c23531'}},
            {name:'赣州开发区数',coord:[115.2795,25.8124],value:19,itemStyle:{color:'#c23531'}},
            {name:'吉安开发区数',coord:[114.884,26.9659],value:13,itemStyle:{color:'#c23531'}},
            {name:'上饶开发区数',coord:[117.8613,28.7292],value:11,itemStyle:{color:'#c23531'}},
            {name:'九江开发区数',coord:[115.4224,29.3774],value:12,itemStyle:{color:'#c23531'}},
            {name:'宜春开发区数',coord:[115.0159,28.3228],value:13,itemStyle:{color:'#c23531'}},
            {name:'景德镇昌开发区数',coord:[117.334,29.3225],value:3,itemStyle:{color:'#c23531'}},
            {name:'萍乡开发区数',coord:[113.9282,27.4823],value:5,itemStyle:{color:'#c23531'}},
            {name:'鹰潭开发区数',coord:[117.0813,28.2349],value:3,itemStyle:{color:'#c23531'}},
            {name:'新余开发区数',coord:[114.95,27.8174],value:2,itemStyle:{color:'#c23531'}}
            ]
        },
        data: item.map(function (dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
        })
    });

});
mapChart.setOption(option);


mapChart.on('click',function(params,e){
    //阻止浏览器冒泡
    var evt = e || window.event;
    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble=true);
    let name = params.name;
    console.log('params,e', params,e);
    
});
