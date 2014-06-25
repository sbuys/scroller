var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Overlapping animation", function (done) {
    it("should compose two scrolls", function (done) {
        var scroller = new Scroller(null, { animationDuration : 900 });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 400, true);

        setTimeout(function () {
            scroller.scrollTo(500, 800, true);

            setTimeout(function () {
                var values = scroller.getValues();

                assert.equal(values.left, 500);
                assert.equal(values.top, 800);
                assert.equal(values.zoom, 1);

                done();
            }, 1000);

            var values = scroller.getValues();
            assert.notEqual(values.left, 500);
            assert.notEqual(values.top, 800);
            assert.equal(values.zoom, 1);
        }, 500);
    });

    it("should interrupt scrolling with a zoom", function(done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 400, true);

        setTimeout(function() {
            scroller.zoomTo(2, true);

            setTimeout(function () {
                var values = scroller.getValues();

                assert.notEqual(values.left, 300);
                assert.notEqual(values.top, 400);
                assert.equal(values.zoom, 2);

                done()
            }, 1000);

            var values = scroller.getValues();

            // Scroll position has not finalized
            assert.notEqual(values.left, 300);
            assert.notEqual(values.top, 400);
            assert.notEqual(values.zoom, 2);

            // Scroll max values are based on final zoom
            var max = scroller.getScrollMax();
            assert.equal(max.left, 5000*2 - 1000);
            assert.equal(max.top, 5000*2 - 600);
        }, 500);
    });

    it("should compose two zooms", function(done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.zoomTo(2, true);

        setTimeout(function () {
            scroller.zoomTo(3, true);

            setTimeout(function () {
                var values = scroller.getValues();
                assert.equal(values.zoom, 3);
                done();
            }, 1000);

            var values = scroller.getValues();
            assert.notEqual(values.zoom, 2);
        }, 500);
    });

    it("should interrupt a zoom with a scroll", function(done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.zoomTo(2, true);

        setTimeout(function() {
            scroller.scrollTo(300, 400, true);
            setTimeout(function () {
                var values = scroller.getValues();

                // Zoom level has not finalized
                assert.equal(values.left, 300);
                assert.equal(values.top, 400);
                assert.notEqual(values.zoom, 2);

                done();
            }, 1000);

            var values = scroller.getValues();

            // Still animated
            assert.notEqual(values.left, 300);
            assert.notEqual(values.top, 400);
            assert.notEqual(values.zoom, 2);

            // Scroll max has different values because it is not based on final
            // zoom, but current zoom
            var max = scroller.getScrollMax();
            assert.equal(max.left, 5000*2 - 1000);
            assert.equal(max.top, 5000*2 - 600);
        }, 500);
    });
});
