$(document).ready(function() {

    function addComment(msg) {
        $.ajax({
            type: "POST",
            url: "code.php",
            data: { msg: msg, add_comment: true },
            success: function(response) {
                $('#comment-list').append('<div class="comment"><p>' + msg + '</p> <button class="reply-btn">Reply</button> <button class="like-btn">Like <span class="like-count">0</span></button> <div class="nested-comment-list"></div></div>');
                $('.form-control').val("");
            }
        });
    }

    function addReply(nestedComment, replyButton) {
        $.ajax({
            type: "POST",
            url: "code.php",
            data: { msg: nestedComment, add_reply: true },
            success: function(response) {
                var nestedCommentList = $(replyButton).parent().siblings('.nested-comment-list');
                nestedCommentList.append('<div class="nested-comment"><p>' + nestedComment + '</p></div>');
                $(replyButton).prev('.nested-comment-text').remove(); 
                $(replyButton).remove(); 
            }
        });
    }

    function handleLike(likeButton) {
        var likeCountSpan = $(likeButton).find('.like-count');
        var currentCount = parseInt(likeCountSpan.text());
        likeCountSpan.text(currentCount + 1);
    }
   
    $('.add_comment_btn').click(function(e) {
        e.preventDefault();
        var msg = $('.form-control').val().trim();
        if (msg == "") {
            $("#error-status").text('Please enter a comment').show();
        } else {
            $("#error-status").hide();
            addComment(msg);
        }
    });

    $(document).on('click', '.like-btn', function() {
        handleLike(this);
    });

    $(document).on('click', '.reply-btn', function() {
        var nestedCommentList = $(this).siblings('.nested-comment-list');
        if (nestedCommentList.children('textarea').length == 0) {
            nestedCommentList.append('<textarea class="nested-comment-text" rows="2"></textarea> <button class="nested-comment-btn">Reply</button>');
        }
    });

    $(document).on('click', '.nested-comment-btn', function() {
        var nestedComment = $(this).prev('.nested-comment-text').val().trim();
        if (nestedComment == '') {
            alert('Please enter a valid reply');
        } else {
            addReply(nestedComment, this);
        }
    });
});
       
    
