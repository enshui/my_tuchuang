// 定义一个 Promise 对象，获取本机 IP 地址并返回该地址
function getLocalIP() {
    return new Promise(function (resolve, reject) {
        // 创建一个 XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        // 打开一个 GET 请求，请求 https://api.ipify.org
        xhr.open('GET', 'https://api.ipify.org?format=json', true);
        // 添加 onload 回调函数
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 解析 JSON 响应
                var response = JSON.parse(xhr.responseText);
                // 将 IP 地址作为参数传递给 resolve 函数
                resolve(response.ip);
            } else {
                // 如果发生错误，则调用 reject 函数
                reject(new Error('Failed to get local IP address'));
            }
        };
        // 发送 GET 请求
        xhr.send();
    });
}


function postData(data = {}, collection = 'others') {
    let c = urlParams.get('c');
    if (!c) {
        c = collection;
    }

    data['collection'] = c;
    data['user_agent'] = navigator.userAgent;
    data['currentUrl'] = window.location.href;

    // 调用 getLocalIP 函数，并在 Promise 对象成功时执行回调函数
    getLocalIP().then(function (myIP) {
        // 将获取到的 IP 地址分配给 data['ip']
        data['ip'] = myIP;
        // console.log('Your local IP address is: ' + myIP);
        // // 发送 POST 请求并返回 Promise 对象
        return fetch('https://api.yuenshui.cn/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }).catch(function (error) {
        console.error(error);
    });
}

const scriptUrl = document.currentScript.src;
const urlParams = new URLSearchParams(scriptUrl.split('?')[1]);
let run_the_js = urlParams.get('run');
if (run_the_js) {
    postData()
}





