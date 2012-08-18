STO.Views.selectGift = new (Backbone.View.extend({
    el: "#selectGift",
    gifts: ["http://tinyurl.com/36j3yt", "http://tinyurl.com/236dxr", "http://tinyurl.com/ys7q3z", "http://tinyurl.com/2xhsco", "http://tinyurl.com/yrq6my", "http://tinyurl.com/2gctow", "http://tinyurl.com/2ly8m7", "http://tinyurl.com/32kn67", "http://tinyurl.com/2ktn7c", "http://tinyurl.com/2qe27a", "http://tinyurl.com/2e2a6h", "http://tinyurl.com/yr9ep7", "http://tinyurl.com/2gctow", "http://tinyurl.com/yo6amk", "http://tinyurl.com/23zrxy", "http://tinyurl.com/2zjrvz", "http://tinyurl.com/yt938y", "http://tinyurl.com/2hgcbp", "http://tinyurl.com/yu5942", "http://tinyurl.com/yq5w5e", "http://tinyurl.com/23q3nq", "http://tinyurl.com/24gr2x", "http://tinyurl.com/ypq6ts", "http://tinyurl.com/yofeja", "http://tinyurl.com/23ruto", "http://tinyurl.com/2bqt3c", "http://tinyurl.com/2cnywd", "http://tinyurl.com/2xazlw", "http://tinyurl.com/2ylawh", "http://tinyurl.com/2ag3pr", "http://tinyurl.com/ysf2ra", "http://tinyurl.com/2cy5r4"],
    initialize: function(){
        STO.getDecoration().prependTo(this.el);
        var html = [];
        $.each(this.gifts, function(){
            html.push("<img src = '" + this + "'>");
        });
        this.$el.find(".carousel-inner").html(html.join(" "));
        var me = this;
        this.$el.find(".carousel-inner>img:first").load(function(){
            me.$el.find(".carousel-inner").width((me.gifts.length + 2) * me.$el.find(".carousel-inner>img").outerWidth());
        });
        
        this.$el.find(".open-time").timepicker();
        this.$el.find(".open-date").datepicker({
            format: "mm/dd/yyyy",
            autoclose: true
        });
    },
    
    events: {
        "selectGift": function(){
            this.$el.find(".giftToFriend").attr("src", STO.giftConfig.get("friend").pic_square);
            this.$el.find(".open-date").data("date", STO.giftConfig.getDateString()).datepicker('update').find("input").val(STO.giftConfig.getDateString());
        },
        "changeDate .open-date": function(ev){
            STO.giftConfig.set("date", ev.date);
        },
        "click .giftCarousel img": function(e){
            var img = $(e.target);
            STO.giftConfig.set("gift", img.attr("src"));
            $(".giftCarousel img.selected").removeClass("selected");
            img.addClass("selected");
        },
        
        "click .moreoptions": function(){
            STO.giftConfig.set("time", this.$el.find(".open-time").val());
            STO.go("configure");
            return false;
        },
        
        "click .pickFriendAgain": function(){
            STO.go("selectFriend");
            return false;
        },
        
        "click .postToFacebook": function(){
            if (!STO.giftConfig.get("gift")) {
                alert("Select a gift");
                return;
            };
            STO.giftConfig.set("time", this.$el.find(".open-time").val());
            STO.go("send");
            return false;
        }
    }
}))();