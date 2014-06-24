var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Movement", function () {
    it("should follow scrolling", function() {
        var scroller = new Scroller();
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 500);

        var values = scroller.getValues();
        assert.equal(typeof values, "object");
        assert.equal(values.left, 300);
        assert.equal(values.top, 500);
        assert.equal(values.zoom, 1);
    });

    it("should follow zooming", function() {
        var scroller = new Scroller(null, { zooming : true });
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.zoomTo(2.45);

        var values = scroller.getValues();
        assert.equal(typeof values, "object");
        assert.equal(values.zoom, 2.45);
    });

    it("should follow composed zooming and scrolling", function() {
        var scroller = new Scroller(null, { zooming : true });
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.zoomTo(1.7);
        scroller.scrollTo(300, 500);

        var values = scroller.getValues();
        assert.equal(typeof values, "object");
        assert.equal(values.left, 300);
        assert.equal(values.top, 500);
        assert.equal(values.zoom, 1.7);
    });

    it("should follow composed scrolling and zooming", function () {
        var scroller = new Scroller(null, { zooming : true });
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 500);
        var coordinates = scroller.getPoint(1200, 800);

        scroller.zoomTo(2.0, false, 1200-300, 800-500);
        var newCoordinates = scroller.getPoint(2400, 1600);

        assert.equal(newCoordinates.left, coordinates.left);
        assert.equal(newCoordinates.top, coordinates.top);
    });

    it("should follow composed scrolling and zooming without an explicit zoom origin", function() {
        var scroller = new Scroller(null, { zooming : true });
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 500);
        scroller.zoomTo(1.7);

        var originLeft = 1000 / 2;
        var originTop = 600 / 2;

        // Compute center zooming
        var newLeft = ((originLeft + 300) * 1.7) - originLeft;
        var newTop = ((originTop + 500) * 1.7) - originTop;

        var values = scroller.getValues();
        assert.equal(typeof values, "object");
        assert.equal(values.left, newLeft);
        assert.equal(values.top, newTop);
        assert.equal(values.zoom, 1.7);
    });

    it("should compose scrolling, zooming, and then scrolling", function() {
        var scroller = new Scroller(null, { zooming : true });
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 500);
        scroller.zoomTo(1.7);
        scroller.scrollTo(500, 700);

        var values = scroller.getValues();
        assert.equal(typeof values, "object");
        assert.equal(values.left, 500);
        assert.equal(values.top, 700);
        assert.equal(values.zoom, 1.7);
    });
});
