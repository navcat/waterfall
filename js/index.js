/**
 * jquery版本的瀑布流
 * @date 2015-12-1 08:56:54
 * @author NavCat
 */
$(document).ready(function(){
    var column_height;
    // 家在第一页的数据
    loadMoreImages();

    $(window).scroll( function() {
        // 判断是否需要加载
        if(shouldLoad()){
            // 加载新的一页图片数据
            loadMoreImages();
        }
    });

    /**
     * 加载新的一页图片数据
     * 
     */
    function loadMoreImages(){
        var data = [];
        var img_prefix = 'images/';     // 图片的前缀
        for (var i=1; i<=30; i++){
            data.push(img_prefix + i + '.jpg');
        }

        // 添加新的元素到容器
        var container = $(".container");
        for(var index in data){
            var box = $('<div>').attr('class', 'box')
                .append($('<div>').attr('class', 'inner')
                    .append($('<img>').attr('src', data[index]))
                );
            box.appendTo(container);
            // 改变改图片的位置
            changeElemPos(box);
        }
    }

    /**
     * 处理某一张图片的定位
     * @param  {[$]} box [图片对象]
     */
    function changeElemPos(box){
        // 第一张图片的宽度 包括边框和padding
        // var img_width = $(".box").get(0).offsetWidth;
        // 或者
        var img_width = box.outerWidth();
        var el_height = box.outerHeight();

        // 初始化数组
        if(!column_height){
            column_height = [];
            // 每一行图片的数量
            var i = 0,
            box_num = Math.floor($(window).width() / img_width);
            for(; i < box_num; i ++){
                column_height[i] = 0;
            }
        }
        
        // 上一排的最低高度
        var min_height = Math.min.apply(null, column_height);
        // 最低高度的位置
        var min_index = $.inArray(min_height, column_height);
        box.css({
            'position': 'absolute',
            'left': (img_width * min_index) + 'px',
            'top': column_height[min_index] + 'px'
        });
        column_height[min_index] += el_height;
    }

    /**
     * 判断是否需要加载更多图片
     */
    function shouldLoad(){
        // 最后一个元素
        var last = $('.box').last();
        return $(document).scrollTop() + $(window).height() >= $(document).height() - last.outerHeight() / 2;
    }

});