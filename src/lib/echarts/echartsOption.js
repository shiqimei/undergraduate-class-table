const days = ['周一','周二','周三','周四','周五', '周六', '周日']
const courses = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11'
].reverse()
const timeTable = [
    '',
    '08:20~09:05',
    '09:15~10:00',
    '10:20~11:05',
    '11:15~12:00',
    '14:00~14:45',
    '14:55~15:40',
    '15:50~16:35',
    '16:45~17:30',
    '19:00~19:45',
    '19:55~20:40',
    '20:50~21:35'
]

option = {
    title:{
        text:'科研训练组本科生空闲时间统计',
        textStyle: {
            color: '#333',
            fontSize: 14
        },
        x:'center',
        y:'top',
        textAlign:'left'
    },
    render: 'svg',
    legend: {
        show: false
    },
    tooltip: {
        position: 'top'
    },
    animation: true,
    grid: {
        left: 65,
        top: 30,
        bottom: 50
    },
    xAxis: {
        type: 'category',
        data: days,
        splitArea: {
            show: true,
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        data: courses,
        splitArea: {
            show: true
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        }
    },
    visualMap: {
        min: 0,
        max: 24,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        itemHeight: 200,
        itemWidth: 10,
    },
    series: [{
        type: 'heatmap',
        data: [],
        label: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: '12'
                }
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: true,
                shadowColor: '#000',
                label: {
                    textStyle: {
                        color: '#26aafe'
                    }
                }
            }
        },
        tooltip: {
            formatter(data) {
                const personNum = data.value[2]
                const course = 11 - data.value[1]
                const day = data.name
                return `${day} ${timeTable[course]} <br>该时段 ${personNum} 人有课`
            }
        }
    }]
}

module.exports = option