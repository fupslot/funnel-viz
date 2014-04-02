;(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'FunnelViz'
      , defaults;

    defaults = {
        sections:  [],
    };

    function getParentSize (el) {
        var parent;
        parent = el.parent();
        return {
            width: parent.innerWidth(),
            height: parent.innerHeight()
        };
    }

    function getMargin (container, widget) {
        var deltaW, deltaH;

        deltaW = container.width  - widget.width;
        deltaH = container.height - widget.height;

        deltaW = deltaW > 0 ? deltaW : 0;
        deltaH = deltaH > 0 ? deltaH : 0;

        return {
            'top'   : deltaH / 2,
            'bottom': deltaH / 2,
            'left'  : deltaW / 2,
            'right' : deltaW / 2
        };
    }

    function _pluck(collection, property) {
      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = collection[index][property];
        }
      }
      return result;
    }

    function _getLegendBarSettings (options) {
        var result;
        if ($.isArray(options.breakdown)) {
            result = {names:[],checked:[]};
            result.names = options.sections.map(function (section) {
                return section.name;
            });

            result.checked = Array.prototype.slice.call(options.breakdown);
        }
        return result;
    }

    function legendBar_onChanged (e, legend) {
        var isBreakdown;
        this.$chartEl.BarChartHTML('destroy');

        isBreakdown = legend.length !== 0;

        this.options.breakdown    = isBreakdown && _pluck(legend, 'idx');
        this.options.colorIndexes = isBreakdown && _pluck(legend, 'ci');

        this.$chartEl.BarChartHTML(this.options);
        this.$el.trigger('breakdown', legend);
    }

    function Plugin (el, options) {
        // Save the element reference, both as a jQuery
        // reference and a normal reference
        this.el  = el;
        this.$el = $(el);

        this.options   = options;
        this._defaults = defaults;
        this._name     = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var el, legendBarSettings;

            el = this.$el;
            el.hide();
            el.addClass('funnel-viz');
            
            this.$barEl   = $('<div class="funnel-viz-bar">');
            this.$chartEl = $('<ul class="funnel-viz-chart">');

            el.append(this.$barEl, this.$chartEl);
            
            // 
            legendBarSettings = _getLegendBarSettings(this.options);
            if (legendBarSettings !== void 0) {
                this.$legendEl = $('<div>');
                // Append a Legend to a Bar
                this.$barEl.append(this.$legendEl);
                this.$legendEl.LegendBar(legendBarSettings);
                this.$legendEl.on('onChanged', $.proxy(legendBar_onChanged, this));
            }
            else {
                this.$barEl.addClass('no-breakdown');
            }

            this.$chartEl.BarChartHTML(this.options);

            el.css('display', 'inline-block');

            this.resize();
        },

        resize: function (containerSize) {
            var widgetSize
              , margin;
            
            this.$el.css('margin', '');

            if ($.isEmptyObject(containerSize)) containerSize = getParentSize(this.$el);
            widgetSize = {
                width: this.$el.outerWidth(),
                height: this.$el.outerHeight()
            };
            
            // DOM isn't constructed yet.
            if (widgetSize.width == 0 && widgetSize.height == 0) return;

            margin = getMargin(containerSize, widgetSize);

            this.$el.css({
                'margin-left'  : margin.left   + 'px',
                'margin-right' : margin.right  + 'px',
                'margin-top'   : margin.top    + 'px',
                'margin-bottom': margin.bottom + 'px',
            });
        },

        destroy: function () {
            this.$el
                .off('breakdown')
                .removeClass('funnel-viz')
                .css('margin', '');

            if (!this.$barEl.hasClass('no-breakdown')) {
                this.$legendEl.LegendBar('destroy');
            }
            this.$chartEl.BarChartHTML('destroy');
            
            this.$legendEl = this.$chartEl = void 0;
            this.$el.removeData('plugin_'+pluginName);
            this.$el.children().remove();
        }
    };

    $.fn[pluginName] = function (method) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('plugin_'+pluginName)
                , options = $.extend({}, defaults, $.isPlainObject(method) && method);

            if (!data) $this.data('plugin_'+pluginName, (data = new Plugin(this, options)));
            if (typeof method == 'string') data[method].apply(data, Array.prototype.slice.call(args, 1));
        });
    };
})(jQuery, window, document);