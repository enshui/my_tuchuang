// 发起 HTTP 请求获取数据
var apiUrl = "https://apis.yuenshui.cn/jssrc";
var imgElement = document.getElementById("imgElement");

// 使用 fetch 来获取数据
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // 提取响应中的图片 URL
        var imgUrl = data.data.img;

        // 设置 img 标签的 src 属性
        imgElement.src = imgUrl;
    })
    .catch(error => console.error("发生错误：", error));
