import {
  iListPostResult,
  iPostInfo,
} from "../modules/post/list/interfaces/listPost.interface";

class PatternMaker {
  post(postsInfo: iPostInfo[]): iListPostResult[] {
    const posts: iListPostResult[] = [];

    postsInfo.forEach((postInfo) => {
      const currentComment = {
        id_comment: postInfo.id_comment,
        content: postInfo.comment_content,
        created_at: postInfo.comment_created_at,
        account_id: postInfo.comment_account_id,
        account_username: postInfo.comment_account_username,
        account_profile_picture: postInfo.comment_account_profile_picture,
      };

      const postIndex = posts.findIndex(
        (post) => post.id_post === postInfo.id_post
      );

      if (postIndex === -1) {
        const currentPost = {
          id_post: postInfo.id_post,
          content: postInfo.content,
          created_at: postInfo.created_at,
          id_account: postInfo.id_account,
          account_username: postInfo.account_username,
          account_profile_picture: postInfo.account_profile_picture,
          comments: [currentComment],
        };

        posts.push(currentPost);
      } else {
        posts[postIndex].comments.push(currentComment);
      }
    });

    return posts;
  }
}

export default new PatternMaker();
