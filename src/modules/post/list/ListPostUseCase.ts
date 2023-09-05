import { AppDataSource } from "../../../data-source";
import PatternMaker from "../../../utils/PatternMaker";

import { Post } from "../entities/Post.entity";

import { iPostInfo, iListPostResponse } from "./interfaces/listPost.interface";

export class ListPostUseCase {
  constructor(private postRepository = AppDataSource.getRepository(Post)) {}

  async resolve(accountId: number): Promise<iListPostResponse> {
    try {
      const postsInfo: iPostInfo[] = await this.postRepository.query(
        `
          SELECT 
              p.id_post,
              p.content,
              p.created_at,
              a.id_account id_account,
              a.username account_username,
              a.profile_picture account_profile_picture,
              c.id_comment,
              c.comment_content,
              c.comment_created_at,
              c.comment_account_id,
              c.comment_account_username,
              c.comment_account_profile_picture
          FROM
              post p

          INNER JOIN (
              SELECT 
                  a.*
              FROM
                  account a
          ) a
          ON
              a.id_account = p.account_id

          LEFT JOIN (
              SELECT
                  c.post_id,
                  c.id_comment,
                  c.content comment_content,
                  c.created_at comment_created_at,
                  aa.id_account comment_account_id,
                  aa.username comment_account_username,
                  aa.profile_picture comment_account_profile_picture
              FROM
                  comment c

              INNER JOIN 
                  account aa
              ON 
                  c.account_id = aa.id_account
          ) c
          ON  
              c.post_id = p.id_post

          WHERE
              a.status = 1
          AND (
              a.id_account IN (
                  SELECT 
                      ff.following_account_id 
                  FROM 
                      follower_following ff
                  WHERE 
                      ff.follower_account_id = @0
              )
              OR 
                  a.id_account = @1
          )
        `,
        [accountId, accountId]
      );

      const posts = PatternMaker.post(postsInfo);

      return {
        status: "success",
        message: "Posts successfully listed!",
        code: 200,
        result: posts,
      };
    } catch (error) {
      return {
        status: "error",
        message: error.toString(),
        code: 500,
      };
    }
  }
}
