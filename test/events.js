var Scroller = require('../lib/Scroller');
var assert = require('assert');
var numericEqual = require('../lib/numericEqual');

describe("Events", function () {
    it("should induce scrolling via Move and Acceleration", function () {
        var scroller = new Scroller(null, { animationDuration : 900 });
        scroller.setDimensions(1000, 600, 5000, 5000);

        var now = 0;

        scroller.doTouchStart([{
            pageX: 500,
            pageY: 700
        }], now+=40);

        scroller.doTouchMove([{
            pageX: 490,
            pageY: 690
        }], now+=40);

        scroller.doTouchMove([{
            pageX: 470,
            pageY: 670
        }], now+=40);

        scroller.doTouchEnd(now);

        var values = scroller.getValues();
        assert.equal(values.left, 20);
        assert.equal(values.top, 20);

        setTimeout(function() {
            var values = scroller.getValues();
            assert.equal(Math.round(values.left), 185);
            assert.equal(Math.round(values.top), 185);
            start();
        }, 1000);
    });

    it("should induce zooming via Wheel", function () {
        var scroller = new Scroller(null, { zooming : true });
        scroller.setDimensions(1000, 600, 5000, 5000);

        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);
        assert.equal(values.zoom, 1);

        scroller.doMouseZoom(3, null, 0, 0);

        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);
        assert.ok(numericEqual(values.zoom, 0.97));

        scroller.doMouseZoom(-3, null, 0, 0);

        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);
        assert.ok(numericEqual(values.zoom, 0.97*1.03));

        // Reset
        scroller.zoomTo(1);
        scroller.scrollTo(300, 400);

        var coordinates = scroller.getPoint(300+200, 400+200);
        scroller.doMouseZoom(-3, null, 200, 200);
        scroller.doMouseZoom(-3, null, 200, 200);
        scroller.doMouseZoom(-3, null, 200, 200);
        scroller.doMouseZoom(-3, null, 200, 200);

        var k = 1.03 * 1.03 * 1.03 * 1.03;
        var newCoordinates = scroller.getPoint(k*(300+200), k*(400+200));
        assert.ok(numericEqual(coordinates.left, newCoordinates.left));
        assert.ok(numericEqual(coordinates.top, newCoordinates.top));
        assert.ok(numericEqual(values.zoom, 1.03 * 1.03 * 1.03 * 1.03));
    });

/* Unimplemented
    it("should induce zooming via Touch", function () {
        var scroller = new Scroller(null, { zooming : true });
        scroller.setDimensions(1000, 600, 5000, 5000);

        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);
        assert.equal(values.zoom, 1);

        var now = 0;

        var first = {
            pageX: 250,
            pageY: 300
        };

        var second = {
            pageX: 350,
            pageY: 400
        };

        // Connect first finger
        scroller.doTouchStart([first], now+=20);

        // Connect second finger
        scroller.doTouchStart([first, second], now+=20);

        // Move fingers by 20px to middle (equal movement)
        first.pageX = 270;
        first.pageY = 320;
        second.pageX = 330;
        second.pageY = 380;

        scroller.doTouchMove([first, second], now+=20);

        scroller.doTouchEnd(now);

        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);
        assert.equal(values.zoom, 1);
    });
*/
});
