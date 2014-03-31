;(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'FunnelViz'
      , defaults;

    defaults = {
        compare:   true,
        breakdown: false,
        showBreakdownConversion: false,
        allowHighlight: true,
        events:    [],
        labels:    [],
        sections:  [],
        barColorName: 'blue'
    };

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

    function legendBar_onChanged (e, breakdown) {
        this.$chartEl.BarChartHTML('destroy');
        this.options.breakdown = Array.prototype.slice.call(breakdown);
        this.$chartEl.BarChartHTML(this.options);
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
            
            this.$barEl = $('<div class="funnel-viz-bar">');
            this.$chartEl  = $('<ul class="funnel-viz-chart">');

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
        },

        destroy: function () {
            var obj;
            
            obj = this.data('plugin_' + pluginName);

            this.$el.removeClass('funnel-viz');

            if (!this.$barEl.hasClass('no-breakdown')) {
                this.$legendEl.LegendBar('destroy');
            }
            this.$chartEl.BarChartHTML('destroy');
            
            this.$legendEl = this.$chartEl = void 0;
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