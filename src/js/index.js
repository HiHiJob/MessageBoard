var React = require('react');
var ReactDOM = require('react-dom');

// 留言板表单模块
var MessageForm = React.createClass({
    onSubmit: function(e){ // 点击提交按钮，获取输入框内容，调用提交函数发送请求
        e.preventDefault();
        var that = this, // 缓存this指针指向
        name = encodeURIComponent(that.refs.name.value.trim()), // 获取名称输入框数据
        content = encodeURIComponent(that.refs.content.value.trim());
        that.props.submit(name,content); // 调用submit处理
        // 提交完成，清空输入框
        that.refs.name.value = '';
        that.refs.content.value = '';
    },
    onReset: function(e){ // 输入框返回初始状态，及内容为空（重置按钮调用）
        e.preventDefault();
        this.refs.form.reset();
    },
    render: function(){
        return (
            <form role="form" ref="form">
                <div className="form-group m-bottom-10 clearfix">
                    <div className="col-xs-4">
                        <input className="form-control" type="text" name="name" ref="name" placeholder="请输入标题" required/>
                    </div>
                </div>
                <div className="form-group m-bottom-10 clearfix">
                    <div className="col-xs-12">
                        <textarea className="form-control" name="content" ref="content" placeholder="请输入内容" required></textarea>
                    </div>
                </div>
                <div className="form-group m-bottom-10 clearfix">
                    <button className="btn btn-default btn-sm pull-right" onClick={this.onReset}>重置</button>
                    <button className="btn btn-default btn-sm pull-right" onClick={this.onSubmit}>提交</button>
                </div>
            </form>
            )
    }
})

// 留言板显示模块
var MessageList = React.createClass({
    render: function(){
        // 根据获取到的留言信息，每条消息对应一个li标签进行显示
        var message = this.props.data.map(function(item,idx){
            return (
                <li className="list-group-item" key={idx}>
                <h4> {item.name} </h4>
                <p> {item.content} </p>
                </li>
            )
        });
        return(
            <ul className="list-group" id="message-container">
            {message}
            </ul>
        );
    }
});

// 留言板提示消息模块
var MessageAlert = React.createClass({
    render: function(){
        switch (this.props.alert){
            case 'info':
                return (
                    <div className="alert alert-info">
                        <strong>提示！</strong>由于后台数据是假数据，假数据设置了当数据条目超过50条时，数据内容自动初始化为最初的三条。
                    </div>
                );
            case 'success':
                return (
                    <div className="alert alert-success">
                        <strong>通知！</strong>提交成功。
                    </div>
                );
            case 'warning':
                return (
                    <div className="alert alert-warning">
                        <strong>警告！</strong>标题和内容不能为空。
                    </div>
                );
            default: 
                return null;
        }
    }
});

// 留言板总体模块
var MessagePanel = React.createClass({
    getInitialState: function(){ // 初始化data为空
        return {
            data: [],
            alert: ''
        }
    },
    submit: function(name,content){ // 提交数据，将表单中的数据ajax提交
        var that = this; // 缓存this指针指向
        that.setState({
            alert: ''
        });
        if($.isEmptyObject(name) || $.isEmptyObject(content)){
            window.setTimeout(function(){ // 设计延迟，否则此处的setState会和前面的融合处理，导致多次空点击时无法弹出
                that.setState({ // 提示内容不能为空
                 alert: 'warning'
            });
            },100)
        }else{
            $.ajax({
                type: 'post',
                url: '/post',
                contentType: 'application/json; charset=utf-8',
                data:{name: name, content: content},
                dataType: 'json'
            }).done(function(resp){
                if('success' === resp.status){ // 提交成功
                    that.listContent(); // 更新留言板列表
                    that.scrollBottom(); // 页面滚动到底部
                    that.setState({ // 提示内容不能为空
                         alert: 'success'
                    });
                }else{
                    that.setState({ // 提示内容不能为空
                         alert: 'info'
                    });
                }
            }.bind(that));
        }
    },
    scrollBottom: (function gotoBottom(){ // 添加留言成功后页面滚动到最下方进行查看
        var speeding = 1.1, stime = 10,
        top = document.documentElement.scrollTop || document.body.scrollTop || 1; // 多浏览器兼容获取页面Y轴滚动偏移位置,若位置为0，赋值为1
        window.scrollTo(0, Math.ceil(top * speeding)); // 页面向下滚动滚动
        var topnew = document.documentElement.scrollTop || document.body.scrollTop; // 获取向下滚动后的Y轴偏移位置
        if(topnew > top) {
            // 循环timeout是动态滚动效果
            window.setTimeout(gotoBottom, stime);
        }
    }),
    listContent: function(){ // 获取留言列表
        var that = this;
        $.ajax({
            type: 'get',
            url: '/get',
            dataType: 'json'
        }).done(function(resp){
            if('success' === resp.status){ // 获取留言成功，将留言赋值到模块的state值中
                that.setState({
                    data:resp.data
                })
            }
        }.bind(that));
    },
    componentDidMount: function(){ // 初始化加载界面获取列表
        this.listContent();
    },
    gotoTop: (function gotoTop(){ // 函数名是为了递归调用（鉴于严格模式下无法使用calllee）
        var speeding = 1.1, stime = 10;
        var top = document.documentElement.scrollTop || document.body.scrollTop; // 多浏览器兼容获取页面Y轴滚动偏移位置
        window.scrollTo(0, Math.floor(top / speeding)); // 页面向上滚动
        if(top > 0) {
            // 循环timeout是动态滚动效果
            window.setTimeout(gotoTop, stime);
        }
    }),
    render: function(){
        return (
            <div>
                <div className="col-xs-2">
                </div>
                <div className="col-xs-8">
                    <MessageForm submit={this.submit} />
                    <MessageList data={this.state.data} />
                    <MessageAlert alert={this.state.alert}/>
                </div>
                <div className="col-xs-2">
                    <span className="icon-top" onClick={this.gotoTop}></span>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<MessagePanel />, document.getElementById("message-panel"));