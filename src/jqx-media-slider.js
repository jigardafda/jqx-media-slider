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
        
        this.sliderButtonsInit();

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
        
        /* items to be added at beginning */
        this.options.items = options.items || [];

        /* Slider navigation buttons configuration options */

        this.options.widthOfSliderButtons = parseFloat(options.widthOfSliderButtons) || 20;

        if(options.sliderButtons === "in" || options.sliderButtons === "hidden") {
            this.options.sliderButtons = options.sliderButtons;
        } else {
            this.options.sliderButtons = "out";
        }
    };

    MediaSlider.prototype.sliderButtonsInit = function(){
        var noMarginClass = "no-margin",
            hiddenClass = "hide",
            widthProp = "width";
        /* Slider button mode */
        if(this.options.sliderButtons === "in") {
            this.movingBoxHolder.addClass(noMarginClass);
        } else if(this.options.sliderButtons === "hidden") {
            this.movingBoxHolder.addClass(noMarginClass);
            this.buttons.left.addClass(hiddenClass);
            this.buttons.right.addClass(hiddenClass);
        }

        /* Slider buttons width */
        this.buttons.left.css(widthProp, this.options.widthOfSliderButtons);
        this.buttons.right.css(widthProp, this.options.widthOfSliderButtons);
    };
    
    MediaSlider.prototype.trigger = function(evnt){
        var scope = this;
        scope.container.trigger("jqx-media-slider-" + evnt);
    };

    MediaSlider.prototype.enableButton = function(btn, val){
        var scope = this,
            method = val ? "removeClass" : "addClass";
        if(btn === "left") {
            scope.buttons.left[method]('disable');
            return;
        } else if (btn === "right") {
            scope.buttons.right[method]('disable');
            return;
        }
        scope.buttons.left[method]('disable');
        scope.buttons.right[method]('disable');
    };

    MediaSlider.prototype._bindEvents = function(){
        var scope = this,
            container = this.container;

        container.on("click","[data-jqx-left-btn]", function(evt){
            var $this = $(this);
            if(scope.isMovingBoxSmall()){
                scope.trigger("start");
                scope.trigger("end");
                return;
            }
            scope.moveLeft(scope.options.changeOffset);
        });

        container.on("click","[data-jqx-right-btn]", function(evt){
            var $this = $(this);
            if(scope.isMovingBoxSmall()){
                scope.trigger("start");
                scope.trigger("end");
                scope.buttons.right.addClass('disable');
                return;
            }
            scope.moveRight(scope.options.changeOffset);
        });

        container.on("click","[data-jqx-item-box]", function(evt){
            container.trigger("item-cliked");
        });
    };
    
    MediaSlider.prototype.renderItemContainer = function(iObj){
        this.movingBox.append(this.getItemContainerTmplt({ 
            context:iObj
        }));
    };

    MediaSlider.prototype.getWidthOfMovingBox = function(){
        var fullWidth = this.itemlist.length * (this.options.itemWidth) + 
                        (this.itemlist.length - 1) * this.options.widthBetweenItems;
        return fullWidth;
    };

    MediaSlider.prototype.getVisibleWidth = function(){
        return parseFloat(this.movingBoxHolder.width());
    };

    MediaSlider.prototype.isMovingBoxSmall = function(){
        return  this.getWidthOfMovingBox() <= this.getVisibleWidth();
    };

    MediaSlider.prototype.isInLimit = function(newLeft){
        var widthVisible = this.getVisibleWidth(),
            fullWidth = this.getWidthOfMovingBox();
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
                scope.trigger("start");
                scope.checkEndsNEnbaleButtons(0);
                return '0px';
            }
            scope.checkEndsNEnbaleButtons(changedLeft);
            return changedLeft + 'px';
        });
    };

    MediaSlider.prototype.moveRight = function(changeOffset){
        var scope = this;

        scope.movingBox.css('left', function(index, val){
            var changedLeft = parseFloat(val) - changeOffset,
                remainingLength = scope.isInLimit(changedLeft);
            
            if (remainingLength <= 0) {
                scope.trigger("end");
                scope.checkEndsNEnbaleButtons(changedLeft - remainingLength);
                return changedLeft - remainingLength + 'px';
            }
            scope.checkEndsNEnbaleButtons(changedLeft);
            return changedLeft + 'px';
        });
    };
    
    MediaSlider.prototype.checkEndsNEnbaleButtons = function(passedleft){
        var scope = this,
            currentLeft,
            remainingLength;
        
        if (typeof(passedleft) === 'undefined') {
            /* to consider zero pixel */
            currentLeft = parseFloat(scope.movingBox.css('left'));
        } else {
            currentLeft = passedleft;
        }

        remainingLength = scope.isInLimit(currentLeft);

        if (currentLeft >= 0) { // Start of slider
            scope.enableButton("left", false);
        } else {
            scope.enableButton("left", true);
        }
        if (remainingLength <= 0) { // end of slider
            scope.enableButton("right", false);
        } else {
            scope.enableButton("right", true);
        }

    };

    MediaSlider.prototype.appendItems = function(inputArray){
        var scope = this,
            iArray = inputArray || [];
        scope.itemlist = scope.itemlist.concat(iArray);
        iArray.forEach(function(obj) {
            scope.renderItemContainer(obj);
        });
        if(scope.isMovingBoxSmall()){
            // disable both
            scope.enableButton("both", false);
        } else {
            // enable after checking the ends
            scope.checkEndsNEnbaleButtons();
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
                         .addClass("jqx-dr-image")
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