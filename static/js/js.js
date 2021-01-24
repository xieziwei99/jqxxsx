$(function () {
    echarts_1();
    // echarts_2();
    echarts_4();
    // echarts_31();
    // echarts_32();
    // echarts_33();
    echarts_5();
    echarts_6();

    // AJAX
    function echarts_1() {
        // AJAX加载数据:异步的JavaScript and xml
        xData = []
        yData = []
        $.ajax({
            type: 'post', //post请求
            url: '/getprovincialcapitalavghousearea',
            dataType: 'json',
            data: {},
            error: function (xhr, err) {
                alert('请求失败，请检查，' + err + '!')
            },
            success: function (data) { //data是javascript的json格式
                // alert(JSON.stringify(data))
                for (i = 0; i < data.length; i++) {
                    xData[i] = data[i].province + data[i].cityname
                    yData[i] = data[i].avghousearea
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echart1'));

                option = {
                    // title: {
                    //     text: '元/平方米',//主标题
                    //     left: 'left' ,
                    //     textStyle:{//标题内容的样式
                    //         color:'#FFFFFF',//主标题颜色
                    //         fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
                    //         fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
                    //         fontFamily:"san-serif",//主题文字字体，默认微软雅黑
                    //         fontSize:18//主题文字字体大小，默认为18px
                    //     },
                    // },

                    //  backgroundColor: '#00265f',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '2%',
                        top: '20%',
                        right: '5%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        name: '城市',
                        nameTextStyle: {
                            color: "#ffffff"
                        },
                        data: xData,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.1)",
                                width: 1,
                                type: "solid"
                            },
                        },

                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            interval: 0,
                            // rotate:50,
                            show: true,
                            splitNumber: 15,
                            textStyle: {
                                color: "#ffffff",
                                fontSize: '12',
                            },
                            rotate: 90,
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '平方米',
                        nameTextStyle: {
                            color: "#ffffff"
                        },
                        axisLabel: {
                            //formatter: '{value} %'
                            show: true,
                            textStyle: {
                                color: "#ffffff",
                                fontSize: '12',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.1	)",
                                width: 1,
                                type: "solid"
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)",
                            }
                        }
                    }],
                    series: [
                        {
                            name:'平方米',
                            type: 'bar',
                            data: yData,
                            barWidth: '35%', //柱子宽度
                            // barGap: 1, //柱子之间间距
                            itemStyle: {
                                normal: {
                                    color: '#2f89cf',
                                    opacity: 1,
                                    barBorderRadius: 5,
                                }
                            }
                        }

                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            }
        })
    }

    // function echarts_2() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('echart2'));
    //
    //     option = {
    //         //  backgroundColor: '#00265f',
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {type: 'shadow'}
    //         },
    //         grid: {
    //             left: '0%',
    //             top: '10px',
    //             right: '0%',
    //             bottom: '4%',
    //             containLabel: true
    //         },
    //         xAxis: [{
    //             type: 'category',
    //             data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽'],
    //             axisLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     color: "rgba(255,255,255,.1)",
    //                     width: 1,
    //                     type: "solid"
    //                 },
    //             },
    //
    //             axisTick: {
    //                 show: false,
    //             },
    //             axisLabel: {
    //                 interval: 0,
    //                 // rotate:50,
    //                 show: true,
    //                 splitNumber: 15,
    //                 textStyle: {
    //                     color: "rgba(255,255,255,.6)",
    //                     fontSize: '12',
    //                 },
    //             },
    //         }],
    //         yAxis: [{
    //             type: 'value',
    //             axisLabel: {
    //                 //formatter: '{value} %'
    //                 show: true,
    //                 textStyle: {
    //                     color: "rgba(255,255,255,.6)",
    //                     fontSize: '12',
    //                 },
    //             },
    //             axisTick: {
    //                 show: false,
    //             },
    //             axisLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     color: "rgba(255,255,255,.1	)",
    //                     width: 1,
    //                     type: "solid"
    //                 },
    //             },
    //             splitLine: {
    //                 lineStyle: {
    //                     color: "rgba(255,255,255,.1)",
    //                 }
    //             }
    //         }],
    //         series: [
    //             {
    //
    //                 type: 'bar',
    //                 data: [1500, 1200, 600, 200, 300, 300, 900],
    //                 barWidth: '35%', //柱子宽度
    //                 // barGap: 1, //柱子之间间距
    //                 itemStyle: {
    //                     normal: {
    //                         color: '#27d08a',
    //                         opacity: 1,
    //                         barBorderRadius: 5,
    //                     }
    //                 }
    //             }
    //
    //         ]
    //     };
    //
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize", function () {
    //         myChart.resize();
    //     });
    // }

    function echarts_5() {
        // AJAX加载数据：异步的Javascript and xml
        xData2 = []
        yData2 = []
        $.ajax({
            type: 'post',                            // post请求
            url: '/getmeanprice',
            dataType: 'json',
            data:{},
            error: function(xhr, err){
                alert('请求失败，请检查，' + err + '!')
            },
            success: function(data) {   // data是javascript的json格式
                for(i=0;i<data.length;i++){
                      xData2[i]=data[i].name
                      yData2[i]=Number.parseInt(data[i].value)
//                    xData[i]=data[i].jobtype
//                    yData[i]=Number.parseInt(data[i].s)
                }

                         // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echart5'));

                option = {
                  //  backgroundColor: '#00265f',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '0%',
                        top:'10px',
                        right: '0%',
                        bottom: '4%',
                       containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                            data: xData2,
                        axisLine: {
                            show: true,
                         lineStyle: {
                                color: "rgba(255,255,255,.6)",
                                width: 1,
                                type: "solid"
                            },
                        },

                        axisTick: {
                            show: false,
                        },
                        axisLabel:  {
                                interval: 0,
                               // rotate:50,
                                show: true,
                                splitNumber: 15,
                                textStyle: {
                                    color: "rgba(255,255,255,.6)",
                                    fontSize: '12',
                                },
                            },
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                           //formatter: '{value} %'
                            show:true,
                             textStyle: {
                                    color: "rgba(255,255,255,.6)",
                                    fontSize: '12',
                                },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.6)",
                                width: 1,
                                type: "solid"
                            },
                        },
                        splitLine: {
                            lineStyle: {
                               color: "rgba(255,255,255,.6)",
                            }
                        }
                    }],
                    series: [
                        {
                        type: 'bar',
                        data: yData2,
                        barWidth:'35%', //柱子宽度
                       // barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color:'#2f89cf',
                                opacity: 1,
                                barBorderRadius: 5,
                            }
                        }
                    }

                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize",function(){
                    myChart.resize();
                });
            }
        });
    }

    function echarts_4() {
        let url = '/house/getHouseNumberOfProvince';
        fetch(url)
            .then(resp => resp.json())
            .then(json => {
                let x = [];
                let y = [];
                json.forEach(o => {
                    x.push(o["province"]);
                    y.push(o["num"])
                })
                bar(x, y)
            })
            .catch(e => console.log(`fetch出错\n url：${url}\n 错误信息：${e}`));
    }

    function echarts_6() {
        // AJAX加载数据：异步的Javascript and xml
        xData3 = []
        yData3 = []
        $.ajax({
            type: 'post',                            // post请求
            url: '/getbuildingareaavgprice',
            dataType: 'json',
            data:{},
            error: function(xhr, err){
                alert('请求失败，请检查，' + err + '!')
            },
            success: function(data) {   // data是javascript的json格式
                for(i=0;i<data.length;i++){
                    xData3[i]=data[i].mianjiqujian
                    yData3[i]=Number.parseInt(data[i].up)
                }

                         // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echart6'));

                option = {
                  //  backgroundColor: '#00265f',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '0%',
                        top:'10px',
                        right: '0%',
                        bottom: '4%',
                       containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                            data: xData3,
                        axisLine: {
                            show: true,
                         lineStyle: {
                                color: "rgba(255,255,255,.1)",
                                width: 1,
                                type: "solid"
                            },
                        },

                        axisTick: {
                            show: false,
                        },
                        axisLabel:  {
                                interval: 0,
                               // rotate:50,
                                show: true,
                                splitNumber: 15,
                                textStyle: {
                                    color: "rgba(255,255,255,.6)",
                                    fontSize: '12',
                                },
                                // rotate: 90,
                            },
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                           //formatter: '{value} %'
                            show:true,
                             textStyle: {
                                    color: "rgba(255,255,255,.6)",
                                    fontSize: '12',
                                },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.1	)",
                                width: 1,
                                type: "solid"
                            },
                        },
                        splitLine: {
                            lineStyle: {
                               color: "rgba(255,255,255,.1)",
                            }
                        }
                    }],
                    series: [
                        {
                        type: 'bar',
                        data: yData3,
                        barWidth:'35%', //柱子宽度
                       // barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color:'#2f89cf',
                                opacity: 1,
                                barBorderRadius: 5,
                            }
                        }
                    }

                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize",function(){
                    myChart.resize();
                });
            }
        });
    }

    // function echarts_31() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('fb1'));
    //     option = {
    //
    //         title: [{
    //             text: '年龄分布',
    //             left: 'center',
    //             textStyle: {
    //                 color: '#fff',
    //                 fontSize: '16'
    //             }
    //
    //         }],
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: "{a} <br/>{b}: {c} ({d}%)",
    //             position: function (p) {   //其中p为当前鼠标的位置
    //                 return [p[0] + 10, p[1] - 10];
    //             }
    //         },
    //         legend: {
    //
    //             top: '70%',
    //             itemWidth: 10,
    //             itemHeight: 10,
    //             data: ['0岁以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上'],
    //             textStyle: {
    //                 color: 'rgba(255,255,255,.5)',
    //                 fontSize: '12',
    //             }
    //         },
    //         series: [
    //             {
    //                 name: '年龄分布',
    //                 type: 'pie',
    //                 center: ['50%', '42%'],
    //                 radius: ['40%', '60%'],
    //                 color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
    //                 label: {show: false},
    //                 labelLine: {show: false},
    //                 data: [
    //                     {value: 1, name: '0岁以下'},
    //                     {value: 4, name: '20-29岁'},
    //                     {value: 2, name: '30-39岁'},
    //                     {value: 2, name: '40-49岁'},
    //                     {value: 1, name: '50岁以上'},
    //                 ]
    //             }
    //         ]
    //     };
    //
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize", function () {
    //         myChart.resize();
    //     });
    // }
    //
    // function echarts_32() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('fb2'));
    //     option = {
    //
    //         title: [{
    //             text: '职业分布',
    //             left: 'center',
    //             textStyle: {
    //                 color: '#fff',
    //                 fontSize: '16'
    //             }
    //
    //         }],
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: "{a} <br/>{b}: {c} ({d}%)",
    //             position: function (p) {   //其中p为当前鼠标的位置
    //                 return [p[0] + 10, p[1] - 10];
    //             }
    //         },
    //         legend: {
    //
    //             top: '70%',
    //             itemWidth: 10,
    //             itemHeight: 10,
    //             data: ['电子商务', '教育', 'IT/互联网', '金融', '学生', '其他'],
    //             textStyle: {
    //                 color: 'rgba(255,255,255,.5)',
    //                 fontSize: '12',
    //             }
    //         },
    //         series: [
    //             {
    //                 name: '年龄分布',
    //                 type: 'pie',
    //                 center: ['50%', '42%'],
    //                 radius: ['40%', '60%'],
    //                 color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
    //                 label: {show: false},
    //                 labelLine: {show: false},
    //                 data: [
    //                     {value: 5, name: '电子商务'},
    //                     {value: 1, name: '教育'},
    //                     {value: 6, name: 'IT/互联网'},
    //                     {value: 2, name: '金融'},
    //                     {value: 1, name: '学生'},
    //                     {value: 1, name: '其他'},
    //                 ]
    //             }
    //         ]
    //     };
    //
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize", function () {
    //         myChart.resize();
    //     });
    // }
    //
    // function echarts_33() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('fb3'));
    //     option = {
    //         title: [{
    //             text: '兴趣分布',
    //             left: 'center',
    //             textStyle: {
    //                 color: '#fff',
    //                 fontSize: '16'
    //             }
    //
    //         }],
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: "{a} <br/>{b}: {c} ({d}%)",
    //             position: function (p) {   //其中p为当前鼠标的位置
    //                 return [p[0] + 10, p[1] - 10];
    //             }
    //         },
    //         legend: {
    //             top: '70%',
    //             itemWidth: 10,
    //             itemHeight: 10,
    //             data: ['汽车', '旅游', '财经', '教育', '软件', '其他'],
    //             textStyle: {
    //                 color: 'rgba(255,255,255,.5)',
    //                 fontSize: '12',
    //             }
    //         },
    //         series: [
    //             {
    //                 name: '兴趣分布',
    //                 type: 'pie',
    //                 center: ['50%', '42%'],
    //                 radius: ['40%', '60%'],
    //                 color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
    //                 label: {show: false},
    //                 labelLine: {show: false},
    //                 data: [
    //                     {value: 2, name: '汽车'},
    //                     {value: 3, name: '旅游'},
    //                     {value: 1, name: '财经'},
    //                     {value: 4, name: '教育'},
    //                     {value: 8, name: '软件'},
    //                     {value: 1, name: '其他'},
    //                 ]
    //             }
    //         ]
    //     };
    //
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize", function () {
    //         myChart.resize();
    //     });
    // }

    function bar(x, y) {
        // 基于准备好的dom，初始化echarts实例
        let titleDiv = document.querySelector("#title_echart4");
        titleDiv.textContent = "各省市提供的新房数量"
        var myChart = echarts.init(document.getElementById('echart4'));

        let option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: x,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                            textStyle: {
                                color: "#ffffff",
                            },
                        },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                            textStyle: {
                                color: "#ffffff",
                            },
                        },
                }
            ],
            series: [
                {
                    name: '新房数量',
                    type: 'bar',
                    barWidth: '60%',
                    data: y
                }
            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", () => myChart.resize());
    }
})



		
		
		


		









