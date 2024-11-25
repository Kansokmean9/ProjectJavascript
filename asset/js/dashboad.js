let totalEducation, totalProject, totalSkills, totalExperience, totalLanguage, totalSoftware;

function getdataed() {
    fetch('https://mps7.chandalen.dev/api/educations')
        .then(res => res.json())
        .then(json => {
            totalEducation = json.data.length;
            //console.log(totalEducation)
        })

}

function gettatolExperience() {
    fetch('https://mps7.chandalen.dev/api/experiences')
        .then(res => res.json())
        .then(json => {
            totalExperience = json.data.length;

        })

}

function gettatolLanguage() {
    fetch('https://mps7.chandalen.dev/api/languages')
        .then(res => res.json())
        .then(json => {
            totalLanguage = json.data.length;

        })

}

function gettatolSkills() {
    fetch('https://mps7.chandalen.dev/api/skills')
        .then(res => res.json())
        .then(json => {
            totalSkills = json.data.length;
            skills = `
                {
                   value: ${json.data.name},
                   name: '${json.data.percent}',
                   itemStyle: {
                   color: rgbaColor(themeColors.primary, 0.5)
                  }
                    `;


        })


}

function gettatolProject() {
    fetch('https://mps7.chandalen.dev/api/projects')
        .then(res => res.json())
        .then(json => {
            totalProject = json.data.length;

        })

}

