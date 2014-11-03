(function(win, $){
    function MediaSlider(container, options){
        
        this._optionsFilter(options);
        
        this.container = container;
        
        container.html(this.getMainContainerTmplt());
        
        this.movingBoxHolder = this.container.find('[data-jqx-moving-box-holder]');

        this.movingBox = this.container.find('[data-jqx-moving-box]');

        this.buttons = {
            left: this.container.find('[data-jqx-left-btn]'),
            right: this.container.find('[data-jqx-right-btn]')
        };
        
        this.movingBox.height(this.options.itemHeight);
        
        this._bindEvents(container);
        
        this.itemlist = [];
        this.appendItems(this.options.items);
    }
    
    MediaSlider.prototype._optionsFilter = function(options){
        this.options = options || {};

        this.options.itemWidth = parseFloat(options.itemWidth) || 50;
        this.options.itemHeight =  parseFloat(options.itemHeight) || 50;

        if (typeof(options.widthBetweenItems) === 'undefined') {
            /* to consider zero pixel */
            this.options.widthBetweenItems = 3;
        } else {
            this.options.widthBetweenItems = parseFloat(options.widthBetweenItems);
        }
            
        this.options.itemRender = options.itemRender || this.defaultItemRenderFunction;
        
        this.options.changeOffset = parseFloat(options.changeOffset) || 
                               (options.itemWidth + parseFloat(options.widthBetweenItems)/2);
        
        this.options.items = options.items || [];
        
        return options;
    };
    
    MediaSlider.prototype._bindEvents = function(){
        var scope = this,
            container = this.container;

        container.on("click","[data-jqx-left-btn]", function(evt){
            var $this = $(this);
            if(scope.isVisibleWidthSmallerThanMovingContainer()){
                scope.container.trigger("jqx-slider-start");
                scope.container.trigger("jqx-slider-end");
                scope.buttons.left.addClass('disable');
                return;
            }
            $(this).removeClass('disable');
            scope.moveLeft(scope.options.changeOffset);
        });
        container.on("click","[data-jqx-right-btn]", function(evt){
            var $this = $(this);
            if(scope.isVisibleWidthSmallerThanMovingContainer()){
                scope.container.trigger("jqx-slider-start");
                scope.container.trigger("jqx-slider-end");
                scope.buttons.right.addClass('disable');
                return;
            }
            $this.removeClass('disable');
            scope.moveRight(scope.options.changeOffset);
        });
        container.on("click","[data-jqx-item-box]", function(evt){
            container.trigger("jqx-slider-item-cliked");
        });
    };
    
    MediaSlider.prototype.renderItemContainer = function(iObj){
        this.movingBox.append(this.getItemContainerTmplt({ 
            context:iObj
        }));
    };

    MediaSlider.prototype.getFullWidthOfMovingContainer = function(){
        var fullWidth = this.itemlist.length * (this.options.itemWidth) + 
                        (this.itemlist.length - 1) * this.options.widthBetweenItems;
        return fullWidth;
    };

    MediaSlider.prototype.getVisibleWidth = function(){
        return parseFloat(this.movingBoxHolder.width());
    };

    MediaSlider.prototype.isVisibleWidthSmallerThanMovingContainer = function(){
        return  this.getFullWidthOfMovingContainer() <= this.getVisibleWidth();
    };

    MediaSlider.prototype.isInLimit = function(newLeft){
        var widthVisible = this.getVisibleWidth(),
            fullWidth = this.getFullWidthOfMovingContainer();
        if (newLeft <= 0) {
            return newLeft + fullWidth - widthVisible;
        } else {
            return newLeft;
        }
    };
    
    MediaSlider.prototype.moveLeft = function(changeOffset){
        var scope = this;

        scope.movingBox.css('left', function(index, val){
            var changedLeft = parseInt(val) + changeOffset;

            if (changedLeft >=0) {
                scope.container.trigger("jqx-media-slider-start");
                scope.buttons.left.addClass("disable");
                return '0px';
            }
            scope.buttons.left.removeClass("disable");
            scope.buttons.right.addClass("disable");
            return changedLeft + 'px';
        });
    };

    MediaSlider.prototype.moveRight = function(changeOffset){
        var scope = this;

        scope.movingBox.css('left', function(index, val){
            var changedLeft = parseFloat(val) - changeOffset,
                remainingLength = scope.isInLimit(changedLeft);
            
            if (remainingLength <= 0) {
                scope.container.trigger("jqx-slider-end");
                scope.buttons.right.addClass("disable");
                return changedLeft - remainingLength + 'px';
            }
            scope.buttons.right.removeClass("disable");
            scope.buttons.left.addClass("disable");
            return changedLeft + 'px';
        });
    };
    
    MediaSlider.prototype.appendItems = function(inputArray){
        var scope = this,
            iArray = inputArray || [];
        scope.itemlist = scope.itemlist.concat(iArray);
        iArray.forEach(function(obj) {
            scope.renderItemContainer(obj);
        });
        if(scope.isVisibleWidthSmallerThanMovingContainer()){
            scope.buttons.right.addClass('disable');
        } else {
            scope.buttons.right.removeClass('disable');
        }
    };

    MediaSlider.prototype.getMainContainerTmplt = function(){
        /*jshint multistr:true */
        var tmplt = '<div class="jqx-media-slider"> \
                        <div class="jqx-btn jqx-btn-right jqx-absolute" data-jqx-right-btn=""> \
                            <div class="jqx-triangle-right jqx-in-middle"></div> \
                        </div> \
                        <div class="jqx-btn jqx-btn-left jqx-absolute disable" data-jqx-left-btn=""> \
                            <div class="jqx-triangle-left jqx-in-middle"></div> \
                        </div> \
                        <div class="jqx-moving-box-holder" data-jqx-moving-box-holder=""> \
                            <div class="jqx-moving-box jqx-relative" data-jqx-moving-box=""></div> \
                        </div> \
                    </div>';
        /*jshint multistr:false */
        return tmplt;
    };
    
    MediaSlider.prototype.getItemContainerTmplt = function(cObj){
        var tmplt,
            innerContent = this.options.itemRender(cObj.context);

        tmplt = $('<div>').addClass('jqx-item-box')
                          .attr('data-jqx-item-box','')
                          .css({
                              height: this.options.itemHeight + 'px',
                              width: this.options.itemWidth + 'px',
                              marginRight: this.options.widthBetweenItems + 'px'
                          })
                          .html(innerContent);
        // TODO: Need to Fix Later

        return $('<div>').append(tmplt.clone()).html();
    };
    
    MediaSlider.prototype.defaultItemRenderFunction = function(context){
        return $('<img>').attr("src", context.src)
                         .attr("alt", context.alt || '')
                         .clone();
    };
    
    $.fn.mediaSlider = function(options){
        var ms = new MediaSlider(this, options);
        return $.extend(this,{
            appendItems: function(x){
                ms.appendItems(x);
            }
        });
    };

}(window, jQuery));