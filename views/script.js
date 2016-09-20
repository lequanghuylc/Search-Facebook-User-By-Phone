window.history.pushState("change for extension", "Extension", "/?fromext=true");
var loading = '<div class="windows8">';
	loading += '<div class="wBall" id="wBall_1">';
	loading += '<div class="wInnerBall"></div>';
	loading += '    </div>';
	loading += '<div class="wBall" id="wBall_2">';
	loading += '	<div class="wInnerBall"></div>';
	loading += '</div>';
	loading += '<div class="wBall" id="wBall_3">';
	loading += '	<div class="wInnerBall"></div>';
	loading += '</div>';
	loading += '<div class="wBall" id="wBall_4">';
	loading += '	<div class="wInnerBall"></div>';
	loading += '</div>';
	loading += '<div class="wBall" id="wBall_5">';
	loading += '	<div class="wInnerBall"></div>';
	loading += '</div>';
    loading += '</div>';
    
$("form").submit(function(e){
    e.preventDefault();
    $("#result").html(loading);
    $.post("/api/timkiem/" + $("#phone").val(), {
        cookieString: $("#cookie").val()
    },function(data){
        if(data.result !== "found"){
            $("#result").html("<h3 class='text-center'>Không tìm thấy</h3>");
        } else {
            $("#result").html("<h3 class='text-center'>Tìm kiếm thành công</h3>");
            $("#result").append("<h2 class='text-center'>"+ data.name + "</h2>");
            $("#result").append("<h4 class='text-center'> Số điện thoại: <strong>" + data.phone + "</strong></h4>");
            $("#result").append("<h4 class='text-center'> Facebook user ID: <strong>" + data.FBID + "</strong></h4>");
            $("#result").append("<h4 class='text-center'> <a target='_blank' href='https://www.facebook.com/profile.php?id=" + data.FBID + "'><button class='btn btn-danger'>Vào trang Profile</button></a></h4>");
        }
    });
});