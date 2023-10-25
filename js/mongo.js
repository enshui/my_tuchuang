const scriptUrl = document.currentScript.src;
const urlParams = new URLSearchParams(scriptUrl.split('?')[1]);

function postData(data = {}, collection = 'others') {
    // ѭ����ȡ����
    for (let [key, value] of urlParams.entries()) {
        data[key] = value;
    }

    // ���������Ϊ v �� c��������������Ϊ version �� collection����������ֵ������Ӧ����
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

    // ����idֵ
    if (data.hasOwnProperty('dhl_id_value')) {
        var intervalId = setInterval(function () {
            var element = document.getElementById(data['dhl_id_value']);
            if (element && !element.textContent.includes("���ڼ��ؽ���ʫ��") && !element.textContent.includes("jinrishici-sentence")) {
                clearInterval(intervalId);
                // �ڴ˴����Ҫִ�е���һ������
                data['dhl_id_value'] = element.textContent;
            }
        }, 2000); // ÿ���Ӽ��һ��Ԫ�ص��ı�����
    }

    data['currentUrl'] = window.location.href;
    data['user_agent'] = navigator.userAgent;
    // data['ip'] = '0.0.0.0';

    // ���� POST ���󲢷��� Promise ����
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
