/**
 * jquery版本的瀑布流
 * @date 2015-12-1 08:56:54
 * @author NavCat
 */
$(document).ready(function(){
    var column_height = [];
    // 改变现有图片的位置
    changePos();

    $(window).scroll( function() {
        // 判断是否需要加载
        if(shouldLoad()){
            var data = [];
            var img_prefix = 'images/';     // 图片的前缀
            for (var i=1; i<=30; i++){
                data.push(img_prefix + i + '.jpg');
            }

            var container = $(".container");
            for(var index in data){
                var box = $('<div>').attr('class', 'box')
                    .append($('<div>').attr('class', 'inner')
                        .append($('<img>').attr('src', data[index]))
                    );
                box.appendTo(container);
            }
            changePos();
            console.log('加载一次----------------')
        }
    });


    /**
     * 变更图片的布局为绝对布局并实现最短图片对齐
     */
    function changePos(){
        // 第一张图片的宽度 包括边框和padding
        // var img_width = $(".box").get(0).offsetWidth;
        // 或者
        var img_width = $(".box:first").outerWidth();
        // 每一行图片的数量
        var box_num = Math.floor($(window).width() / img_width);
        $('.box').each(function(index, el) {
            var box = $(el);
            // box的高度：包括边框和padding
            // var el_height = el.offsetHeight;
            // 或
            var el_height = box.outerHeight();
            // 第一排
            if (index < box_num){
                column_height[index] = el_height;
                box.css({
                    'position': 'absolute',
                    'left': (img_width * index) + 'px',
                    'top': 0
                });
            }else {
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
        });
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