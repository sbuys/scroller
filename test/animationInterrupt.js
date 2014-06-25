var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Mixed animation and static movement", function () {
    it("should truncate animated scrolling with static scrolling", function (done) {
        var scroller = new Scroller(null, { animationDuration : 900 });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 400, true);

        setTimeout(function() {
            scroller.scrollTo(500, 800);

            var values = scroller.getValues();
            assert.equal(values.left, 500);
            assert.equal(values.top, 800);
            assert.equal(values.zoom, 1);

            done();
        }, 500);
    });

    it("should truncate animated scrolling with static zooming", function (done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 400, true);

        setTimeout(function() {
            scroller.zoomTo(2);

            setTimeout(function () {
                var values = scroller.getValues();

                assert.notEqual(values.left, 300);
                assert.notEqual(values.top, 400);
                assert.equal(values.zoom, 2);

                done();
            }, 1000);

            var values = scroller.getValues();

            // Scroll position has not reached final position yet
            assert.notEqual(values.left, 300);
            assert.notEqual(values.top, 400);
            assert.equal(values.zoom, 2);

            // Scroll max has values based on final zoom
            var max = scroller.getScrollMax();
            assert.equal(max.left, 5000*2 - 1000);
            assert.equal(max.top, 5000*2 - 600);
        }, 500);
    });

    it("should truncate animated zooming with static zooming", function (done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.zoomTo(2, true);

        setTimeout(function() {
            scroller.zoomTo(3);

            setTimeout(function () {
                var values = scroller.getValues();
                assert.equal(values.zoom, 3);

                done();
            }, 1000);

            var values = scroller.getValues();
            assert.equal(values.zoom, 3);
        }, 500);
    });

    it("should truncate animated zooming with static scrolling", function (done) {
        var scroller = new Scroller(null, {
            animationDuration : 900,
            zooming : true
        });
        assert.equal(typeof scroller, "object");

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.zoomTo(2, true);

        setTimeout(function() {
            scroller.scrollTo(300, 400);

            setTimeout(function () {
                var values = scroller.getValues();

                assert.equal(values.left, 300);
                assert.equal(values.top, 400);
                assert.notEqual(values.zoom, 2);

                var max = scroller.getScrollMax();
                assert.notEqual(max.left, (5000 - 1000)*2);
                assert.notEqual(max.top, (5000 - 600)*2);

                done();
            }, 1000);

            var values = scroller.getValues();

            // Zoom level can not have reached final position yet
            assert.equal(values.left, 300);
            assert.equal(values.top, 400);
            assert.notEqual(values.zoom, 2);

            // Scroll max takes on different values because they are predicated
            // on current zoom
            var max = scroller.getScrollMax();
            assert.notEqual(max.left, (5000 - 1000)*2);
            assert.notEqual(max.top, (5000 - 600)*2);
        }, 500);
    });
});
