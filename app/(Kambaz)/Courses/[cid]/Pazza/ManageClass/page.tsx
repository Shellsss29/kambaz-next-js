"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import RequireLogin from "../../../../requireLogin";
import { useEffect, useState } from "react";
import { PazzaClient } from "../client";

type Folder = { _id: string; name: string };

export default function ManageClassPage() {
  return (
    <RequireLogin>
      <ManageClassInternal />
    </RequireLogin>
  );
}

function ManageClassInternal() {
  const { cid } = useParams();
  const router = useRouter();
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const role = currentUser?.role;
  const isInstructor = role === "FACULTY" || role === "TA" || role === "ADMIN";

  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolder, setNewFolder] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    if (!isInstructor) return;
    PazzaClient.getFolders(cid as string)
      .then(setFolders)
      .catch(console.error);
  }, [cid, isInstructor]);

  if (!isInstructor) {
    return (
      <div className="p-3">
        <h5>Access denied</h5>
        <p className="small">Only instructors can manage Pazza folders.</p>
      </div>
    );
  }

  const reload = () =>
    PazzaClient.getFolders(cid as string)
      .then(setFolders)
      .catch(console.error);

  const toggleSelected = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const addFolder = async () => {
    if (!newFolder.trim()) return;
    await PazzaClient.createFolder(cid as string, { name: newFolder.trim() });
    setNewFolder("");
    reload();
  };

  const deleteSelected = async () => {
    await Promise.all(selectedIds.map((id) => PazzaClient.deleteFolder(id)));
    setSelectedIds([]);
    reload();
  };

  const startEdit = (f: Folder) => {
    setEditingId(f._id);
    setEditingName(f.name);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await PazzaClient.updateFolder(editingId, { name: editingName });
    setEditingId(null);
    setEditingName("");
    reload();
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* Reuse same top bar styling */}
      <div
        className="d-flex align-items-center px-3 py-2 text-white"
        style={{ backgroundColor: "#476b87" }}
      >
        <div className="fw-bold me-3" style={{ fontSize: "1.3rem" }}>
          pazza
        </div>
        <div className="fw-semibold me-4">{String(cid)}</div>

        <div className="d-flex align-items-center gap-3 flex-grow-1 small">
          <button
            className="btn btn-link btn-sm text-decoration-none text-white-50"
            onClick={() => router.push(`/Courses/${cid}/Pazza`)}
          >
            Q &amp; A
          </button>
          <span className="text-white-50">Resources</span>
          <span className="text-white-50">Statistics</span>
          <span className="fw-bold text-decoration-underline">
            Manage Class
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 small">
          <div
            className="rounded-circle bg-light"
            style={{ width: 26, height: 26 }}
          />
          <span>
            {currentUser?.firstName} {currentUser?.lastName}
          </span>
        </div>
      </div>
      {/* Inner Manage Class tabs row */}
      <div
        className="d-flex gap-4 border-bottom pb-2 mb-3 small"
        style={{ fontSize: "0.9rem" }}
      >
        {/* These tabs are NOT required to function */}
        <span className="text-secondary" style={{ cursor: "not-allowed" }}>
          General Settings
        </span>

        <span className="text-secondary" style={{ cursor: "not-allowed" }}>
          Customize Q&A
        </span>

        {/* ACTIVE TAB — Manage Folders */}
        <span
          className="fw-bold text-decoration-underline"
          style={{ cursor: "pointer" }}
        >
          Manage Folders
        </span>

        <span className="text-secondary" style={{ cursor: "not-allowed" }}>
          Manage Enrollment
        </span>

        <span className="text-secondary" style={{ cursor: "not-allowed" }}>
          Create Groups
        </span>

        <span className="text-secondary" style={{ cursor: "not-allowed" }}>
          Customize Course Page
        </span>

        <span className="text-secondary" style={{ cursor: "not-allowed" }}>
          Piazza Network Settings
        </span>
      </div>

      {/* MCS body – only Manage Folders tab required */}
      <div className="p-3">
        <h5 className="mb-3">Configure Class Folders</h5>

        {/* Add folder */}
        <div className="mb-3 small">
          <label className="form-label mb-1">Add a new folder</label>
          <div className="d-flex gap-2">
            <input
              className="form-control form-control-sm"
              placeholder="e.g., hw7"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
            />
            <button className="btn btn-sm btn-primary" onClick={addFolder}>
              Add Folder
            </button>
          </div>
        </div>

        {/* Existing folders table */}
        <div className="small">
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th style={{ width: "3rem" }}>
                  <input
                    type="checkbox"
                    checked={
                      folders.length > 0 &&
                      selectedIds.length === folders.length
                    }
                    onChange={(e) =>
                      setSelectedIds(
                        e.target.checked ? folders.map((f) => f._id) : []
                      )
                    }
                  />
                </th>
                <th>Folder name</th>
                <th style={{ width: "10rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {folders.map((f) => (
                <tr key={f._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(f._id)}
                      onChange={() => toggleSelected(f._id)}
                    />
                  </td>
                  <td>
                    {editingId === f._id ? (
                      <input
                        className="form-control form-control-sm"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      f.name
                    )}
                  </td>
                  <td>
                    {editingId === f._id ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={saveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setEditingId(null);
                            setEditingName("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => startEdit(f)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {folders.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-muted">
                    No folders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            className="btn btn-sm btn-danger mt-2"
            disabled={selectedIds.length === 0}
            onClick={deleteSelected}
          >
            Delete selected folders
          </button>
        </div>
      </div>
    </div>
  );
}
