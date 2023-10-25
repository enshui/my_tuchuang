const scriptUrl = document.currentScript.src;
const urlParams = new URLSearchParams(scriptUrl.split('?')[1]);

function postData(data = {}, collection = 'others') {
    // 循环获取参数
    for (let [key, value] of urlParams.entries()) {
        data[key] = value;
    }

    // 如果参数名为 v 或 c，重命名参数名为 version 或 collection，并将参数值赋给对应属性
    if (data.hasOwnProperty('v')) {
        data['version'] = data['v'];
        delete data['v'];
    } else {
        data['version'] = '0'
    }

    if (data.hasOwnProperty('c')) {
        data['collection'] = data['c'];
        delete data['c'];
    } else {
        data['collection'] = 'others'
    }

    // 增加id值
    if (data.hasOwnProperty('dhl_id_value')) {
        var intervalId = setInterval(function () {
            var element = document.getElementById(data['dhl_id_value']);
            if (element && !element.textContent.includes("正在加载今日诗词") && !element.textContent.includes("jinrishici-sentence")) {
                clearInterval(intervalId);
                // 在此处添加要执行的下一步操作
                data['dhl_id_value'] = element.textContent;
            }
        }, 2000); // 每秒钟检查一次元素的文本内容
    }

    data['currentUrl'] = window.location.href;
    data['user_agent'] = navigator.userAgent;
    // data['ip'] = '0.0.0.0';

    // 发送 POST 请求并返回 Promise 对象
    return fetch('https://api.yuenshui.cn/record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}

let run_the_js = urlParams.get('run');
if (run_the_js) {
    postData()
}
