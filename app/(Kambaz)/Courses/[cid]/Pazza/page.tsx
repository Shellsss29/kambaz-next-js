"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import RequireLogin from "../../../requireLogin";
import { PazzaClient } from "./client";
import TiptapEditor from "./components/Editor/TipTapEditor";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ---------- Types ----------
type PostType = "QUESTION" | "NOTE";

interface Post {
  _id: string;
  summary: string;
  details: string;
  type: PostType;
  author?: string;
  authorId?: string;
  folders?: string[];
  createdAt?: string;
  viewsCount?: number;
}

interface Answer {
  _id: string;
  author: string;
  authorId?: string;
  role: "STUDENT" | "INSTRUCTOR";
  body: string;
  createdAt?: string;
}

interface DiscussionReply {
  _id: string;
  author: string;
  authorId?: string;
  body: string;
  createdAt?: string;
}

interface Discussion {
  _id: string;
  author: string;
  authorId?: string;
  body: string;
  createdAt?: string;
  resolved: boolean;
  replies?: DiscussionReply[];
}

interface Folder {
  _id: string;
  name: string;
}

// ---------- Small helpers ----------
const formatDateTime = (iso?: string) =>
  iso ? new Date(iso).toLocaleString() : "";

const isInstructorRole = (role?: string | null) =>
  role === "FACULTY" || role === "TA" || role === "ADMIN";

