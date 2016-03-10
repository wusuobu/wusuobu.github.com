!function ($) {
    $.extend($.easing, {
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        }
    });
    $(function () {
        var vincent_chen = {
            "init": function () {
                this.create();
                var $parent = this,
                    $J_touch = $('.J_touch');
                $J_touch.on('click', function () {
                    var $this = $(this),
                        $next = $this.next();
                    $parent.scroll([$J_touch.next(), 'hide', 400, 'easeInOutBack', 'removeClass']);
                    if ($next.is(":visible")) {
                        $parent.scroll([$next, 'hide', 400, 'easeInOutBack', 'removeClass']);
                    } else {
                        $parent.scroll([$next, 'show', 1000, 'easeOutBounce', 'addClass']);
                    }
                });
            },
            "scroll": function (opts) {
                opts[0].stop().animate({
                    "height": opts[1]
                }, {
                    "duration": opts[2],
                    "queue": false,
                    "easing": opts[3],
                    "complete": function () {
                        opts[0][opts[4]]('cur');
                    }
                });
            },
            "create": function () {
                var tpl = '';
                $.each(nav_array, function (n, m) {
                    tpl +=  '<dl>' +
                                '<dt class="J_touch">' + m.title + '</dt>' +
                                '<dd>' +
                                    '<ul>';
                            $.each(m.items, function (i) {
                                tpl += '<li>' + ++i + ') <a target="_blank" href="' + this.link + '">' + this.name + '</a></li>';
                            });
                            tpl +=  '</ul>' +
                                '</dd>' +
                            '</dl>';
                });
                $('#wrapper').html(tpl);
            }
        };
        vincent_chen.init();
    });
}(jQuery);