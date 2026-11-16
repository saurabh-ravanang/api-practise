import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../axios/axios";

export function useFetchPosts() {
    const fetchPosts = async () => {
        const res = await api.get("/posts");
        return res.data;
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    return {
        data: data ?? [],
        isLoading,
        isError,
        error,
        refetch,
    };
}

export function useAddPost() {
    const queryClient = useQueryClient();

    const addPost = async (postData) => {
        const res = await api.post("/posts", postData);
        return res.data;
    };

    return useMutation({
        mutationFn: addPost,

        onSuccess: (newPost) => {
            queryClient.setQueryData(["posts"], (oldData = []) => [
                newPost,
                ...oldData,
            ]);
            // alert("dlbdskjbds")
        },
    });
}

export function useUpdatePost() {
    const queryClient = useQueryClient();
    const updateData = async ({ id, postData }) => {
        const res = await api.put(`/posts/${id}`, postData);
        return res.data;
    }
    return useMutation({
        mutationFn: updateData,
        onSuccess: (updatedPost) => {
            queryClient.setQueryData(["posts"], (oldData = []) =>
                oldData.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                )
            );
        }
    });
}