function gettatolSoftware() {
    fetch('https://mps7.chandalen.dev/api/softwares')
        .then(res => res.json())
        .then(json => {
            totalSoftware = json.data.length;

        })

}
gettatolSoftware()
gettatolProject();
gettatolSkills();
gettatolLanguage();
gettatolExperience();
getdataed();
//get index dasbaord
function getdata() {
    let dashboardData = {
        total_contact: 0,
        total_view: 0,
        total_own_project: 0,
        total_blog: 0,
    };

    fetch(`https://mps7.chandalen.dev/api/dashboard`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())

        .then(json => {
            // Save fetched data globally

            dashboardData = json.data;
            document.getElementById('tview').innerText = dashboardData.total_view;
            document.getElementById('tcontact').innerText = dashboardData.total_contact;
            document.getElementById('tproject').innerText = dashboardData.total_own_project;
            document.getElementById('tblog').innerText = dashboardData.total_blog;

            function getThemeColor(name) {
                const colors = {
                    'gray-100': '#f8f9fa',
                    'gray-200': '#e9ecef',
                    'gray-300': '#dee2e6',
                    'gray-400': '#ced4da',
                    'gray-1100': '#343a40',
                    'primary': '#007bff'
                };
                return colors[name] || '#000';
            }
            // Chat api data 
            function getOption() {

                const months = ['Software', 'Education', 'Experience', 'Language', 'Project', 'Skills'];
                const data = [totalSoftware, totalEducation, totalExperience, totalLanguage, totalProject, totalSkills];
                return {
                    title: [
                        // { text: 'Skill chart', left: 'center', textStyle: { color: themeColors.gray600 } },
                        // { subtext: 'alignTo: "edge"', left: '50%', top: '85%', textAlign: 'center', subtextStyle: { color: themeColors.gray700 } }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        padding: [7, 10],
                        backgroundColor: getThemeColor('gray-100'),
                        borderColor: getThemeColor('gray-300'),
                        textStyle: {
                            color: getThemeColor('gray-1100')
                        },
                        borderWidth: 1,
                        transitionDuration: 0,
                        axisPointer: {
                            type: 'none'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: months,
                        axisLine: {
                            lineStyle: {
                                color: getThemeColor('gray-300'),
                                type: 'solid'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: getThemeColor('gray-400'),
                            formatter: value => value.substring(0, 10),
                            margin: 15
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            color: getThemeColor('gray-400'),
                            margin: 15
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: getThemeColor('gray-200')
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        min: 0
                    },
                    series: [{
                        type: 'bar',
                        name: 'Total',
                        data: data,
                        lineStyle: {
                            color: getThemeColor('primary')
                        },
                        itemStyle: {
                            color: getThemeColor('primary'),
                            borderRadius: [3, 3, 0, 0]
                        },
                        showSymbol: false,
                        smooth: false,
                        emphasis: {
                            scale: true
                        }
                    }],
                    grid: {
                        right: '3%',
                        left: '10%',
                        bottom: '10%',
                        top: '5%'
                    }
                };
            }

            // Initialize the chart
            const chartDom = document.getElementById('chart');
            const myChart = echarts.init(chartDom);
            myChart.setOption(getOption());
            const themeColors = {
                primary: '#007bff',
                secondary: '#6c757d',
                danger: '#dc3545',
                warning: '#ffc107',
                success: '#28a745',
                info: '#17a2b8',
                gray600: '#6c757d',
                gray700: '#495057',
                gray100: '#f8f9fa',
                gray300: '#dee2e6',
                gray1100: '#212529'
            };

            function rgbaColor(color, opacity) {
                return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
            }

            // Chart Data
            const data = [

                {
                    value: 100,
                    name: 'SQL',
                    itemStyle: {
                        color: rgbaColor(themeColors.primary, 0.5)
                    }
                }, {
                    value: 100,
                    name: 'Oracle',
                    itemStyle: {
                        color: themeColors.danger
                    }
                }, {
                    value: 100,
                    name: 'OOP',
                    itemStyle: {
                        color: themeColors.primary
                    }
                }, {
                    value: 100,
                    name: 'Laravel',
                    itemStyle: {
                        color: themeColors.secondary
                    }
                }, {
                    value: 100,
                    name: 'Bootstrap',
                    itemStyle: {
                        color: themeColors.warning
                    }
                }, {
                    value: 100,
                    name: 'CSS',
                    itemStyle: {
                        color: rgbaColor(themeColors.warning, 0.8)
                    }
                }, {
                    value: 100,
                    name: 'Javascript',
                    itemStyle: {
                        color: themeColors.success
                    }
                }, {
                    value: 100,
                    name: 'JAVA',
                    itemStyle: {
                        color: themeColors.info
                    }
                }, {
                    value: 100,
                    name: 'HTML',
                    itemStyle: {
                        color: rgbaColor(themeColors.primary, 0.5)
                    }
                }
            ];


            // Chart Initialization
            const chartElement = document.getElementById('chart1');
            const chart = echarts.init(chartElement);

            // Function to get chart options
            function getOption1() {
                return {
                    title: [
                        // { text: 'Skill chart', left: 'center', textStyle: { color: themeColors.gray600 } },
                        // { subtext: 'alignTo: "edge"', left: '50%', top: '85%', textAlign: 'center', subtextStyle: { color: themeColors.gray700 } }
                    ],
                    tooltip: {
                        trigger: 'item',
                        padding: [7, 10],
                        backgroundColor: themeColors.gray100,
                        borderColor: themeColors.gray300,
                        textStyle: {
                            color: themeColors.gray1100
                        },
                        borderWidth: 1,
                        transitionDuration: 0,
                        axisPointer: {
                            type: 'none'
                        }
                    },
                    series: [{
                        type: 'pie',
                        radius: window.innerWidth < 530 ? '45%' : '60%',
                        center: ['50%', '50%'],
                        data: data,
                        label: {
                            position: 'outer',
                            alignTo: 'edge',
                            edgeDistance: 20,
                            color: themeColors.gray700
                        },
                        left: '5%',
                        right: '5%',
                        top: 0,
                        bottom: 0
                    }]
                };
            }

            // Set initial chart options
            chart.setOption(getOption1());

            // Responsive chart on window resize
            window.addEventListener('resize', () => {
                chart.setOption({
                    series: [{
                        radius: window.innerWidth < 530 ? '45%' : '60%'
                    }]
                });
            });

        })
}
getdata()
const toggleTooltip = document.getElementById('toggleNavigationTooltip');
const tooltip = document.getElementById('tooltip');

toggleTooltip.addEventListener('click', () => {
    tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
});
// Data form caht
