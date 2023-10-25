// ����һ�� Promise ���󣬻�ȡ���� IP ��ַ�����ظõ�ַ
function getLocalIP() {
    return new Promise(function (resolve, reject) {
        // ����һ�� XMLHttpRequest ����
        var xhr = new XMLHttpRequest();
        // ��һ�� GET �������� https://api.ipify.org
        xhr.open('GET', 'https://api.ipify.org?format=json', true);
        // ��� onload �ص�����
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // ���� JSON ��Ӧ
                var response = JSON.parse(xhr.responseText);
                // �� IP ��ַ��Ϊ�������ݸ� resolve ����
                resolve(response.ip);
            } else {
                // ���������������� reject ����
                reject(new Error('Failed to get local IP address'));
            }
        };
        // ���� GET ����
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

    // ���� getLocalIP ���������� Promise ����ɹ�ʱִ�лص�����
    getLocalIP().then(function (myIP) {
        // ����ȡ���� IP ��ַ����� data['ip']
        data['ip'] = myIP;
        // console.log('Your local IP address is: ' + myIP);
        // // ���� POST ���󲢷��� Promise ����
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





