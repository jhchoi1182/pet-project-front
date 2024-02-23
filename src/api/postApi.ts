import { instance } from "../config/axiosConfig";

export const postApi = {
  getPosts: async () => {
    const { data } = await instance.get("/post");
    return data?.result;
  },
  getPost: async (postId: number) => {
    const { data } = await instance.get(`/post/${postId}`);
    return data?.result;
  },
  create: async (title: string, contents: string) => {
    const data = await instance.post("/post", { title, contents });
    return data;
  },
  update: async (postId: number, contents: string, dueDate: string) => {
    const data = await instance.put(`/post/${postId}`, { contents, dueDate });
    return data;
  },
  delete: async (postId: number) => {
    const data = await instance.delete(`/post/${postId}`);
    return data;
  },
};
