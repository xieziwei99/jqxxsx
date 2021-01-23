
$(function () {
    map();
    function map() {
        $.ajax({
            type: 'post',                            // post请求
            url: '/getcitylist',
            dataType: 'json',
            data:[],
            error: function(xhr, err){
                alert('请求失败，请检查，' + err + '!')
            },
            success: function(data) {   // data是javascript的json格式

            var yData = [];
            var barData = [];

            for (var i = 0; i < 10; i++) {
                barData.push(data[i]);
                yData.push(i + data[i].name);
            }

            var option = {
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        return params.name + '：' + params.data['value'] + '元/平米'
                    },
                },
                visualMap: {
                    type: 'continuous',
                    orient: 'horizontal',
                    itemWidth: 10,
                    itemHeight: 80,
                    text: ['高', '低'],
                    showLabel: true,
                    seriesIndex: [0],
                    min: 20000,
                    max: 5000,
                    inRange: {
                        color: ['#6FCF6A', '#FFFD64', '#FF5000']
                    },
                    textStyle: {
                        color: '#7B93A7'
                    },
                    bottom: 100,
                    left: 400,
                },
                grid: {
                    right: 10,
                    top: 135,
                    bottom: 100,
                    width: '20%'
                },
                xAxis: {
                    show: false
                },

                geo: {
                    // roam: true,
                    map: 'china',
                    // left: 'left',
                    // right: '300',
                    layoutSize: '80%',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            areaColor: '#fff464'
                        }
                    }
                },
                series: [{
                    name: 'mapSer',
                    type: 'map',
                    roam: false,
                    geoIndex: 0,
                    label: {
                        show: false,
                    },
                    data: data
                }]
            };
                // // 使用刚指定的配置项和数据显示图表。
                var myChart = echarts.init(document.getElementById('map_1'));
                myChart.setOption(option);
                window.addEventListener("resize",function(){
                    myChart.resize();
                });
            }
        });
    }

})

