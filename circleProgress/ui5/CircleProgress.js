sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/Control",
], function(
    $,
    Control
) {
    "use strict";

    var CircleProgress = Control.extend("sap.sme.anw.fin.common.control.CircleProgress", { metadata: {
        properties: {
            baseFontSize: { type: "int", defaultValue: 10 },
            progress: {type: "int", defaultValue: 0 }
        },
        aggregations: {
            
        },
        events: {
            
        }
    }, renderer: {
        render: function(rm, oCircle) {
            var id = oCircle.getId();

            rm.write("<div");
            rm.writeControlData(oCircle);
            rm.addClass("sap-anw-fin-circle-progress");
            rm.writeClasses();
            rm.writeAttribute("style", "font-size:" + oCircle.getBaseFontSize() + "px;");
            rm.write(">");

            rm.write("<div");
            rm.addClass("sap-anw-fin-circle-progress-inner");
            var iProgress = oCircle.getProgress();
            if(iProgress < 50) {
                rm.addClass("less-half");
            } else {
                rm.addClass("more-half");
            }
            rm.writeClasses();
            rm.writeAttribute("data-progress", iProgress);
            if (sap.ui.getCore().getConfiguration().getAccessibility()) {
                rm.writeAttribute("role", "valueHolder");
            }
            rm.write(">");

            rm.write('<div class="base"></div><div class="dynamic"></div><div class="mask"></div>');

            rm.write("</div></div>");
        }
    }});

    // CircleProgress.prototype.init = function(){
    //     var that = this;
        
    // };

    CircleProgress.prototype.onAfterRendering = function(){
        var iProgress = this.getProgress();
        var iDeg = (360 / 100) * iProgress;
        var $base = this.$().find(".base");
        // reset
        $base.css("transform", "rotate(0deg)");
        // for animation.
        setTimeout(function() {
            $base.css("transform", "rotate(" + iDeg + "deg)");
        }, 50);
        
    };

    return CircleProgress;
});
