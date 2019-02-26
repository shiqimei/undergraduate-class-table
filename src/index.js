import './style/style.css'
const echarts = require('echarts/lib/echarts')
                require('echarts/lib/chart/heatmap')
                require('echarts/lib/component/tooltip')
                require('echarts/lib/component/title')
                require('@/lib/echarts/theme/essos')
const echartsOption = require('@/lib/echarts/echartsOption')
const axios = require('axios')
const courseChart = echarts.init(document.getElementById('main'), 'redredred')
let previousButton = null
const nameMap = new Map(require('@/assets/data/nameMap.json'))

courseChart.setOption(echartsOption)

for(let key of nameMap.keys()) {
    const container = document.querySelector('.container')
    const button = document.createElement('div')

    button.classList.add('button')
    button.innerText = key

    container.appendChild(button)
}

const buttons = document.querySelectorAll('.button')
buttons.forEach( button => {
    button.addEventListener('click', e => {
        let currentButton = e.target
        const person = nameMap.get(currentButton.innerText)

        currentButton.classList.add('button-hover')
        if(!Object.is(previousButton, null)) {
            previousButton.classList.remove('button-hover')
        }
        previousButton = currentButton

        if(person !== 'summary') {
            axios.get(`./assets/data/${person}.json`)
            .then( res => {
                const data = res.data
    
                data.forEach( item => {
                    item[0] -= 1
                    item[1] = 11-item[1]
                })
                echartsOption.series[0].data = res.data
                courseChart.setOption(echartsOption)
            })
        }else {
            let summary = null, i = 0

            nameMap.forEach( person => {
                if(person !== 'summary') {
                    let courseInfo = require(`@/assets/data/${person}.json`)

                    if(i === 0) {
                        summary = JSON.parse(JSON.stringify(courseInfo))
                    }
                    if(i < 21 && i > 0) {
                        courseInfo.forEach( item => {
                            let day = item[0]
                            let course = item[1]
                            let isFound = false
                            summary.forEach( info => {
                                if( day === info[0] && course === info[1] ) {
                                    // console.log('匹配: '+info[0], info[1], info[2])
                                    info[2]++
                                    // console.log('改变: '+info[0], info[1], info[2])
                                    isFound=true
                                }
                            })
                            if(isFound === false) {
                                summary.push([day, course, 1])
                            }
                        })
                    }
                    i++
                }
            })
            summary.forEach( item => {
                item[0] -= 1
                item[1] = 11-item[1]
            })
            echartsOption.series[0].data = summary
            courseChart.setOption(echartsOption)
        }
    })
})

const helpLink = document.createElement('div')
const footer = document.createElement('div')

helpLink.classList.add('help-link')
footer.classList.add('footer')
helpLink.innerHTML = '<a href="https://contact.lolimay.cn">课表有误？请戳此链接联系我修改</a>'
footer.innerHTML = `Powered with ❤ by <a href="https://github.com/lolimay" target="_blank">lolimay</a>.`

document.body.appendChild(helpLink)
document.body.appendChild(footer)

// summary
const summaryButton = document.querySelector('.button')
summaryButton.dispatchEvent(new Event('click'))