// ---------- AnswerCard (for both student & instructor answers) ----------
function AnswerCard({
  answer,
  currentUserId,
  canManage,
  onSave,
  onDelete,
}: {
  answer: Answer;
  currentUserId?: string;
  canManage: boolean;
  onSave: (id: string, body: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(answer.body);

  const showActions = canManage || currentUserId === answer.authorId;

  return (
    <div className="border rounded bg-white p-2 mb-2 small">
      <div className="d-flex justify-content-between mb-1">
        <div className="text-muted">
          <strong>{answer.author}</strong> • {formatDateTime(answer.createdAt)}
        </div>
        {showActions && (
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-xs btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Actions
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(answer._id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {!editing && <div dangerouslySetInnerHTML={{ __html: answer.body }} />}

      {editing && (
        <div>
          <TiptapEditor value={body} onChange={setBody} />
          <div className="mt-2 d-flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={async () => {
                await onSave(answer._id, body);
                setEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setBody(answer.body);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- ReplyCard ----------
function ReplyCard({
  reply,
  currentUserId,
  canManage,
  onSave,
  onDelete,
}: {
  reply: DiscussionReply;
  currentUserId?: string;
  canManage: boolean;
  onSave: (id: string, body: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(reply.body);
  const showActions = canManage || currentUserId === reply.authorId;

  return (
    <div className="mb-2 small">
      <div className="d-flex justify-content-between">
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          <strong>{reply.author}</strong> • {formatDateTime(reply.createdAt)}
        </div>
        {showActions && (
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-xs btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Actions
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(reply._id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {!editing && <div dangerouslySetInnerHTML={{ __html: reply.body }} />}

      {editing && (
        <div className="mt-1">
          <TiptapEditor value={body} onChange={setBody} />
          <div className="mt-2 d-flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={async () => {
                await onSave(reply._id, body);
                setEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setBody(reply.body);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- DiscussionThread ----------
function DiscussionThread({
  discussion,
  currentUserId,
  isInstructor,
  submitReply,
  toggleResolved,
  updateDiscussion,
  deleteDiscussion,
  updateReply,
  deleteReply,
}: {
  discussion: Discussion;
  currentUserId?: string;
  isInstructor: boolean;
  submitReply: (
    discussionId: string,
    body: string,
    cb: () => void
  ) => Promise<void>;
  toggleResolved: (discussion: Discussion) => Promise<void>;
  updateDiscussion: (id: string, body: string) => Promise<void>;
  deleteDiscussion: (id: string) => Promise<void>;
  updateReply: (
    discussionId: string,
    replyId: string,
    body: string
  ) => Promise<void>;
  deleteReply: (discussionId: string, replyId: string) => Promise<void>;
}) {
  const [replyBody, setReplyBody] = useState("");
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(discussion.body);

  const canManage = isInstructor || currentUserId === discussion.authorId;

  return (
    <div className="border rounded bg-white mb-3 p-3 small">
      <div className="d-flex justify-content-between mb-1">
        <div className="text-muted">
          <strong>{discussion.author}</strong> •{" "}
          {formatDateTime(discussion.createdAt)}
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className={
              "btn btn-xs px-2 py-0 border " +
              (discussion.resolved
                ? "btn-success text-white"
                : "btn-light text-dark")
            }
            style={{ fontSize: "0.7rem" }}
            onClick={() => toggleResolved(discussion)}
          >
            {discussion.resolved ? "Resolved" : "Unresolved"}
          </button>
          {canManage && (
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-xs btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Actions
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => deleteDiscussion(discussion._id)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {!editing && (
        <div
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: discussion.body }}
        />
      )}

      {editing && (
        <div className="mb-2">
          <TiptapEditor value={editBody} onChange={setEditBody} />
          <div className="mt-2 d-flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={async () => {
                await updateDiscussion(discussion._id, editBody);
                setEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setEditBody(discussion.body);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      <div className="ms-3 border-start ps-3 mb-2">
        {discussion.replies?.map((r) => (
          <ReplyCard
            key={r._id}
            reply={r}
            currentUserId={currentUserId}
            canManage={isInstructor}
            onSave={(replyId, body) =>
              updateReply(discussion._id, replyId, body)
            }
            onDelete={(replyId) => deleteReply(discussion._id, replyId)}
          />
        ))}
      </div>

      {/* Reply editor */}
      {currentUserId && (
        <div>
          <TiptapEditor
            value={replyBody}
            onChange={setReplyBody}
            height="120px"
          />
          <button
            className="btn btn-sm btn-primary mt-2"
            onClick={() =>
              submitReply(discussion._id, replyBody, () => setReplyBody(""))
            }
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- MAIN EXPORT ----------
export default function PiazzaPage() {
  return (
    <RequireLogin>
      <PiazzaPageInternal />
    </RequireLogin>
  );
}

// ---------- Internal page ----------
function PiazzaPageInternal() {
  const { cid } = useParams();
  const router = useRouter();
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  // folders / posts
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [search, setSearch] = useState("");

  // layout
  const [showSidebar, setShowSidebar] = useState(true);
  const [mode, setMode] = useState<"glance" | "view" | "new">("glance");

  // new post state
  const [postType, setPostType] = useState<PostType>("QUESTION");
  const [postScope, setPostScope] = useState<"CLASS" | "INDIVIDUAL">("CLASS");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newPostFolders, setNewPostFolders] = useState<string[]>([]);
  const [newSummary, setNewSummary] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newErrors, setNewErrors] = useState<Record<string, string>>({});

  // answers & discussions
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [studentAnswerBody, setStudentAnswerBody] = useState("");
  const [instructorAnswerBody, setInstructorAnswerBody] = useState("");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussionText, setNewDiscussionText] = useState("");

  // post editing
  const [editingPost, setEditingPost] = useState(false);
  const [editSummary, setEditSummary] = useState("");
  const [editDetails, setEditDetails] = useState("");

  // ----- Loaders -----
  useEffect(() => {
    PazzaClient.getFolders(cid as string)
      .then(setFolders)
      .catch(console.error);
  }, [cid]);

  const loadPosts = useCallback(() => {
    PazzaClient.getPosts(
      cid as string,
      selectedFolder || undefined,
      search || undefined
    )
      .then((data: Post[]) => {
        setPosts(data);
        if (selectedPost) {
          const updated = data.find((p) => p._id === selectedPost._id);
          if (!updated) {
            setSelectedPost(null);
            setMode("glance");
          } else {
            setSelectedPost(updated);
          }
        }
      })
      .catch(console.error);
  }, [cid, selectedFolder, search, selectedPost]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const loadAnswers = useCallback((postId?: string) => {
    if (!postId) return setAnswers([]);
    PazzaClient.getAnswers(postId).then(setAnswers).catch(console.error);
  }, []);

  const loadDiscussions = useCallback((postId?: string) => {
    if (!postId) return setDiscussions([]);
    PazzaClient.getDiscussions(postId)
      .then(setDiscussions)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedPost) {
      loadAnswers(selectedPost._id);
      loadDiscussions(selectedPost._id);
      setEditSummary(selectedPost.summary);
      setEditDetails(selectedPost.details);
    }
  }, [selectedPost, loadAnswers, loadDiscussions]);

  // ----- Group posts like Piazza -----
  const groupedPosts = useMemo(() => {
    const result: Record<string, Post[]> = {};
    const now = new Date();

    const weekLabel = (d: Date) => {
      const day = d.getDay();
      const diffToMonday = (day + 6) % 7;
      const monday = new Date(d);
      monday.setDate(d.getDate() - diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      const mstr = `${monday.getMonth() + 1}/${monday.getDate()}`;
      const sstr = `${sunday.getMonth() + 1}/${sunday.getDate()}`;
      return `${mstr} - ${sstr}`;
    };

    posts.forEach((p) => {
      const created = p.createdAt ? new Date(p.createdAt) : now;
      const diffDays = Math.floor(
        (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      );
      let key: string;
      if (diffDays === 0) key = "TODAY";
      else if (diffDays === 1) key = "YESTERDAY";
      else key = weekLabel(created);
      if (!result[key]) result[key] = [];
      result[key].push(p);
    });

    Object.values(result).forEach((arr) =>
      arr.sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      })
    );
    return result;
  }, [posts]);

  // Guard MUST be after all hooks
  if (!currentUser) {
    // RequireLogin should handle this, but TS needs a guard
    return null;
  }

  const role = currentUser.role;
  const isInstructor = isInstructorRole(role);
  const isStudent = role === "STUDENT";

  // ----- New Post helpers -----
  const toggleNewPostFolder = (name: string) => {
    setNewPostFolders((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const validateNewPost = () => {
    const errs: Record<string, string> = {};
    if (!newSummary.trim()) errs.summary = "Summary is required";
    if (newSummary.length > 100)
      errs.summary = "Summary must be at most 100 characters";
    if (
      !newDetails ||
      newDetails.trim() === "" ||
      newDetails === "<p></p>" ||
      newDetails === "<p><br></p>"
    )
      errs.details = "Details are required";
    if (newPostFolders.length === 0)
      errs.folders = "Select at least one folder";
    setNewErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const createPost = async () => {
    if (!validateNewPost()) return;

    await PazzaClient.createPost(cid as string, {
      author: currentUser._id,
      type: postType,
      summary: newSummary,
      details: newDetails,
      folders: newPostFolders,
      visibility: {
        scope: postScope,
        userIds: selectedUsers,
      },
    });

    setNewSummary("");
    setNewDetails("");
    setNewPostFolders([]);
    setSelectedUsers([]);
    setPostScope("CLASS");
    setMode("glance");
    loadPosts();
  };

  // ----- Answers -----
  const studentAnswers = answers.filter((a) => a.role === "STUDENT");
  const instructorAnswers = answers.filter((a) => a.role === "INSTRUCTOR");

  const submitStudentAnswer = async () => {
    if (!isStudent || !selectedPost) return;
    if (
      !studentAnswerBody ||
      studentAnswerBody === "<p></p>" ||
      studentAnswerBody === "<p><br></p>"
    )
      return;

    await PazzaClient.createAnswer(selectedPost._id, {
      author: currentUser._id,
      role: "STUDENT",
      body: studentAnswerBody,
    });

    setStudentAnswerBody("");
    loadAnswers(selectedPost._id);
  };

  const submitInstructorAnswer = async () => {
    if (!isInstructor || !selectedPost) return;
    if (
      !instructorAnswerBody ||
      instructorAnswerBody === "<p></p>" ||
      instructorAnswerBody === "<p><br></p>"
    )
      return;

    await PazzaClient.createAnswer(selectedPost._id, {
      author: currentUser._id,
      role: "INSTRUCTOR",
      body: instructorAnswerBody,
    });

    setInstructorAnswerBody("");
    loadAnswers(selectedPost._id);
  };

  const updateAnswer = async (id: string, body: string) => {
    await PazzaClient.updateAnswer(id, { body });
    if (selectedPost) loadAnswers(selectedPost._id);
  };

  const deleteAnswer = async (id: string) => {
    await PazzaClient.deleteAnswer(id);
    if (selectedPost) loadAnswers(selectedPost._id);
  };

  // ----- Discussions -----
  const submitDiscussion = async () => {
    if (!selectedPost) return;
    if (
      !newDiscussionText ||
      newDiscussionText === "<p></p>" ||
      newDiscussionText === "<p><br></p>"
    )
      return;

    await PazzaClient.createDiscussion(selectedPost._id, {
      author: currentUser._id,
      body: newDiscussionText,
      resolved: false,
    });

    setNewDiscussionText("");
    loadDiscussions(selectedPost._id);
  };

  const submitReply = async (
    discussionId: string,
    body: string,
    cb: () => void
  ) => {
    if (!body || body === "<p></p>" || body === "<p><br></p>" || !selectedPost)
      return;
    await PazzaClient.addReply(discussionId, {
      author: currentUser._id,
      body,
    });
    cb();
    loadDiscussions(selectedPost._id);
  };

  const toggleResolved = async (d: Discussion) => {
    await PazzaClient.updateDiscussion(d._id, { resolved: !d.resolved });
    if (selectedPost) loadDiscussions(selectedPost._id);
  };

  const updateDiscussion = async (id: string, body: string) => {
    await PazzaClient.updateDiscussion(id, { body });
    if (selectedPost) loadDiscussions(selectedPost._id);
  };

  const deleteDiscussion = async (id: string) => {
    await PazzaClient.deleteDiscussion(id);
    if (selectedPost) loadDiscussions(selectedPost._id);
  };

  const updateReply = async (
    discussionId: string,
    replyId: string,
    body: string
  ) => {
    await PazzaClient.updateReply(discussionId, replyId, body);
    if (selectedPost) loadDiscussions(selectedPost._id);
  };

  const deleteReply = async (discussionId: string, replyId: string) => {
    await PazzaClient.deleteReply(discussionId, replyId);
    if (selectedPost) loadDiscussions(selectedPost._id);
  };

  // ----- Post editing -----
  const canEditPost =
    selectedPost && (isInstructor || currentUser._id === selectedPost.authorId);

  const savePostEdits = async () => {
    if (!selectedPost) return;
    await PazzaClient.updatePost(selectedPost._id, {
      summary: editSummary,
      details: editDetails,
    });
    setEditingPost(false);
    loadPosts();
  };

  const totalPosts = posts.length;
  const totalStudentResponses = studentAnswers.length;
  const totalInstructorResponses = instructorAnswers.length;

  return (
    <div className="d-flex flex-column h-100" style={{ minHeight: "0" }}>
      <div
        className="d-flex align-items-center px-3 py-2 text-white"
        style={{ backgroundColor: "#476b87" }}
      >
        <div className="fw-bold me-3" style={{ fontSize: "1.3rem" }}>
          pazza
        </div>
        <div className="fw-semibold me-4">{String(cid)}</div>

        <div className="d-flex align-items-center gap-3 flex-grow-1 small">
          <span className="fw-bold text-decoration-underline">Q &amp; A</span>
          <span className="text-white-50">Resources</span>
          <span className="text-white-50">Statistics</span>
          <button
            type="button"
            className={
              "btn btn-link btn-sm text-decoration-none " +
              (isInstructor ? "text-white" : "text-white-50")
            }
            disabled={!isInstructor}
            onClick={() =>
              isInstructor && router.push(`/Courses/${cid}/Pazza/ManageClass`)
            }
          >
            Manage Class
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 small">
          <div
            className="rounded-circle bg-light"
            style={{ width: 26, height: 26 }}
          />
          <span>
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </div>
      </div>

      <div className="d-flex align-items-center px-3 py-1 border-bottom bg-light small">
        <div
          className="d-flex align-items-center me-3"
          style={{ cursor: "pointer" }}
        >
          <span>LIVE Q&amp;A</span>
        </div>

        <div
          className="d-flex align-items-center me-3"
          style={{ cursor: "pointer" }}
        >
          <span>Drafts</span>
        </div>
        {folders.map((f) => (
          <button
            key={f._id}
            type="button"
            className={
              "btn btn-sm me-1 px-2 py-0 " +
              (selectedFolder === f.name
                ? "btn-primary text-white"
                : "btn-outline-secondary")
            }
            style={{ fontSize: "0.75rem" }}
            onClick={() =>
              setSelectedFolder((prev) => (prev === f.name ? null : f.name))
            }
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
        {showSidebar && (
          <div
            className="border-end bg-white"
            style={{ width: 320, minWidth: 260, overflowY: "auto" }}
          >
            ={" "}
            <div className="p-2 border-bottom bg-white small">
              <div className="d-flex align-items-center mb-1">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => setShowSidebar(false)}
                >
                  ◀
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => {
                    setMode("new");
                    setSelectedPost(null);
                  }}
                >
                  + New Post
                </button>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search or add a post..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 small">
              {Object.entries(groupedPosts).map(([label, list]) => (
                <div key={label} className="mb-3">
                  <div className="text-muted fw-bold mb-1">▾ {label}</div>
                  {list.map((post) => (
                    <div
                      key={post._id}
                      className={
                        "border rounded px-2 py-1 mb-1 bg-white " +
                        (selectedPost?._id === post._id && mode === "view"
                          ? "border-primary"
                          : "border-light")
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedPost(post);
                        setMode("view");
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <span className="badge bg-warning text-dark me-1">
                            {post.type === "NOTE" ? "Note" : "Q"}
                          </span>
                          <strong>{post.summary}</strong>
                        </div>
                        <span className="text-muted" style={{ fontSize: 10 }}>
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.7rem" }}
                        dangerouslySetInnerHTML={{
                          __html:
                            (post.details || "").slice(0, 90) +
                            (post.details && post.details.length > 90
                              ? "..."
                              : ""),
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {!showSidebar && (
          <div className="border-end bg-light d-flex align-items-start">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary m-1"
              onClick={() => setShowSidebar(true)}
            >
              ▶
            </button>
          </div>
        )}

        <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
          <div className="p-3" style={{ overflowY: "auto" }}>
            {mode === "glance" && !selectedPost && (
              <div className="border rounded p-3 mb-3 bg-white small">
                <h5 className="mb-3">Class at a Glance</h5>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled mb-0">
                      <li>no unread posts</li>
                      <li>no unanswered questions</li>
                      <li>no unanswered followups</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled mb-0">
                      <li>total posts: {totalPosts}</li>
                      <li>instructor responses: {totalInstructorResponses}</li>
                      <li>student responses: {totalStudentResponses}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {mode === "new" && (
              <div className="border rounded bg-white p-3 small">
                <div className="mb-3">
                  <div className="btn-group btn-group-sm">
                    <button
                      type="button"
                      className={
                        "btn " +
                        (postType === "QUESTION"
                          ? "btn-primary"
                          : "btn-outline-secondary")
                      }
                      onClick={() => setPostType("QUESTION")}
                    >
                      Question
                    </button>
                    <button
                      type="button"
                      className={
                        "btn " +
                        (postType === "NOTE"
                          ? "btn-primary"
                          : "btn-outline-secondary")
                      }
                      onClick={() => setPostType("NOTE")}
                    >
                      Note
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      disabled
                    >
                      Poll/In-class
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label d-block mb-1 small">
                    Post To
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="postToClass"
                      checked={postScope === "CLASS"}
                      onChange={() => setPostScope("CLASS")}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="postToClass"
                    >
                      Entire Class
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="postToIndividuals"
                      checked={postScope === "INDIVIDUAL"}
                      onChange={() => setPostScope("INDIVIDUAL")}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="postToIndividuals"
                    >
                      Individual Student(s)/Instructor(s)
                    </label>
                  </div>
                  {postScope === "INDIVIDUAL" && (
                    <div className="mt-2">
                      <small className="text-muted d-block mb-1">
                        (UI only) Comma-separated ids or names
                      </small>
                      <input
                        className="form-control form-control-sm"
                        value={selectedUsers.join(",")}
                        onChange={(e) =>
                          setSelectedUsers(
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label small d-block mb-1">
                    Select Folder(s)*
                  </label>
                  <div className="mb-1">
                    {folders.map((f) => (
                      <button
                        key={f._id}
                        type="button"
                        className={
                          "btn btn-sm me-1 mb-1 " +
                          (newPostFolders.includes(f.name)
                            ? "btn-primary"
                            : "btn-outline-secondary")
                        }
                        onClick={() => toggleNewPostFolder(f.name)}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                  {newErrors.folders && (
                    <div className="text-danger small">{newErrors.folders}</div>
                  )}
                  <div className="mt-1">
                    <span className="text-primary text-decoration-underline">
                      Manage and reorder folders
                    </span>{" "}
                    (via Manage Class)
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small mb-1">Summary*</label>
                  <input
                    className="form-control form-control-sm"
                    maxLength={100}
                    placeholder="Enter a one line summary, 100 characters or less"
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                  />
                  {newErrors.summary && (
                    <div className="text-danger small">{newErrors.summary}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label small mb-1">Details*</label>
                  <TiptapEditor
                    value={newDetails}
                    onChange={setNewDetails}
                    height="220px"
                  />
                  {newErrors.details && (
                    <div className="text-danger small mt-1">
                      {newErrors.details}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                      setMode("glance");
                      setNewErrors({});
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={createPost}
                  >
                    {postType === "NOTE" ? "Post My Note" : "Post My Question"}
                  </button>
                </div>
              </div>
            )}

            {mode === "view" && selectedPost && (
              <div className="small">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <span className="badge bg-danger me-2">
                      {selectedPost.type === "NOTE" ? "Note" : "Question"}
                    </span>
                    <span className="fw-bold">{selectedPost.summary}</span>
                    {selectedPost.folders?.map((f) => (
                      <span
                        key={f}
                        className="badge rounded-pill bg-secondary ms-2"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">
                      {(selectedPost.viewsCount ?? 0) + " views"}
                    </span>
                    {canEditPost && (
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          Actions
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => setEditingPost(true)}
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={async () => {
                                await PazzaClient.deletePost(selectedPost._id);
                                setSelectedPost(null);
                                setMode("glance");
                                loadPosts();
                              }}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-muted mb-2">
                  Created by {selectedPost.author || "Unknown"}
                </div>

                {!editingPost && (
                  <div
                    className="border rounded p-3 bg-white mb-3"
                    dangerouslySetInnerHTML={{ __html: selectedPost.details }}
                  />
                )}

                {editingPost && (
                  <div className="border rounded p-3 bg-white mb-3 small">
                    <div className="mb-2">
                      <label className="form-label small mb-1">Summary</label>
                      <input
                        className="form-control form-control-sm"
                        value={editSummary}
                        onChange={(e) => setEditSummary(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label small mb-1">Details</label>
                      <TiptapEditor
                        value={editDetails}
                        onChange={setEditDetails}
                        height="220px"
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                          setEditingPost(false);
                          setEditSummary(selectedPost.summary);
                          setEditDetails(selectedPost.details);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={savePostEdits}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                <section className="mb-4">
                  <div className="border-bottom pb-1 mb-2">
                    <span className="text-uppercase text-muted">
                      Student&apos;s Answers
                    </span>
                  </div>

                  {studentAnswers.length === 0 && (
                    <p className="text-muted">No student answers yet.</p>
                  )}

                  {studentAnswers.map((ans) => (
                    <AnswerCard
                      key={ans._id}
                      answer={ans}
                      currentUserId={currentUser._id}
                      canManage={isInstructor}
                      onSave={updateAnswer}
                      onDelete={deleteAnswer}
                    />
                  ))}

                  {isStudent && (
                    <div className="mt-2">
                      <label className="small text-muted mb-1 d-block">
                        Post a student answer
                      </label>
                      <TiptapEditor
                        value={studentAnswerBody}
                        onChange={setStudentAnswerBody}
                        height="180px"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-primary mt-2"
                        onClick={submitStudentAnswer}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </section>

                <section className="mb-4">
                  <div className="border-bottom pb-1 mb-2">
                    <span className="text-uppercase text-muted">
                      Instructor&apos;s Answers
                    </span>
                  </div>

                  {instructorAnswers.length === 0 && (
                    <p className="text-muted">No instructor answer yet.</p>
                  )}

                  {instructorAnswers.map((ans) => (
                    <AnswerCard
                      key={ans._id}
                      answer={ans}
                      currentUserId={currentUser._id}
                      canManage={isInstructor}
                      onSave={updateAnswer}
                      onDelete={deleteAnswer}
                    />
                  ))}

                  {isInstructor && (
                    <div className="mt-2">
                      <label className="small text-muted mb-1 d-block">
                        Post an instructor answer
                      </label>
                      <TiptapEditor
                        value={instructorAnswerBody}
                        onChange={setInstructorAnswerBody}
                        height="180px"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-success mt-2"
                        onClick={submitInstructorAnswer}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </section>

                <section>
                  <div className="border-bottom pb-1 mb-2">
                    <span className="text-uppercase text-muted">
                      Follow-up Discussion
                    </span>
                  </div>

                  <TiptapEditor
                    value={newDiscussionText}
                    onChange={setNewDiscussionText}
                    height="160px"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary mt-2 mb-3"
                    onClick={submitDiscussion}
                  >
                    Start Follow-up
                  </button>

                  {discussions.map((d) => (
                    <DiscussionThread
                      key={d._id}
                      discussion={d}
                      currentUserId={currentUser._id}
                      isInstructor={isInstructor}
                      submitReply={submitReply}
                      toggleResolved={toggleResolved}
                      updateDiscussion={updateDiscussion}
                      deleteDiscussion={deleteDiscussion}
                      updateReply={updateReply}
                      deleteReply={deleteReply}
                    />
                  ))}
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
