"use client";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

// Request/Response types
interface QueryParams {
  folder?: string;
  search?: string;
}

interface PostData {
  author: string;
  type: "QUESTION" | "NOTE";
  summary: string;
  details: string;
  folders: string[];
  visibility: {
    scope: "CLASS" | "INDIVIDUAL";
    userIds: string[];
  };
}

interface PostUpdate {
  summary?: string;
  details?: string;
}

interface AnswerData {
  author: string;
  role: "STUDENT" | "INSTRUCTOR";
  body: string;
}

interface AnswerUpdate {
  body?: string;
}

interface DiscussionData {
  author: string;
  body: string;
  resolved: boolean;
}

interface DiscussionUpdate {
  body?: string;
  resolved?: boolean;
}

interface ReplyData {
  author: string;
  body: string;
}

interface FolderData {
  name: string;
}

export const PazzaClient = {
  getPosts: (courseId: string, folder?: string, search?: string) => {
    const queryParams = new URLSearchParams();
    if (folder) queryParams.append("folder", folder);
    if (search) queryParams.append("search", search);

    const url = `${HTTP_SERVER}/api/courses/${courseId}/pazza/posts${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;

    return fetch(url, { credentials: "include" }).then((res) => res.json());
  },

  getPost: (postId: string) =>
    fetch(`${HTTP_SERVER}/api/pazza/posts/${postId}`, {
      credentials: "include",
    }).then((res) => res.json()),

  createPost: (courseId: string, data: PostData) =>
    fetch(`${HTTP_SERVER}/api/courses/${courseId}/pazza/posts`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  updatePost: (postId: string, data: PostUpdate) =>
    fetch(`${HTTP_SERVER}/api/pazza/posts/${postId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  deletePost: (postId: string) =>
    fetch(`${HTTP_SERVER}/api/pazza/posts/${postId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json()),

  getAnswers: (postId: string) =>
    fetch(`${HTTP_SERVER}/api/pazza/posts/${postId}/answers`, {
      credentials: "include",
    }).then((res) => res.json()),

  createAnswer: (postId: string, data: AnswerData) =>
    fetch(`${HTTP_SERVER}/api/pazza/posts/${postId}/answers`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  updateAnswer: (answerId: string, data: AnswerUpdate) =>
    fetch(`${HTTP_SERVER}/api/pazza/answers/${answerId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  deleteAnswer: (answerId: string) =>
    fetch(`${HTTP_SERVER}/api/pazza/answers/${answerId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json()),

  getDiscussions: (postId: string) =>
    fetch(`${HTTP_SERVER}/api/pazza/posts/${postId}/discussions`, {
      credentials: "include",
    }).then((res) => res.json()),

  createDiscussion: (postId: string, data: DiscussionData) =>
    fetch(`${HTTP_SERVER}/api/pazza/posts/${postId}/discussions`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  updateDiscussion: (discussionId: string, data: DiscussionUpdate) =>
    fetch(`${HTTP_SERVER}/api/pazza/discussions/${discussionId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  deleteDiscussion: (discussionId: string) =>
    fetch(`${HTTP_SERVER}/api/pazza/discussions/${discussionId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json()),

  addReply: (discussionId: string, data: ReplyData) =>
    fetch(`${HTTP_SERVER}/api/pazza/discussions/${discussionId}/replies`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  updateReply: (discussionId: string, replyId: string, body: string) =>
    fetch(
      `${HTTP_SERVER}/api/pazza/discussions/${discussionId}/replies/${replyId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      }
    ).then((res) => res.json()),

  deleteReply: (discussionId: string, replyId: string) =>
    fetch(
      `${HTTP_SERVER}/api/pazza/discussions/${discussionId}/replies/${replyId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    ).then((res) => res.json()),

  getFolders: (courseId: string) =>
    fetch(`${HTTP_SERVER}/api/courses/${courseId}/pazza/folders`, {
      credentials: "include",
    }).then((res) => res.json()),

  createFolder: (courseId: string, data: FolderData) =>
    fetch(`${HTTP_SERVER}/api/courses/${courseId}/pazza/folders`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  updateFolder: (folderId: string, data: FolderData) =>
    fetch(`${HTTP_SERVER}/api/pazza/folders/${folderId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  deleteFolder: (folderId: string) =>
    fetch(`${HTTP_SERVER}/api/pazza/folders/${folderId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json()),
};
