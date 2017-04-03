(function($){
    // 假数据
    var initRes = [
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第一条留言', content: '这是第一条留言的内容'},
        {name: '这是第二条留言', content: '这是第二条留言的内容'},
        {name: '这是第三条留言', content: '这是第三条留言的内容'}
    ],resArr = $.extend([],initRes);
    Mock.mock(/\/get/,function(options){ // 拦截获取留言列表请求，返回列表信息
        return {status: 'success', data: resArr};
    }).mock(/\/post/,function(options){ // 拦截新增留言请求
        var arr = options.body.split('&'),obj = {};
        arr.map(function(item){
            var items = item.split('=');
            obj[items[0]] = decodeURIComponent(decodeURIComponent(items[1]));
        })
        resArr.push(obj); // 将留言加载到假数据中
        if(resArr.length < 50){ //如果假数据不超过50条，返回成功，否则返回false，同时初始化假数据
            return {status: 'success'};
        }else{
            resArr = $.extend([],initRes);
            return {status: 'false'};
        }
    })
})(jQuery)
