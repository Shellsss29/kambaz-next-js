"use client";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import type { RootState, AppDispatch } from "../../store";

interface UserProfile {
  _id?: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
  [key: string]: unknown; // 👈 add this line
}

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const serverUser = await client.profile();
      if (!serverUser) {
        router.push("/Account/Signin");
        return;
      }
      dispatch(setCurrentUser(serverUser));
      setProfile(serverUser);
    } catch (e) {
      router.push("/Account/Signin");
    }
  }, [dispatch, router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async () => {
    if (!profile || !profile._id) return;
    const updated = await client.updateUser(profile);
    dispatch(setCurrentUser(updated));
    alert("Profile updated successfully!");
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  if (!profile) return null;

  return (
    <Container
      id="wd-profile-screen"
      className="p-4"
      style={{ paddingLeft: "150px", paddingTop: "30px", maxWidth: "800px" }}
    >
      <h3 className="text-danger mb-4 fw-bold">Profile</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={profile.firstName || ""}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={profile.lastName || ""}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={profile.role || "USER"}
            onChange={(e) =>
              setProfile({
                ...profile,
                role: e.target.value as UserProfile["role"],
              })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            className="me-2 px-4"
            onClick={updateProfile}
          >
            Update
          </Button>
          <Button variant="danger" className="px-4" onClick={signout}>
            Sign out
          </Button>
        </div>
      </Form>
    </Container>
  );
}
