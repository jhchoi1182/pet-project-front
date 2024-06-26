"use client";

import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setPostLikes } from "@/stores/modules/postSlice";
import { Post } from "@/types/model/post";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetPostQuery(postId: number) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const result = useQuery<Post>({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => postApi.getPost(postId),
  });

  const { data } = result;

  useEffect(() => {
    if (!data) return;
    dispatch(setPostLikes(data.likes));
    const currentPage = sessionStorage.getItem("currentPage") ?? 1;
    const selectedCategory = sessionStorage.getItem("selectedCategory") ?? "전체";
    const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, selectedCategory, +currentPage]);
    const updatedPosts = prevPosts?.content?.map((post) => (post.postId === postId ? { ...post, category: data?.category, title: data?.title } : post));
    queryClient.setQueryData([QUERY_KEY.posts, selectedCategory, +currentPage], { ...prevPosts, content: updatedPosts });
  }, [data]);

  return result;
}

export default useGetPostQuery;
