var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Animation", function () {
    it("should scroll to the sought position", function (done) {
        var scroller = new Scroller(null, { animationDuration : 900 });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 400, true);

        setTimeout(function() {
            var values = scroller.getValues();
            assert.equal(values.left, 300);
            assert.equal(values.top, 400);
            assert.equal(values.zoom, 1);
            done();
        }, 1000);
    });

    it("should zoom to the sought state", function (done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });

        assert.equal(typeof scroller, "object");
        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.zoomTo(2, true);

        setTimeout(function() {
            var values = scroller.getValues();

            // zooming is centered automatically
            assert.equal(values.left, 500);
            assert.equal(values.top, 300);
            assert.equal(values.zoom, 2);

            done();
        }, 1000);
    });

    it("should compose scrolling and zooming", function(done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });

        assert.equal(typeof scroller, "object");
        scroller.setDimensions(1000, 600, 5000, 5000);

        var max = scroller.getScrollMax();
        assert.equal(max.left, 5000-1000);
        assert.equal(max.top, 5000-600);

        scroller.scrollTo(300, 400, true, 2);

        setTimeout(function() {
            var values = scroller.getValues();

            assert.equal(values.left, 600);
            assert.equal(values.top, 800);
            assert.equal(values.zoom, 2);

            var max = scroller.getScrollMax();
            assert.equal(max.left, (5000 - 1000)*2);
            assert.equal(max.top, (5000 - 600)*2);

            done();
        }, 1000);
    });
});
